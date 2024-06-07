/** @format */
import asyncHandler from "../middlewares/asyncHandler.mjs";
import Order from "../models/order.mjs";
import ordervalidator from "../config/validators/order.mjs";
import calculatePrices from "../utils/calculatePrices.mjs";
import Product from "../models/product.mjs";

const createOrder = asyncHandler(async (req, res) => {
  try {
    await ordervalidator.validate(req.body);

    const { orderItems, shippingAddress, paymentMethod } = req.body;

    if (orderItems && orderItems.length === 0) {
      return res
        .status(404)
        .json({ message: "No item in the cart", success: false });
    }

    const itemsFromDB = await Product.find({
      _id: { $in: orderItems.map((x) => x._id) },
    });

    const dbOrderItems = orderItems.map((itemFromClient) => {
      const matchingItemFromDB = itemsFromDB.find(
        (itemFromDB) => itemFromDB._id.toString() === itemFromClient._id
      );

      if (!matchingItemFromDB) {
        return res.status(404).json({
          message: `Product not found: ${itemFromClient._id}`,
          success: false,
        });
      }

      return {
        ...itemFromClient,
        product: itemFromClient._id,
        price: matchingItemFromDB.price,
        _id: undefined,
      };
    });

    const { itemsPrice, shippingPrice, totalPrice } = calculatePrices({
      orderItems: dbOrderItems,
      ...req.body,
    });

    const order = new Order({
      orderItems: dbOrderItems,
      customer: req.customer._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json({
      message: "order successfully created",
      success: true,
      order: { ...createdOrder._doc },
    });
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
});

const getAllOrders = asyncHandler(async (req, res) => {
  try {
    let { page, limit, keyword } = req.query;

    const queryPage = Number(page) && Number(page) > 0 ? Number(page) : 1;

    const queryLimit =
      Number(limit) && Number(limit) > 0 && Number(limit) < 20
        ? Number(limit)
        : 10;

    const skip = (queryPage - 1) * queryLimit;

    const queryKeyword = keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    const count = await Order.countDocuments({ ...queryKeyword });
    const orders = await Order.find({ ...queryKeyword })
      .populate("customer", "_id name email")
      .skip(skip)
      .limit(queryLimit);

    res.json({
      orders,
      page: queryPage,
      pages: Math.ceil(count / queryLimit),
      hasMore: Math.ceil(count / queryLimit) > 1 ? true : false,
      message: "successful",
      success: true,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
});

const getCustomerOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.customer._id });
    res.status(200).json({
      message: "Successfull request",
      orders: orders,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
});

const countTotalOrders = asyncHandler(async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    res.status(200).json({
      message: "Successfull request",
      count: totalOrders,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
});

const calculateTotalSales = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find();
    const totalSales = orders.reduce((sum, order) => sum + order.totalPrice, 0);
    res.status(200).json({
      message: "Successfull request",
      sales: totalSales,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
});

const calculateTotalSalesByDate = asyncHandler(async (req, res) => {
  try {
    const salesByDate = await Order.aggregate([
      {
        $match: {
          isPaid: true,
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$paidAt" },
          },
          totalSales: { $sum: "$totalPrice" },
        },
      },
    ]);

    res.status(200).json({
      message: "Successfull request",
      salesByDate: salesByDate,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
});

const findOrderById = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "customer",
      "name email"
    );

    if (order) {
      res.status(200).json({
        message: "Successfull request",
        order: order,
        success: true,
      });
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
});

const markOrderAsPaid = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      };

      const updateOrder = await order.save();

      res.status(200).json({
        message: "Successfull request",
        order: updateOrder,
        success: true,
      });
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
});

const markOrderAsDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();

      res.status(200).json({
        message: "Successfull request",
        order: updatedOrder,
        success: true,
      });
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
};

export {
  createOrder,
  getAllOrders,
  getCustomerOrders,
  countTotalOrders,
  calculateTotalSales,
  calculateTotalSalesByDate,
  findOrderById,
  markOrderAsPaid,
  markOrderAsDelivered,
};

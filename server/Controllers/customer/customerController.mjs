import Customer from "../../models/customer.mjs";
import { validationResult, matchedData } from "express-validator";
import hash from "../../config/password/hash.mjs";
import compare from "../../config/password/compare.mjs";
import asyncHandler from "../../middlewares/asyncHandler.mjs";
import createToken from "../../utils/createToken.mjs";


const getCustomers = asyncHandler(async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json({ customers });
    } catch (error) {
        throw new Error(error.message);
    }
});

const getCustomerById = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (customer) {
    res.status(200).json({ customer });
  } else {
    res.status(404);
    throw new Error("Customer not found");
  }
});

const createCustomer = asyncHandler(async (req, res) => {
  const errors = validationResult(req.body);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email } = req.body;

  const findCustomer = await Customer.findOne({ email });

  if (findCustomer) {
    res.status(400);
    throw new Error("Customer already exists");
  }

  try {
    const customer = matchedData(req);

      customer.password = hash(customer.password);

      const newCustomer = await Customer.create(customer);

      newCustomer.save();

      const token = createToken(res,newCustomer._id);

      res.status(201).json({ message:"Customer successfully created", success:true , auth : token});
  } catch (error) {
    throw new Error(error.message);
  }
});

const verifyCustomer = asyncHandler(async (req, res) => {
    const errors = validationResult(req.body);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { email ,password} = req.body;
  
    const customer = await Customer.findOne({ email });

    if (customer && compare(password, customer.password)) {
        const token = createToken(res, customer._id);
        return res.status(200).json({ message:"Customer successfully login", success:true , auth : token});
    } 

    res.status(401);
    throw new Error("Invalid email or password");
    
    return
});

const logoutCurrentCustomer = asyncHandler(async (req, res) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({ message: "Logged out successfully" });
});

const getCustomerProfile = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.customerId).select("-password");
  if (customer) {
    res.status(200).json({ customer});
  } else {
    res.status(404);
    throw new Error("Customer not found");
  }
});

const updateCustomerProfile= asyncHandler(async (req, res) => {

  const errors = validationResult(req.body);

  console.log(req.body)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const customer = await Customer.findOne({ _id:req.customerId });

  if (customer) {
    try {
      customer.name = req.body.name 
      customer.email = req.body.email 

      const updatedCustomer = await customer.save();
  
      res.status(200).json({
        _id: updatedCustomer._id,
        name: updatedCustomer.name,
        email: updatedCustomer.email,
      });
    } catch (error) {
      res.status(404);
      throw new Error("Unable to update customer's info try again or contact the support team");
    }
  } else {
    res.status(404);
    throw new Error("Customer not found");
  }
});

const deleteCustomerProfile=asyncHandler(async (req,res)=>{
  const customer = await Customer.findById(req.customerId);
})

export { getCustomers, 
    getCustomerById, 
    createCustomer, 
    verifyCustomer, 
    logoutCurrentCustomer,
    getCustomerProfile ,
    updateCustomerProfile,
    deleteCustomerProfile};


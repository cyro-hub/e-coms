import Customer from "../../models/customer.mjs";
import hash from "../../config/password/hash.mjs";
import compare from "../../config/password/compare.mjs";
import asyncHandler from "../../middlewares/asyncHandler.mjs";
import createToken from "../../middlewares/createTokenUser.mjs";
import User from "../../models/user.mjs";
import {
  userValidator,
  userLoginValidator,
  userUpdateValidator,
  userDeleteValidator,
} from "../../config/validators/user.mjs";

const createUser = asyncHandler(async (req, res) => {
  await userValidator.validate(req.body);

  const { name, password, employeeId } = req.body;

  const findUser = await User.findOne({ employeeId });

  if (findUser) {
    res.status(400);
    throw new Error("User already exists");
  }

  const hashedPassword = hash(password);

  const user = new User({
    name,
    password: hashedPassword,
    employeeId,
  });

  await user.save();

  const token = createToken(res, user._id);

  res.status(201).json({
    message: "User successfully created",
    success: true,
    user: {
      employeeId: user.employeeId,
      name: user.name,
      id: user.id,
      role: user.role,
    },
  });
});

const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json([...users]);
  } catch (error) {
    throw new Error(error.message);
  }
});

const verifyUser = asyncHandler(async (req, res) => {
  await userLoginValidator.validate(req.body);

  const { employeeId, password } = req.body;

  const user = await User.findOne({ employeeId });

  if (user && compare(password, user.password)) {
    const token = createToken(res, user._id);
    return res.status(200).json({
      message: "User successfully login",
      success: true,
      user: {
        employeeId: user.employeeId,
        name: user.name,
        id: user.id,
        role: user.role,
      },
    });
  }

  res.status(401);
  throw new Error("Invalid employeeId or password");

  return;
});

const logoutCurrentUser = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({ message: "Logged out successfully" });
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.id).select("-password");
  if (user) {
    res.status(200).json({ user });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  await userValidator.validate(req.body);

  const user = await User.findById(req.id);

  if (user) {
    if (req.body.password) {
      user.password = hash(req.body.password);
    }

    const updatedUser = await user.save();

    const token = createToken(res, updatedUser._id);

    res.status(200).json({
      message: "User successfully updated",
      success: true,
      auth: token,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateUser = asyncHandler(async (req, res) => {
  await userUpdateValidator.validate(req.body);

  const { name, employeeId, role, isActive } = req.body;

  const user = await User.findOne({ employeeId: employeeId });

  if (user) {
    user.name = name || user.name;
    user.employeeId = employeeId || user.employeeId;
    user.role = role || user.role;
    user.isActive = isActive;

    const updatedUser = await user.save();

    res.status(200).json({
      message: "User successfully updated",
      success: true,
      user,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  await userDeleteValidator.validate(req.body);

  const { employeeId, isActive } = req.body;

  const user = await User.findOne({ employeeId: employeeId });

  if (user) {
    user.isActive = isActive;

    const updatedUser = await user.save();

    res.status(200).json({
      message: "User successfully updated",
      success: true,
      user,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  createUser,
  verifyUser,
  logoutCurrentUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  updateUser,
  deleteUser,
};

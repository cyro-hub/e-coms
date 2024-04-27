import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
    },
    employeeId: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
    password: {
      type: Schema.Types.String,
      required: true,
    },
    isActive: {
      type: Schema.Types.Boolean,
      default: true,
    },
    role: {
      type: Schema.Types.Array,
      default: ["user"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("Users", userSchema);

export default User;

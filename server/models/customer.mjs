import mongoose, { Schema } from "mongoose";

const customerSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
  },
  email: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  password: {
    type: Schema.Types.String,
    required: true,
  },
  isActive:{
    type:Schema.Types.Boolean,
    default:false
  }
},{ timestamps: true });

const Customer = mongoose.model("Customers", customerSchema);

export default Customer;

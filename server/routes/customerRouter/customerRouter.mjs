import { Router,json } from "express";
import { createCustomer, 
    verifyCustomer ,
    getCustomers,
    logoutCurrentCustomer,
    getCustomerProfile,
    updateCustomerProfile,
    deleteCustomerProfile} from "../../Controllers/customer/customerController.mjs";
import customerValidator from "../../config/validators/customerValidator.mjs";
import customerLoginValidator from "../../config/validators/customerLoginValidator.mjs";
import authenticateCustomer from "../../utils/verifyToken.mjs";

const customerRoutes = Router()
customerRoutes.use(json())

customerRoutes.route('/').post(customerValidator, createCustomer)

customerRoutes.post('/auth', customerLoginValidator, verifyCustomer);

customerRoutes.post('/logout', logoutCurrentCustomer);

customerRoutes.route("/profile")
              .get(authenticateCustomer, getCustomerProfile)
              .put(customerValidator,authenticateCustomer,updateCustomerProfile)
              .delete(authenticateCustomer,deleteCustomerProfile)

export default customerRoutes


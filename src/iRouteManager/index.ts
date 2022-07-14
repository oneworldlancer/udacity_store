import express from "express";
import iUser_Routes from "../iAPIManager/iApi_User";
import iProduct_Routes from "../iAPIManager/iApi_Product";
import iOrder_Routes from "../iAPIManager/iApi_Order";

const iRouteManager = express.Router();


iRouteManager.use("/user", iUser_Routes);
iRouteManager.use("/product", iProduct_Routes);
iRouteManager.use("/order", iOrder_Routes);

export default iRouteManager;

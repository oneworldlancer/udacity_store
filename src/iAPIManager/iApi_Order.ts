import { Router } from "express";
import * as iController_Order from "../iControllerManager/iController_Order";
import { iAuthenticateModelManager as iAuthenticateManager } from "../iMiddlewareManager/iMiddleware_Authenticate";

const iOrder_Routes = Router();

/* routes.route("/").get(  iController_Order.getMany); */

//// /users/:userID/orders/:orderID/Orders

// api/users
iOrder_Routes
  .route("/")
  .post(iAuthenticateManager, iController_Order.api_Order_New_Create);
iOrder_Routes
  .route("/")
  .get(iAuthenticateManager, iController_Order.api_Order_Get_All);
iOrder_Routes
  .route("/:id")
  .get(iAuthenticateManager, iController_Order.api_Order_Get_ByOrderTokenID);
iOrder_Routes

  .route("/:id")
  .patch(
    iAuthenticateManager,
    iController_Order.api_Order_Update_ByOrderTokenID
  );
iOrder_Routes
  .route("/:id")
  .delete(
    iAuthenticateManager,
    iController_Order.api_Order_Delete_ByOrderTokenID
  );

iOrder_Routes
  .route("/:id1/product/:id2")
  .post(iAuthenticateManager, iController_Order.api_Order_Order_Add_Product);

//api/order/user/id/close
iOrder_Routes
  .route("/user/:id/close")
  .get(
    iAuthenticateManager,
    iController_Order.api_Order_Get_All_Close_ByUserTokenID
  );

iOrder_Routes
  .route("/user/:id/all")
  .get(iAuthenticateManager, iController_Order.api_Order_Get_All_ByUserTokenID);

export default iOrder_Routes;

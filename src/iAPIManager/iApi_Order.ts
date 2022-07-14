import { Router } from "express";
import * as iController_Order from "../iControllerManager/iController_Order";
import { iAuthenticateModelManager as iAuthenticateManager } from "../iMiddlewareManager/iMiddleware_Authenticate";

const iOrder_Routes = Router();

/* api_Order_New_Create */
iOrder_Routes
  .route("/")
  .post(iAuthenticateManager, iController_Order.api_Order_New_Create);

/* api_Order_Get_All */
iOrder_Routes
  .route("/")
  .get(iAuthenticateManager, iController_Order.api_Order_Get_All);

/* api_Order_Get_ByOrderTokenID */
iOrder_Routes
  .route("/:id")
  .get(iAuthenticateManager, iController_Order.api_Order_Get_ByOrderTokenID);

/* api_Order_Update_ByOrderTokenID */
iOrder_Routes
  .route("/:id")
  .patch(
    iAuthenticateManager,
    iController_Order.api_Order_Update_ByOrderTokenID
  );

/* api_Order_Delete_ByOrderTokenID */
iOrder_Routes
  .route("/:id")
  .delete(
    iAuthenticateManager,
    iController_Order.api_Order_Delete_ByOrderTokenID
  );

/* api_Order_Order_Add_Product */
iOrder_Routes
  .route("/:id1/product/:id2")
  .post(iAuthenticateManager, iController_Order.api_Order_Order_Add_Product);

/* api_Order_Get_All_Close_ByUserTokenID 
(GET/)api/order/user/id/close
*/
iOrder_Routes
  .route("/user/:id/close")
  .get(
    iAuthenticateManager,
    iController_Order.api_Order_Get_All_Close_ByUserTokenID
  );

/* api_Order_Get_All_Open_ByUserTokenID 
(GET/)api/order/user/id/open
*/
iOrder_Routes
  .route("/user/:id/open")
  .get(
    iAuthenticateManager,
    iController_Order.api_Order_Get_All_Open_ByUserTokenID
  );

/* api_Order_Get_All_ByUserTokenID 
(GET/)api/order/user/id/all
*/
iOrder_Routes
  .route("/user/:id/all")
  .get(iAuthenticateManager, iController_Order.api_Order_Get_All_ByUserTokenID);

export default iOrder_Routes;

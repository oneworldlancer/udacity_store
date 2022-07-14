import { Router } from "express";
import * as iController_Product from "../iControllerManager/iController_Product";
import { iAuthenticateModelManager as iAuthenticateManager } from "../iMiddlewareManager/iMiddleware_Authenticate";

const iProduct_Routes = Router();

/* api_Product_Get_All */
iProduct_Routes.route("/").post(iController_Product.api_Product_New_Create);
iProduct_Routes
  .route("/")
  .get(iAuthenticateManager, iController_Product.api_Product_Get_All);

/* api_Product_Get_ByProductTokenID */
iProduct_Routes
  .route("/:id")
  .get(
    iAuthenticateManager,
    iController_Product.api_Product_Get_ByProductTokenID
  );

/* api_Product_Update_ByProductTokenID */
iProduct_Routes

  .route("/:id")
  .patch(
    iAuthenticateManager,
    iController_Product.api_Product_Update_ByProductTokenID
  );

/* api_Product_Delete_ByProductTokenID */
iProduct_Routes
  .route("/:id")
  .delete(
    iAuthenticateManager,
    iController_Product.api_Product_Delete_ByProductTokenID
  );

/* api_Product_Get_All_ByCategoryName */
iProduct_Routes
  .route("/category/:id")
  .get(
    iAuthenticateManager,
    iController_Product.api_Product_Get_All_ByCategoryName
  );

/* api_Product_Get_ByPopular */
iProduct_Routes
  .route("/top/sold/:id")
  .get(iAuthenticateManager, iController_Product.api_Product_Get_ByPopular);

export default iProduct_Routes;

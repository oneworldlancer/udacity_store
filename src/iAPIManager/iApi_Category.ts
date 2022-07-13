import { Router } from "express";
import * as iController_Category from "../iControllerManager/iController_Category";
//import authenticationMiddleware from "../../middleware/authentication.middleware";

const authenticationMiddleware = null;
const iCategory_Routes = Router();

//// /users/:userID/orders/:orderID/Categorys

// api/users
iCategory_Routes.route("/").post(iController_Category.api_Category_New_Create);
iCategory_Routes.route("/").get(iController_Category.api_Category_Get_All);
iCategory_Routes
  .route("/:id")
  .get(iController_Category.api_Category_Get_ByCategoryTokenID);
iCategory_Routes

  .route("/:id")
  .patch(iController_Category.api_Category_Update_ByCategoryTokenID);
iCategory_Routes
  .route("/:id")
  .delete(iController_Category.api_Category_Delete_ByCategoryTokenID);

export default iCategory_Routes;

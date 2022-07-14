import { Router } from "express";
import * as iController_User from "../iControllerManager/iController_User";
import { iAuthenticateModelManager as iAuthenticateManager } from "../iMiddlewareManager/iMiddleware_Authenticate";


const iUser_Routes = Router();

/* api_User_New_Create */
iUser_Routes.route("/").post(iController_User.api_User_New_Create);

/* api_User_Get_All */
iUser_Routes
  .route("/")
  .get(iAuthenticateManager, iController_User.api_User_Get_All);

/* api_User_Get_ByUserTokenID */
iUser_Routes
  .route("/:id")
  .get(iAuthenticateManager, iController_User.api_User_Get_ByUserTokenID);

/* api_User_Update_ByUserTokenID */
iUser_Routes
  .route("/:id")
  .patch(iAuthenticateManager, iController_User.api_User_Update_ByUserTokenID);

/* api_User_Delete_ByUserTokenID */
iUser_Routes
  .route("/:id")
  .delete(iAuthenticateManager, iController_User.api_User_Delete_ByUserTokenID);

/* api_User_Authenticate_ByUserTokenID */
iUser_Routes
  .route("/authenticate")
  .post(iController_User.api_User_Authenticate_ByUserTokenID);

export default iUser_Routes;

/* import { ok } from "assert"; */
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import iUserModelManager from "../iModelManager/iModel_UserManager";
import iConfigManager from "../iStoreManager/iConfigManager";
import iUser from "../iTypeManager/iType_User";

const iUserManager = new iUserModelManager();

/* api_User_New_Create */
export const api_User_New_Create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
 const xUser: iUser = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      user_password: req.body.user_password,
    };

    if (xUser != null || xUser != "undefined") {
      const oUser: iUser | null = await iUserManager.db_User_New_Create(xUser);
      res.json({
        code: 200,
        status: "success",
        data: { ...oUser },
        message: "User created successfully",
      });
   
         next();
    } else {
      res.json({
      code: 500,
        status: "fail",
        message: "Failed",
      });
      //next();
    }
  } catch (err) {
    next(err);
  }
};

/* api_User_Get_All */
export const api_User_Get_All = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /*  res.json({
      message: "Hello World 🌍 iController_User_Get_All",
    }); */

    const iUser_All: iUser[] | null = await iUserManager.db_User_Get_All();

    res.json({
      code: 200,
      status: "success",
      data: iUser_All,
      message: "Users retrieved successfully",
    });
  } catch (err) {
    next(err);
  }
};

/* api_User_Get_ByUserTokenID */
export const api_User_Get_ByUserTokenID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /*  res.json({
      message: "Hello World 🌍 iController_User-getOne",
    }); */

    console.log("url paramd id == " + req.params.id);
    const user: iUser | null = await iUserManager.db_User_Get_ByUserTokenID(
      req.params.id as unknown as string
    );
    res.json({
      status: "success",
      data: user,
      message: "User retrieved successfully",
    });
  } catch (err) {
    next(err);
  }
};

/* api_User_Update_ByUserTokenID */
export const api_User_Update_ByUserTokenID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /*     res.json({
      message: "Hello World 🌍 iController_User-updateOne",
    }); */

    const xUser: iUser = {
      user_tokenid: req.params.id,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      user_password: req.body.user_password,
    };

    if (xUser != null || xUser != "undefined") {
      const user = await iUserManager.db_User_Update_ByUserTokenID(xUser);
      res.json({
        status: "success",
        data: user,
        message: "User updated successfully",
      });
    }
  } catch (err) {
    next(err);
  }
};

export const api_User_Delete_ByUserTokenID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /*  res.json({
      message: "Hello World 🌍 iController_User-deleteOne",
    }); */
    const user = await iUserManager.db_User_Delete_ByUserTokenID(
      req.params.id as string
    );
    res.json({
      status: "success",
      data: user,
      message: "User deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const api_User_Authenticate_ByUserTokenID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user_tokenid, user_password } = req.body;

    const user = await iUserManager.db_User_Authenticate_ByUserTokenID(
      user_tokenid as string,
      user_password as string
    );
    const token = jwt.sign(
      { user },
      iConfigManager.tokenSecret as unknown as string
    );
    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "User NOT found",
      });
    }
    return res.json({
      status: "success",
      data: { ...user, token },
      message: "User authenticated successfully",
    });
  } catch (err) {
    return next(err);
  }

  /*    try {
     const { email, password } = req.body;

     const user = await userModel.authenticate(email, password);
     const token = jwt.sign(
       { user },
       iConfigManager.tokenSecret as unknown as string
     );
     if (!user) {
       return res.status(401).json({
         status: "error",
         message: "the username and password do not match please try again",
       });
     }
     return res.json({
       status: "success",
       data: { ...user, token },
       message: "user authenticated successfully",
     });
   } catch (err) {
     return next(err);
   } */
};

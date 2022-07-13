import { ok } from "assert";
import { Request, Response, NextFunction } from "express";
/* import jwt from "jsonwebtoken"; */
import iUserModelManager from "../iModelManager/iModel_UserManager";
import iCategoryModelManager from "../iModelManager/iModel_CategoryManager";
import iConfigManager from "../iStoreManager/iConfigManager";
import iUser from "../iTypeManager/iType_User";
import iCategory from "../iTypeManager/iType_Category";

const iCategoryModel = new iCategoryModelManager();

/* api_Category_New_Create */
export const api_Category_New_Create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /*   console.log("my-REQUEST-BODY == " + req.body.First_Name);
     res.json({
      message: "Hello World 🌍 iController_api_Category_New_Create",
    });  */

    const oUser: iCategory | undefined =
      await iCategoryModel.db_Category_New_Create(req);
    res.json({
      code: 200,
      status: "success",
      data: { ...oUser },
      message: "Category created successfully",
    });
  } catch (err) {
    next(err);
  }
};

/* api_Category_Get_All */
export const api_Category_Get_All = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /*  res.json({
      message: "Hello World 🌍 iController_User_Get_All",
    }); */

    const iUser_All = await iCategoryModel.db_Category_Get_All();

    res.json({
      code: 200,
      status: "success",
      data: iUser_All,
      message: "Categorys retrieved successfully",
    });
  } catch (err) {
    next(err);
  }
};

/* api_Category_Get_ByCategoryTokenID */
export const api_Category_Get_ByCategoryTokenID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /*  res.json({
      message: "Hello World 🌍 iController_User-getOne",
    }); */

    console.log("url paramd id == " + req.params.id);
    const user: iCategory = await iCategoryModel.db_Category_Get_ByCategoryTokenID(
      req.params.id as unknown as string
    );
    res.json({
      status: "success",
      data: user,
      message: "Category retrieved successfully",
    });
  } catch (err) {
    next(err);
  }
};

/* api_Category_Update_ByCategoryTokenID */
export const api_Category_Update_ByCategoryTokenID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /*     res.json({
      message: "Hello World 🌍 iController_User-updateOne",
    }); */
    const user = await iCategoryModel.db_Category_Update_ByCategoryTokenID(req);
    res.json({
      status: "success",
      data: user,
      message: "Category updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const api_Category_Delete_ByCategoryTokenID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /*  res.json({
      message: "Hello World 🌍 iController_User-deleteOne",
    }); */
    const user = await iCategoryModel.db_Category_Delete_ByCategoryTokenID(
      req.params.id as string
    );
    res.json({
      status: "success",
      data: user,
      message: "Category deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

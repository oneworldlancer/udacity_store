import { ok } from "assert";
import { Request, Response, NextFunction } from "express";
/* import jwt from "jsonwebtoken"; */
import iUserModelManager from "../iModelManager/iModel_UserManager";
import iProductModelManager from "../iModelManager/iModel_ProductManager";
import iConfigManager from "../iStoreManager/iConfigManager";
import iUser from "../iTypeManager/iType_User";
import iProduct from "../iTypeManager/iType_Product";

const iProductModel = new iProductModelManager();

/* api_Product_New_Create */
export const api_Product_New_Create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const xProduct: iProduct = {
      product_name: req.body.product_name,
      product_price: req.body.product_price,
      category_name: req.body.category_name,
    };
    if (xProduct != null || xProduct != "undefined") {
      const oProduct: iProduct | null =
        await iProductModel.db_Product_New_Create(xProduct);
      res.json({
        code: 200,
        status: "success",
        data: { ...oProduct },
        message: "Product created successfully",
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

/* api_Product_Get_All */
export const api_Product_Get_All = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /*  res.json({
      message: "Hello World 🌍 iController_User_Get_All",
    }); */

    const iUser_All:iProduct[]|null = await iProductModel.db_Product_Get_All();

    res.json({
      code: 200,
      status: "success",
      data: iUser_All,
      message: "Products retrieved successfully",
    });
  } catch (err) {
    next(err);
  }
};


//api_Product_Get_All_ByCategoryName
export const api_Product_Get_All_ByCategoryName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const CategoryName: string=req.params.id;

    const iProduct_All = await iProductModel.db_Product_Get_All_ByCategoryName(
      CategoryName
    );

    res.json({
      code: 200,
      status: "success",
      data: iProduct_All,
      message: "Products retrieved successfully",
    });
  } catch (err) {
    next(err);
  }
};

/* api_Product_Get_ByProductTokenID */
export const api_Product_Get_ByProductTokenID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /*  res.json({
      message: "Hello World 🌍 iController_User-getOne",
    }); */

    console.log("url paramd id == " + req.params.id);
    const user: iProduct | null =
      await iProductModel.db_Product_Get_ByProductTokenID(
        req.params.id as unknown as string
      );
    res.json({
      status: "success",
      data: user,
      message: "Product retrieved successfully",
    });
  } catch (err) {
    next(err);
  }
};




/* api_Product_Get_ByPopular */
export const api_Product_Get_ByPopular = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
 
   const iProduct_All: iProduct[] | null =
     await iProductModel.db_Product_Get_ByPopular();
    res.json({
      status: "success",
      data: iProduct_All,
      message: "Products retrieved successfully",
    });
  } catch (err) {
    next(err);
  }
};

/* api_Product_Update_ByProductTokenID */
export const api_Product_Update_ByProductTokenID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const xProduct: iProduct = {
      product_name: req.body.product_name,
      product_price: req.body.product_price,
      category_name: req.body.category_name,
    };
    if (xProduct != null || xProduct != "undefined") {
      const user = await iProductModel.db_Product_Update_ByProductTokenID(
        xProduct
      );
      res.json({
        status: "success",
        data: user,
        message: "Product updated successfully",
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

export const api_Product_Delete_ByProductTokenID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /*  res.json({
      message: "Hello World 🌍 iController_User-deleteOne",
    }); */
    const user = await iProductModel.db_Product_Delete_ByProductTokenID(
      req.params.id as string
    );
    res.json({
      status: "success",
      data: user,
      message: "Product deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

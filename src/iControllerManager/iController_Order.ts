import { ok } from "assert";
import { Request, Response, NextFunction } from "express";
/* import jwt from "jsonwebtoken"; */
import iOrderModelManager from "../iModelManager/iModel_OrderManager";
import iConfigManager from "../iStoreManager/iConfigManager";
import iOrder from "../iTypeManager/iType_Order";

const iOrderModel = new iOrderModelManager();

/* api_Order_New_Create */
export const api_Order_New_Create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const xOrder: iOrder = {
      user_tokenid: req.body.user_tokenid,
      order_status: req.body.order_status,
    };

    if (xOrder != null || xOrder != "undefined") {
      const oOrder_New: iOrder | null = await iOrderModel.db_Order_New_Create(
        xOrder
      );
      res.json({
        code: 200,
        status: "success",
        data: { ...oOrder_New },
        message: "Order created successfully",
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

/* api_Order_Order_Add_Product */
export const api_Order_Order_Add_Product = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order_tokenid: string = req.params.id1;
    const product_tokenid: string = req.params.id2;

    if (order_tokenid != null && product_tokenid != null) {
   const oProduct_Added = await iOrderModel.db_Order_Add_Product(
        order_tokenid,
        product_tokenid
      ); 
      res.json({
        code: 200,
        status: "success",
        data: {
          order_tokenid: order_tokenid,
          product_tokenid: product_tokenid,
        },
        message: "Product added to order successfully",
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

/* api_Order_Get_All */
export const api_Order_Get_All = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /*  res.json({
      message: "Hello World 🌍 iController_User_Get_All",
    }); */

    const iUser_All = await iOrderModel.db_Order_Get_All();

    res.json({
      code: 200,
      status: "success",
      data: iUser_All,
      message: "Orders retrieved successfully",
    });
  } catch (err) {
    next(err);
  }
};

/* api_Order_Get_All_Close_ByUserTokenID */
export const api_Order_Get_All_Close_ByUserTokenID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user_tokenid: string = req.params.id;
    const iOrder_All = await iOrderModel.db_Order_Get_All_Close_ByUserTokenID(
      user_tokenid
    );

    res.json({
      code: 200,
      status: "success",
      data: iOrder_All,
      message: "Orders retrieved successfully",
    });
  } catch (err) {
    next(err);
  }
};




/* api_Order_Get_All_ByUserTokenID */
export const api_Order_Get_All_ByUserTokenID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user_tokenid: string = req.params.id;
    const iOrder_All = await iOrderModel.db_Order_Get_All_ByUserTokenID(
      user_tokenid
    );

    res.json({
      code: 200,
      status: "success",
      data: iOrder_All,
      message: "Orders retrieved successfully",
    });
  } catch (err) {
    next(err);
  }
};



/* api_Order_Get_ByOrderTokenID */
export const api_Order_Get_ByOrderTokenID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /*  res.json({
      message: "Hello World 🌍 iController_User-getOne",
    }); */

    console.log("url paramd id == " + req.params.id);
    const user: iOrder | null = await iOrderModel.db_Order_Get_ByOrderTokenID(
      req.params.id as unknown as string
    );
    res.json({
      status: "success",
      data: user,
      message: "Order retrieved successfully",
    });
  } catch (err) {
    next(err);
  }
};

/* api_Order_Update_ByOrderTokenID */
export const api_Order_Update_ByOrderTokenID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const xOrder: iOrder = {
      order_tokenid: req.body.order_tokenid,
      user_tokenid: req.body.user_tokenid,
      order_status: req.body.order_status,
    };

    if (xOrder != null || xOrder != "undefined") {
      const user = await iOrderModel.db_Order_Update_ByOrderTokenID(xOrder);
      res.json({
        status: "success",
        data: user,
        message: "Order updated successfully",
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

export const api_Order_Delete_ByOrderTokenID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /*  res.json({
      message: "Hello World 🌍 iController_User-deleteOne",
    }); */
    const user = await iOrderModel.db_Order_Delete_ByOrderTokenID(
      req.params.id as string
    );
    res.json({
      status: "success",
      data: user,
      message: "Order deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

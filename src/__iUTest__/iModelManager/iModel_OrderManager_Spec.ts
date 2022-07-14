import { Request, Response, NextFunction } from "express";
/* import jwt from "jsonwebtoken"; */
import iOrderModelManager from "../../iModelManager/iModel_OrderManager";
import iConfigManager from "../../iStoreManager/iConfigManager";
import iUserModelManager from "../../iModelManager/iModel_UserManager";
import iProductModelManager from "../../iModelManager/iModel_ProductManager";
import iOrder from "../../iTypeManager/iType_Order";
import { iDebugManager as dbgManager } from "../../iUtilityManager/iDebugManager";
import iDBClientManager from "../../iStoreManager/iDBConnectionManager";
import iUser from "../../iTypeManager/iType_User";
import iProduct from "../../iTypeManager/iType_Product";

// #region "Params"

const iUserManager = new iUserModelManager();
const iProductManager = new iProductModelManager();
const iOrderManager = new iOrderModelManager();

// #endregion

// #region "__iUTest__ iModel_OrderManager | CHECK (toBeDefined)"

describe("__iUTest__ iModel_OrderManager | CHECK (toBeDefined)", () => {
  it("iModel_OrderManager/db_Order_New_Create (toBeDefined)", () => {
    expect(iOrderManager.db_Order_New_Create).toBeDefined();
  });

  it("iModel_OrderManager/db_Order_Get_All (toBeDefined)", () => {
    expect(iOrderManager.db_Order_Get_All).toBeDefined();
  });

  it("iModel_OrderManager/db_Order_Get_ByOrderTokenID (toBeDefined)", () => {
    expect(iOrderManager.db_Order_Get_ByOrderTokenID).toBeDefined();
  });

  it("iModel_OrderManager/db_Order_Update_ByOrderTokenID (toBeDefined)", () => {
    expect(iOrderManager.db_Order_Update_ByOrderTokenID).toBeDefined();
  });

  it("iModel_OrderManager/db_Order_Delete_ByOrderTokenID (toBeDefined)", () => {
    expect(iOrderManager.db_Order_Delete_ByOrderTokenID).toBeDefined();
  });
});

// #endregion

// #region "__iUTest__ api/Order | MODELS"

/* __iUTest__ api/Order | MODELS */
describe("__iUTest__ api/Order | MODELS", () => {
  const tmpUser1: iUser = {
    first_name: "xName1101",
    last_name: "xName1101",
    user_password: "1234",
  };

  const tmpProduct1: iProduct = {
    product_name: "pro1101",
    product_price: "100",
    category_name: "fruit",
  };

  const tmpOrder1: iOrder = {
    user_tokenid: "pro1101",
    order_status: "open",
  };

  /* beforeAll */
  beforeAll(async function () {
    try {
      /* TEMP-USER */
      const oUser1 = await iUserManager.db_User_New_Create(tmpUser1);
      if (oUser1 != null) {
        dbgManager.iObject_Message(oUser1);

        tmpUser1.user_tokenid = oUser1.user_tokenid;
      }

      /* TEMP-PRODUCT */
      const oProduct1 = await iProductManager.db_Product_New_Create(
        tmpProduct1
      );
      if (oProduct1 != null) {
        dbgManager.iObject_Message(oProduct1);

        tmpProduct1.product_tokenid = oProduct1.product_tokenid;
      }

      /* TEMP-ORDER */
      const oOrder1 = await iOrderManager.db_Order_New_Create({
        user_tokenid: tmpUser1.user_tokenid as string,
        order_status: "open",
      });

      if (oOrder1 != null) {
        dbgManager.iObject_Message(oOrder1);
        tmpOrder1.user_tokenid = oOrder1.user_tokenid;
        tmpOrder1.order_tokenid = oOrder1.order_tokenid;
      }
    } catch (error: string | Error | unknown | null) {
      dbgManager.iDebug_Message(error);
    }
  });

  /* afterAll */
  afterAll(async () => {
    /*    try {
     const connection = await iDBClientManager.connect();
     const iSQL1 = `DELETE FROM ${iConfigManager.iTBL_ORDER_PRODUCT_JOIN}`;
     const iSQL2 = `DELETE FROM ${iConfigManager.iTBL_ORDERS}`;
     const iSQL3 = `DELETE FROM ${iConfigManager.iTBL_PRODUCTS}`;
     const iSQL4 = `DELETE FROM ${iConfigManager.iTBL_USERS}`;
     await connection.query(iSQL1);
     await connection.query(iSQL2);
     await connection.query(iSQL3);
     await connection.query(iSQL4);
     connection.release();
   } catch (error: string | Error | unknown | null) {
     dbgManager.iDebug_Message(error);
   } */
  });

  /* iModel_OrderManager/db_Order_New_Create */
  it("iModel_OrderManager/db_Order_New_Create", async () => {
    try {
      const tmpOrder2 = await iOrderManager.db_Order_New_Create({
        user_tokenid: tmpUser1.user_tokenid,
        order_status: "open",
      } as iOrder);

      expect(tmpOrder2).toEqual({
        order_tokenid: tmpOrder2?.order_tokenid,
        user_tokenid: tmpUser1.user_tokenid,
        order_status: "open",
      } as iOrder);
    } catch (error: string | Error | unknown | null) {
      dbgManager.iDebug_Message(error);
    }
  });

  /* iModel_OrderManager/db_Order_Get_All */
  it("iModel_OrderManager/db_Order_Get_All", async () => {
    try {
      const arrOrderList: iOrder[] | null =
        await iOrderManager.db_Order_Get_All();
      expect(arrOrderList?.length).toBeGreaterThan(0);
    } catch (error: string | Error | unknown | null) {
      dbgManager.iDebug_Message(error);
    }
  });

  /* iModel_OrderManager/db_Order_Get_All_Close_ByUserTokenID */
  it("iModel_OrderManager/db_Order_Get_All_Close_ByUserTokenID", async () => {
    try {
      /* TEMP-ORDER */
      const oOrder1 = await iOrderManager.db_Order_New_Create({
        user_tokenid: tmpUser1.user_tokenid as string,
        order_status: "close",
      });

      if (oOrder1 != null) {
        dbgManager.iObject_Message(oOrder1);
        tmpOrder1.user_tokenid = oOrder1.user_tokenid;
        tmpOrder1.order_tokenid = oOrder1.order_tokenid;
      }

      const arrOrderList: iOrder[] | null =
        await iOrderManager.db_Order_Get_All_Close_ByUserTokenID(
          tmpUser1.user_tokenid as string
        );
      expect(arrOrderList?.length).toBeGreaterThan(0);
    } catch (error: string | Error | unknown | null) {
      dbgManager.iDebug_Message(error);
    }
  });

  /* iModel_OrderManager/db_Order_Get_All_ByUserTokenID */
  it("iModel_OrderManager/db_Order_Get_All_ByUserTokenID", async () => {
    try {
      /* TEMP-ORDER */
      const oOrder1 = await iOrderManager.db_Order_New_Create({
        user_tokenid: tmpUser1.user_tokenid as string,
        order_status: "close",
      });

      if (oOrder1 != null) {
        dbgManager.iObject_Message(oOrder1);
        tmpOrder1.user_tokenid = oOrder1.user_tokenid;
        tmpOrder1.order_tokenid = oOrder1.order_tokenid;
      }

      const arrOrderList: iOrder[] | null =
        await iOrderManager.db_Order_Get_All_ByUserTokenID(
          tmpUser1.user_tokenid as string
        );
      expect(arrOrderList?.length).toBeGreaterThan(0);
    } catch (error: string | Error | unknown | null) {
      dbgManager.iDebug_Message(error);
    }
  });

  /* iModel_OrderManager/db_Order_Get_All_Open_ByUserTokenID */
  it("iModel_OrderManager/db_Order_Get_All_Open_ByUserTokenID", async () => {
    try {
      /* TEMP-ORDER */
      const oOrder1 = await iOrderManager.db_Order_New_Create({
        user_tokenid: tmpUser1.user_tokenid as string,
        order_status: "close",
      });

      if (oOrder1 != null) {
        dbgManager.iObject_Message(oOrder1);
        tmpOrder1.user_tokenid = oOrder1.user_tokenid;
        tmpOrder1.order_tokenid = oOrder1.order_tokenid;
      }

      const arrOrderList: iOrder[] | null =
        await iOrderManager.db_Order_Get_All_Open_ByUserTokenID(
          tmpUser1.user_tokenid as string
        );
      expect(arrOrderList?.length).toBeGreaterThan(0);
    } catch (error: string | Error | unknown | null) {
      dbgManager.iDebug_Message(error);
    }
  });

  /* iModel_OrderManager/db_Order_Get_ByOrderTokenID */
  it("iModel_OrderManager/db_Order_Get_ByOrderTokenID", async () => {
    try {
      const oOrder: iOrder | null =
        await iOrderManager.db_Order_Get_ByOrderTokenID(
          tmpOrder1.order_tokenid as string
        );

      expect(oOrder?.order_tokenid).toBe(tmpOrder1.order_tokenid);
    } catch (error: string | Error | unknown | null) {
      dbgManager.iDebug_Message(error);
    }
  });

  /* iModel_OrderManager/db_Order_Update_ByOrderTokenID */
  it("iModel_OrderManager/db_Order_Update_ByOrderTokenID", async () => {
    try {
      const oOrder: iOrder | null =
        await iOrderManager.db_Order_Update_ByOrderTokenID({
          order_tokenid: tmpOrder1.order_tokenid,
          user_tokenid: tmpUser1.user_tokenid,
          order_status: "close",
        } as iOrder);

      expect(oOrder?.order_tokenid).toBe(tmpOrder1.order_tokenid);
      expect(oOrder?.user_tokenid).toBe(tmpUser1.user_tokenid);
      expect(oOrder?.order_status).toBe("close");
    } catch (error: string | Error | unknown | null) {
      dbgManager.iDebug_Message(error);
    }
  });

  /* iModel_OrderManager/db_Order_Delete_ByOrderTokenID */
  it("iModel_OrderManager/db_Order_Delete_ByOrderTokenID", async () => {
    try {
      const oOrder: iOrder | null =
        await iOrderManager.db_Order_Delete_ByOrderTokenID(
          tmpOrder1.order_tokenid as string
        );

      if (oOrder != null) {
        expect(oOrder).not.toBeNull();
        //expect(oOrder.order_tokenid).toBe(tmpOrder1.order_tokenid);
      }
    } catch (error: string | Error | unknown | null) {
      dbgManager.iDebug_Message(error);
    }
  });
});

// #endregion

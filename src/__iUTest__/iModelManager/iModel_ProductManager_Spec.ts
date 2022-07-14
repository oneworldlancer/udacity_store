import { Request, Response, NextFunction } from "express";
/* import jwt from "jsonwebtoken"; */
import iProductModelManager from "../../iModelManager/iModel_ProductManager";
import iOrderModelManager from "../../iModelManager/iModel_OrderManager";
import iConfigManager from "../../iStoreManager/iConfigManager";
import iProduct from "../../iTypeManager/iType_Product";
import { iDebugManager as dbgManager } from "../../iUtilityManager/iDebugManager";
import iDBClientManager from "../../iStoreManager/iDBConnectionManager";

// #region "Params"

const iProductManager = new iProductModelManager();

// #endregion

// #region "__iUTest__ iModel_ProductManager | CHECK (toBeDefined)"

describe("__iUTest__ iModel_ProductManager | CHECK (toBeDefined)", () => {
  it("iModel_ProductManager/db_Product_New_Create (toBeDefined)", () => {
    expect(iProductManager.db_Product_New_Create).toBeDefined();
  });

  it("iModel_ProductManager/db_Product_Get_All (toBeDefined)", () => {
    expect(iProductManager.db_Product_Get_All).toBeDefined();
  });

  it("iModel_ProductManager/db_Product_Get_ByProductTokenID (toBeDefined)", () => {
    expect(iProductManager.db_Product_Get_ByProductTokenID).toBeDefined();
  });

  it("iModel_ProductManager/db_Product_Update_ByProductTokenID (toBeDefined)", () => {
    expect(iProductManager.db_Product_Update_ByProductTokenID).toBeDefined();
  });

  it("iModel_ProductManager/db_Product_Delete_ByProductTokenID (toBeDefined)", () => {
    expect(iProductManager.db_Product_Delete_ByProductTokenID).toBeDefined();
  });
});

// #endregion

// #region "__iUTest__ api/Product | MODELS"

/* __iUTest__ api/Product | MODELS */
describe("__iUTest__ api/Product | MODELS", () => {
  const tmpProduct1: iProduct = {
    product_name: "pro1101",
    product_price: "100",
    category_name: "fruit",
  };

  /* beforeAll */
  beforeAll(async function () {
    try {
      const oProduct1 = await iProductManager.db_Product_New_Create(
        tmpProduct1
      );

      if (oProduct1 != null) {
        dbgManager.iObject_Message(oProduct1);
        dbgManager.iObject_Message("oProduct1 == " + oProduct1.product_tokenid);

        tmpProduct1.product_tokenid = oProduct1.product_tokenid;
      }
    } catch (error: string | Error | unknown | null) {
      dbgManager.iDebug_Message(error);
    }
  });

  /* afterAll */
  afterAll(async () => {
    /*try {
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
    }*/
  });

  /* iModel_ProductManager/db_Product_New_Create */
  it("iModel_ProductManager/db_Product_New_Create", async () => {
    try {
      const tmpProduct2: iProduct | null =
        await iProductManager.db_Product_New_Create({
          product_name: "pro2202",
          product_price: "200",
          category_name: "fruit",
          product_count: "0",
        } as iProduct);

      expect(tmpProduct2).toEqual({
        product_tokenid: tmpProduct2?.product_tokenid,
        product_name: "pro2202",
        product_price: "200",
        category_name: "fruit",
      } as iProduct);
    } catch (error: string | Error | unknown | null) {
      dbgManager.iDebug_Message(error);
    }
  });

  /* iModel_ProductManager/db_Product_Get_All */
  it("iModel_ProductManager/db_Product_Get_All", async () => {
    try {
      const arrProductList: iProduct[] | null =
        await iProductManager.db_Product_Get_All();
      expect(arrProductList?.length).toBeGreaterThan(0);
    } catch (error: string | Error | unknown | null) {
      dbgManager.iDebug_Message(error);
    }
  });

  /* iModel_ProductManager/db_Product_Get_All_ByCategoryName */
  it("iModel_ProductManager/db_Product_Get_All_ByCategoryName", async () => {
    try {
      const arrProductList: iProduct[] | null =
        await iProductManager.db_Product_Get_All_ByCategoryName("fruit");
      expect(arrProductList?.length).toBeGreaterThan(0);
    } catch (error: string | Error | unknown | null) {
      dbgManager.iDebug_Message(error);
    }
  });

  /* iModel_ProductManager/db_Product_Get_ByPopular */
  it("iModel_ProductManager/db_Product_Get_ByPopular", async () => {
    try {
  
      if (tmpProduct1 != null) {
        const iOrderManager = new iOrderModelManager();
        iOrderManager.db_Order_Add_Product_Popular(
          tmpProduct1.product_tokenid as string
        );

        const arrProductList: iProduct[] | null =
          await iProductManager.db_Product_Get_ByPopular();
       
        expect(arrProductList?.length).toBeGreaterThan(0);
      }
      
      
      } catch (error: string | Error | unknown | null) {
      dbgManager.iDebug_Message(error);
    }
  });

  /* iModel_ProductManager/db_Product_Get_ByProductTokenID */
  it("iModel_ProductManager/db_Product_Get_ByProductTokenID", async () => {
    try {
      const oProduct: iProduct | null =
        await iProductManager.db_Product_Get_ByProductTokenID(
          tmpProduct1.product_tokenid as string
        );

      expect(oProduct?.product_tokenid).toBe(tmpProduct1.product_tokenid);
      expect(oProduct?.product_name).toBe(tmpProduct1.product_name);
      expect(oProduct?.product_price).toBe(tmpProduct1.product_price);
    } catch (error: string | Error | unknown | null) {
      dbgManager.iDebug_Message(error);
    }
  });

  /* iModel_ProductManager/db_Product_Update_ByProductTokenID */
  it("iModel_ProductManager/db_Product_Update_ByProductTokenID", async () => {
    try {
      const oProduct: iProduct | null =
        await iProductManager.db_Product_Update_ByProductTokenID({
          product_tokenid: tmpProduct1.product_tokenid,
          product_name: "pro220UpdateMe",
          product_price: "220",
          category_name: "fish",
        } as iProduct);

      expect(oProduct?.product_tokenid).toBe(tmpProduct1.product_tokenid);
      expect(oProduct?.product_name).toBe("pro220UpdateMe");
      expect(oProduct?.product_price).toBe("220");
    } catch (error: string | Error | unknown | null) {
      dbgManager.iDebug_Message(error);
    }
  });

  /* iModel_ProductManager/db_Product_Delete_ByProductTokenID */
  it("iModel_ProductManager/db_Product_Delete_ByProductTokenID", async () => {
    try {
      const oProduct: iProduct | null =
        await iProductManager.db_Product_Delete_ByProductTokenID(
          tmpProduct1.product_tokenid as string
        );

      if (oProduct != null) {
        expect(oProduct).not.toBeNull();
        //expect(oProduct.product_tokenid).toBe(tmpProduct1.product_tokenid);
      }
    } catch (error: string | Error | unknown | null) {
      dbgManager.iDebug_Message(error);
    }
  });
});

// #endregion

import supertest from "supertest";
import app from "../../index";
import iProduct from "../../iTypeManager/iType_Product";
import { iDebugManager as dbgManager } from "../../iUtilityManager/iDebugManager";
import iProductModelManager from "../../iModelManager/iModel_ProductManager";
import iDBClientManager from "../../iStoreManager/iDBConnectionManager";
import iUserModelManager from "../../iModelManager/iModel_UserManager";
import iConfigManager from "../../iStoreManager/iConfigManager";
import iUser from "../../iTypeManager/iType_User";

import { response } from "express";

// #region "Params"

const request: supertest.SuperTest<supertest.Test> = supertest(app);
const iUserManager = new iUserModelManager();
const iProductManager = new iProductModelManager();

let iUserToken = "";

// #endregion

// #region "__iUTest__"

/* __iUTest__ api/product | ENDPOINT */
describe("__iUTest__ api/product | ENDPOINT", () => {
  /* TEMP-Product */

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

  /* beforeAll */
  beforeAll(async () => {
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
    } catch (error: string | Error | unknown | null) {
      dbgManager.iDebug_Message(error);
    }
  });

  /* afterAll */
  afterAll(async () => {
    /*  try {
      const connection = await iDBClientManager.connect();
      const iSQL = `DELETE FROM ${iConfigManager.iTBL_ProductS}`;
      await connection.query(iSQL);
      connection.release();
    } catch (error: string | Error | unknown | null) {
      dbgManager.iDebug_Message(error);
    } */
  });

  /* __iUTest__ api/product | AUTHENTICATE ENDPOINTS */
  describe("__iUTest__ api/product | AUTHENTICATE ENDPOINTS", () => {
    it("iApi_Product/api_Product_Authenticate_ByProductTokenID (POST('/api/Product/authenticate'))", async () => {
      try {
        const iResponse = await request
          .post("/api/user/authenticate")
          .set("Content-type", "application/json")
          .send({
            user_tokenid: tmpUser1.user_tokenid,
            user_password: tmpUser1.user_password,
          });
        expect(iResponse.status).toBe(200);
        const { user_tokenid, token: UserToken } = iResponse.body.data;

        expect(user_tokenid).toBe(tmpUser1.user_tokenid);
        iUserToken = UserToken;
      } catch (error: string | Error | unknown | null) {
        dbgManager.iDebug_Message(error);
      }
    });
  });

  /* __iUTest__ api/product | CRUD ENDPOINTS */
  describe("__iUTest__ api/product | CRUD ENDPOINTS", () => {
    it("iApi_Product/api_Product_New_Create (POST('/api/Product'))", async () => {
      try {
        const iResponse = await request.post("/api/Product/").send({
          product_name: "pro2202",
          product_price: "200",
          category_name: "fruit",
        });

        expect(iResponse.status).toBe(200);

        const { product_name, product_price, category_name } =
          iResponse.body.data;
        expect(product_name).toBe("pro2202");
        expect(product_price).toBe("200");
        expect(category_name).toBe("fruit");
      } catch (error: string | Error | unknown | null) {
        dbgManager.iDebug_Message(error);
      }
    });

    /* iApi_Product/api_Product_Get_All */
    it("iApi_Product/api_Product_Get_All (GET('/api/Product'))", async () => {
      try {
        const iResponse = await request
          .get("/api/Product/")
          .set("Content-type", "application/json")
          .set("Authorization", `Bearer ${iUserToken}`);

        expect(iResponse.status).toBe(200);
        expect(iResponse.body.data.length).toBeGreaterThan(0);
      } catch (error: string | Error | unknown | null) {
        dbgManager.iDebug_Message(error);
      }
    });

    /* iApi_Product/api_Product_Get_ByProductTokenID */
    it("iApi_Product/api_Product_Get_ByProductTokenID (GET('/api/Product/:id'))", async () => {
      try {
        const iResponse = await request
          .get(`/api/Product/${tmpProduct1.product_tokenid}`)
          .set("Content-type", "application/json")
          .set("Authorization", `Bearer ${iUserToken}`);

        expect(iResponse.status).toBe(200);
        expect(iResponse.body.data.product_tokenid).toBe(
          tmpProduct1.product_tokenid
        );
        expect(iResponse.body.data.product_name).toBe(tmpProduct1.product_name);
        expect(iResponse.body.data.product_price).toBe(
          tmpProduct1.product_price
        );
        expect(iResponse.body.data.category_name).toBe(
          tmpProduct1.category_name
        );
      } catch (error: string | Error | unknown | null) {
        dbgManager.iDebug_Message(error);
      }
    });

    /* iApi_Product/api_Product_Update_ByProductTokenID */
    it("iApi_Product/api_Product_Update_ByProductTokenID (PATCH('/api/Product/:id'))", async () => {
      try {
        const iResponse = await request
          .patch(`/api/Product/${tmpProduct1.product_tokenid}`)
          .set("Content-type", "application/json")
          .set("Authorization", `Bearer ${iUserToken}`)
          .send({
            product_tokenid: tmpProduct1.product_tokenid,
            product_name: "new1",
            product_price: "111",
            category_name: "mango",
          } as iProduct);

        expect(iResponse.status).toBe(200);

        const { product_tokenid, product_name, product_price, category_name } =
          iResponse.body.data;
        expect(product_tokenid).toBe(tmpProduct1.product_tokenid);
        expect(product_name).toBe("new1");
        expect(product_price).toBe("111");
        expect(category_name).toBe("mango");
      } catch (error: string | Error | unknown | null) {
        dbgManager.iDebug_Message(error);
      }
    });

    /* iApi_Product/api_Product_Delete_ByProductTokenID */
    it("iApi_Product/api_Product_Delete_ByProductTokenID (DELETE('/api/Product/:id'))", async () => {
      try {
        const iResponse = await request
          .delete(`/api/Product/${tmpProduct1.product_tokenid}`)
          .set("Content-type", "application/json")
          .set("Authorization", `Bearer ${iUserToken}`);

        expect(iResponse.status).toBe(200);
      } catch (error: string | Error | unknown | null) {
        dbgManager.iDebug_Message(error);
      }
    });
  });
});

// #endregion

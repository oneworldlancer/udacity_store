import supertest from "supertest";
import app from "../../index";
import iOrder from "../../iTypeManager/iType_Order";
import { iDebugManager as dbgManager } from "../../iUtilityManager/iDebugManager";
import iOrderModelManager from "../../iModelManager/iModel_OrderManager";
import iProductModelManager from "../../iModelManager/iModel_ProductManager";
import iDBClientManager from "../../iStoreManager/iDBConnectionManager";
import iUserModelManager from "../../iModelManager/iModel_UserManager";
import iConfigManager from "../../iStoreManager/iConfigManager";
import iUser from "../../iTypeManager/iType_User";

import { response } from "express";
import iProduct from "../../iTypeManager/iType_Product";

// #region "Params"

const request: supertest.SuperTest<supertest.Test> = supertest(app);
const iUserManager = new iUserModelManager();
const iProductManager = new iProductModelManager();
const iOrderManager = new iOrderModelManager();

let iUserToken = "";

// #endregion

// #region "__iUTest__"

/* __iUTest__ api/order | ENDPOINT */
describe("__iUTest__ api/order | ENDPOINT", () => {
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
    /*  try {
      const connection = await iDBClientManager.connect();
      const iSQL = `DELETE FROM ${iConfigManager.iTBL_OrderS}`;
      await connection.query(iSQL);
      connection.release();
    } catch (error: string | Error | unknown | null) {
      dbgManager.iDebug_Message(error);
    } */
  });

  /* __iUTest__ api/order | AUTHENTICATE ENDPOINTS */
  describe("__iUTest__ api/order | AUTHENTICATE ENDPOINTS", () => {
    it("iApi_Order/api_Order_Authenticate_ByOrderTokenID (POST('/api/Order/authenticate'))", async () => {
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

  /* __iUTest__ api/order | CRUD ENDPOINTS */
  describe("__iUTest__ api/order | CRUD ENDPOINTS", () => {
    it("iApi_Order/api_Order_New_Create (POST('/api/Order'))", async () => {
      try {
        const iResponse = await request
          .post("/api/Order/")
          .set("Content-type", "application/json")
          .set("Authorization", `Bearer ${iUserToken}`)
          .send({
            user_tokenid: tmpUser1.user_tokenid,
            order_status: "open",
          });

        expect(iResponse.status).toBe(200);

        const { user_tokenid } = iResponse.body.data;
        expect(user_tokenid).toBe(tmpUser1.user_tokenid);
      } catch (error: string | Error | unknown | null) {
        dbgManager.iDebug_Message(error);
      }
    });

    /* iApi_Order/api_Order_Get_All */
    it("iApi_Order/api_Order_Get_All (GET('/api/Order'))", async () => {
      try {
        const iResponse = await request
          .get("/api/Order/")
          .set("Content-type", "application/json")
          .set("Authorization", `Bearer ${iUserToken}`);

        expect(iResponse.status).toBe(200);
        expect(iResponse.body.data.length).toBeGreaterThan(0);
      } catch (error: string | Error | unknown | null) {
        dbgManager.iDebug_Message(error);
      }
    });

    /* iApi_Order/api_Order_Get_All_Close_ByUserTokenID */
    it("iApi_Order/api_Order_Get_All_Close_ByUserTokenID (GET('/api/Order/User/:id'))", async () => {
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

        const iResponse = await request
          .get(`/api/order/user/${tmpUser1.user_tokenid}/close`)
          .set("Content-type", "application/json")
          .set("Authorization", `Bearer ${iUserToken}`);

        expect(iResponse.status).toBe(200);
        expect(iResponse.body.data.length).toBeGreaterThan(0);
      } catch (error: string | Error | unknown | null) {
        dbgManager.iDebug_Message(error);
      }
    });

    /* iApi_Order/api_Order_Get_ByOrderTokenID */
    it("iApi_Order/api_Order_Get_ByOrderTokenID (GET('/api/Order/:id'))", async () => {
      try {
        const iResponse = await request
          .get(`/api/Order/${tmpOrder1.order_tokenid}`)
          .set("Content-type", "application/json")
          .set("Authorization", `Bearer ${iUserToken}`);

        expect(iResponse.status).toBe(200);
        expect(iResponse.body.data.order_tokenid).toBe(tmpOrder1.order_tokenid);
      } catch (error: string | Error | unknown | null) {
        dbgManager.iDebug_Message(error);
      }
    });

    /* iApi_Order/api_Order_Update_ByOrderTokenID */
    it("iApi_Order/api_Order_Update_ByOrderTokenID (PATCH('/api/Order/:id'))", async () => {
      try {
        const iResponse = await request
          .patch(`/api/Order/${tmpOrder1.order_tokenid}`)
          .set("Content-type", "application/json")
          .set("Authorization", `Bearer ${iUserToken}`)
          .send({
            order_tokenid: tmpOrder1.order_tokenid,
            user_tokenid: tmpUser1.user_tokenid,
            order_status: "close",
          } as iOrder);

        expect(iResponse.status).toBe(200);

        const { order_tokenid, user_tokenid } = iResponse.body.data;
        expect(order_tokenid).toBe(tmpOrder1.order_tokenid);
        expect(user_tokenid).toBe(tmpUser1.user_tokenid);
      } catch (error: string | Error | unknown | null) {
        dbgManager.iDebug_Message(error);
      }
    });

    /* iApi_Order/api_Order_Delete_ByOrderTokenID */
    it("iApi_Order/api_Order_Delete_ByOrderTokenID (DELETE('/api/Order/:id'))", async () => {
      try {
        const iResponse = await request
          .delete(`/api/Order/${tmpOrder1.order_tokenid}`)
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

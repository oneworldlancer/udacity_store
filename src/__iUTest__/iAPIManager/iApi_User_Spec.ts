import supertest from "supertest";
import app from "../../index";
import iUser from "../../iTypeManager/iType_User";
import { iDebugManager as dbgManager } from "../../iUtilityManager/iDebugManager";
import iUserModelManager from "../../iModelManager/iModel_UserManager";
import iDBClientManager from "../../iStoreManager/iDBConnectionManager";
import iConfigManager from "../../iStoreManager/iConfigManager";
import { response } from "express";

// #region "Params"

const request: supertest.SuperTest<supertest.Test> = supertest(app);

const iUserManager = new iUserModelManager();

let iUserToken = "";

// #endregion

// #region "__iUTest__"

/* __iUTest__ api/user | ENDPOINT */
describe("__iUTest__ api/user | ENDPOINT", () => {
  /* TEMP-USER */
  const tmpUser1: iUser = {
    first_name: "fName1",
    last_name: "lName1",
    user_password: "1234",
  };

  /* beforeAll */
  beforeAll(async () => {
    try {
      const oUser1 = await iUserManager.db_User_New_Create(tmpUser1);

      if (oUser1 != null) {
        dbgManager.iObject_Message(oUser1);
        dbgManager.iObject_Message("oUser1 == " + oUser1?.user_tokenid);

        tmpUser1.user_tokenid = oUser1.user_tokenid;
      }
    } catch (error: string | Error | unknown | null) {
      dbgManager.iDebug_Message(error);
    }
  });

  /* afterAll */
  afterAll(async () => {
    /*  try {
      const connection = await iDBClientManager.connect();
      const iSQL = `DELETE FROM ${iConfigManager.iTBL_USERS}`;
      await connection.query(iSQL);
      connection.release();
    } catch (error: string | Error | unknown | null) {
      dbgManager.iDebug_Message(error);
    } */
  });

  /* __iUTest__ api/user | AUTHENTICATE ENDPOINTS */
  describe("__iUTest__ api/user | AUTHENTICATE ENDPOINTS", () => {
    it("iApi_User/api_User_Authenticate_ByUserTokenID (POST('/api/user/authenticate'))", async () => {
      try {
        const iResponse = await request
          .post("/api/user/authenticate")
          .set("Content-type", "application/json")
          .send({
            user_tokenid: tmpUser1.user_tokenid,
            user_password: tmpUser1.user_password,
          });
        expect(iResponse.status).toBe(200);
        const { user_tokenid, token: userToken } = iResponse.body.data;

        expect(user_tokenid).toBe(tmpUser1.user_tokenid);
        iUserToken = userToken;
      } catch (error: string | Error | unknown | null) {
        dbgManager.iDebug_Message(error);
      }
    });

    it("iApi_User/api_User_Authenticate_ByUserTokenID (POST('/api/user/authenticate')) | TEST WRONG USER", async () => {
      try {
        const iResponse = await request
          .post("/api/user/authenticate")
          .set("Content-type", "application/json")
          .send({
            user_tokenid: "12f0db5e-db89-445f-8e59-940ad50dd930",
            user_password: "1234",
          });

        expect(iResponse.status).toBe(401);
      } catch (error: string | Error | unknown | null) {
        dbgManager.iDebug_Message(error);
      }
    });
  });

  /* __iUTest__ api/user | CRUD ENDPOINTS */
  describe("__iUTest__ api/user | CRUD ENDPOINTS", () => {
    it("iApi_User/api_User_New_Create (POST('/api/user'))", async () => {
      try {
        const iResponse = await request.post("/api/user/").send({
          first_name: "fNEWUser1101",
          last_name: "lNEWUser1101",
          user_password: "1234",
        });

        expect(iResponse.status).toBe(200);

        const { first_name, last_name } = iResponse.body.data;
        expect(first_name).toBe("fNEWUser1101");
        expect(last_name).toBe("lNEWUser1101");
      } catch (error: string | Error | unknown | null) {
        dbgManager.iDebug_Message(error);
      }
    });

    /* iApi_User/api_User_Get_All */
    it("iApi_User/api_User_Get_All (GET('/api/user'))", async () => {
      try {
        const iResponse = await request
          .get("/api/user/")
          .set("Content-type", "application/json")
          .set("Authorization", `Bearer ${iUserToken}`);

        expect(iResponse.status).toBe(200);
        expect(iResponse.body.data.length).toBeGreaterThan(0);
      } catch (error: string | Error | unknown | null) {
        dbgManager.iDebug_Message(error);
      }
    });

    /* iApi_User/api_User_Get_ByUserTokenID */
    it("iApi_User/api_User_Get_ByUserTokenID (GET('/api/user/:id'))", async () => {
      try {
        const iResponse = await request
          .get(`/api/user/${tmpUser1.user_tokenid}`)
          .set("Content-type", "application/json")
          .set("Authorization", `Bearer ${iUserToken}`);

        expect(iResponse.status).toBe(200);
        expect(iResponse.body.data.user_tokenid).toBe(tmpUser1.user_tokenid);
        expect(iResponse.body.data.first_name).toBe(tmpUser1.first_name);
        expect(iResponse.body.data.last_name).toBe(tmpUser1.last_name);
      } catch (error: string | Error | unknown | null) {
        dbgManager.iDebug_Message(error);
      }
    });

    /* iApi_User/api_User_Update_ByUserTokenID */
    it("iApi_User/api_User_Update_ByUserTokenID (PATCH('/api/user/:id'))", async () => {
      try {
        const iResponse = await request
          .patch(`/api/user/${tmpUser1.user_tokenid}`)
          .set("Content-type", "application/json")
          .set("Authorization", `Bearer ${iUserToken}`)
          .send({
            user_tokenid: tmpUser1.user_tokenid,
            first_name: "fNameUpdateMe",
            last_name: "lNameUpdateMe",
          } as iUser);

        expect(iResponse.status).toBe(200);

        const { user_tokenid, first_name, last_name } = iResponse.body.data;
        expect(user_tokenid).toBe(tmpUser1.user_tokenid);
        expect(first_name).toBe("fNameUpdateMe");
        expect(last_name).toBe("lNameUpdateMe");
      } catch (error: string | Error | unknown | null) {
        dbgManager.iDebug_Message(error);
      }
    });

    /* iApi_User/api_User_Delete_ByUserTokenID */
    it("iApi_User/api_User_Delete_ByUserTokenID (DELETE('/api/user/:id'))", async () => {
      try {
        const iResponse = await request
          .delete(`/api/user/${tmpUser1.user_tokenid}`)
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

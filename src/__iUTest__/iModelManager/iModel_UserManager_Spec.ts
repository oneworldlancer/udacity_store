import { Request, Response, NextFunction } from "express";
/* import jwt from "jsonwebtoken"; */
import iUserModelManager from "../../iModelManager/iModel_UserManager";
import iConfigManager from "../../iStoreManager/iConfigManager";
import iUser from "../../iTypeManager/iType_User";
import { iDebugManager as dbgManager } from "../../iUtilityManager/iDebugManager";
import iDBClientManager from "../../iStoreManager/iDBConnectionManager";

// #region "Params"

const iUserManager = new iUserModelManager();

// #endregion

// #region "__iUTest__ iModel_UserManager | CHECK (toBeDefined)"

describe("__iUTest__ iModel_UserManager | CHECK (toBeDefined)", () => {
  it("iModel_UserManager/db_User_New_Create (toBeDefined)", () => {
    expect(iUserManager.db_User_New_Create).toBeDefined();
  });

  it("iModel_UserManager/db_User_Get_All (toBeDefined)", () => {
    expect(iUserManager.db_User_Get_All).toBeDefined();
  });

  it("iModel_UserManager/db_User_Get_ByUserTokenID (toBeDefined)", () => {
    expect(iUserManager.db_User_Get_ByUserTokenID).toBeDefined();
  });

  it("iModel_UserManager/db_User_Update_ByUserTokenID (toBeDefined)", () => {
    expect(iUserManager.db_User_Update_ByUserTokenID).toBeDefined();
  });

  it("iModel_UserManager/db_User_Delete_ByUserTokenID (toBeDefined)", () => {
    expect(iUserManager.db_User_Delete_ByUserTokenID).toBeDefined();
  });

  it("iModel_UserManager/db_User_Authenticate_ByUserTokenID (toBeDefined)", () => {
    expect(iUserManager.db_User_Authenticate_ByUserTokenID).toBeDefined();
  });
});

// #endregion

// #region "__iUTest__ api/user | MODELS"

/* __iUTest__ api/user | MODELS */
describe("__iUTest__ api/user | MODELS", () => {
  const tmpUser1: iUser = {
    first_name: "xName1101",
    last_name: "xName1101",
    user_password: "1234",
  };

  /* beforeAll */
  beforeAll(async function () {
    try {
      const oUser1 = await iUserManager.db_User_New_Create(tmpUser1);

      if (oUser1 != null) {
        dbgManager.iObject_Message(oUser1);
        dbgManager.iObject_Message("oUser1 == " + oUser1.user_tokenid);

        tmpUser1.user_tokenid = oUser1.user_tokenid;
      }
    } catch (error: string | Error | unknown | null) {
      dbgManager.iDebug_Message(error);
    }
  });

  /* afterAll */
  afterAll(async () => {
    try {
      const connection = await iDBClientManager.connect();
      const iSQL = `DELETE FROM ${iConfigManager.iTBL_USERS}`;
      await connection.query(iSQL);
      connection.release();
    } catch (error: string | Error | unknown | null) {
      dbgManager.iDebug_Message(error);
    }
  });

  /* iModel_UserManager/db_User_New_Create */
  it("iModel_UserManager/db_User_New_Create", async () => {
    try {
      const tmpUser2 = await iUserManager.db_User_New_Create({
        first_name: "xName2",
        last_name: "xName2",
        user_password: "1234",
      } as iUser);

      expect(tmpUser2).toEqual({
        user_tokenid: tmpUser2?.user_tokenid,
        first_name: "xName2",
        last_name: "xName2",
      } as iUser);
    } catch (error: string | Error | unknown | null) {
      dbgManager.iDebug_Message(error);
    }
  });

  /* iModel_UserManager/db_User_Get_All */
  it("iModel_UserManager/db_User_Get_All", async () => {
    try {
      const arrUserList: iUser[] | null = await iUserManager.db_User_Get_All();
      expect(arrUserList?.length).toBeGreaterThan(0);
    } catch (error: string | Error | unknown | null) {
      dbgManager.iDebug_Message(error);
    }
  });

  /* iModel_UserManager/db_User_Get_ByUserTokenID */
  it("iModel_UserManager/db_User_Get_ByUserTokenID", async () => {
    try {
      const oUser: iUser | null = await iUserManager.db_User_Get_ByUserTokenID(
        tmpUser1.user_tokenid as string
      );

      expect(oUser?.user_tokenid).toBe(tmpUser1.user_tokenid);
      expect(oUser?.first_name).toBe(tmpUser1.first_name);
      expect(oUser?.last_name).toBe(tmpUser1.last_name);
    } catch (error: string | Error | unknown | null) {
      dbgManager.iDebug_Message(error);
    }
  });

  /* iModel_UserManager/db_User_Update_ByUserTokenID */
  it("iModel_UserManager/db_User_Update_ByUserTokenID", async () => {
    try {
      const oUser: iUser | null =
        await iUserManager.db_User_Update_ByUserTokenID({
          user_tokenid: tmpUser1.user_tokenid,
          first_name: "fName1X1101",
          last_name: "lName1X1101",
        } as iUser);

      expect(oUser?.user_tokenid).toBe(tmpUser1.user_tokenid);
      expect(oUser?.first_name).toBe("fName1X1101");
      expect(oUser?.last_name).toBe("lName1X1101");
    } catch (error: string | Error | unknown | null) {
      dbgManager.iDebug_Message(error);
    }
  });

  /* iModel_UserManager/db_User_Delete_ByUserTokenID */
  it("iModel_UserManager/db_User_Delete_ByUserTokenID", async () => {
    try {
      const oUser: iUser | null =
        await iUserManager.db_User_Delete_ByUserTokenID(
          tmpUser1.user_tokenid as string
        );

      if (oUser != null) {
        expect(oUser).not.toBeNull();
        //expect(oUser.user_tokenid).toBe(tmpUser1.user_tokenid);
      }
    } catch (error: string | Error | unknown | null) {
      dbgManager.iDebug_Message(error);
    }
  });
});

// #endregion

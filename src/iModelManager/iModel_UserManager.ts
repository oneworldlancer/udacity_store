import express, { Application, Request, Response } from "express";
import bcrypt from "bcrypt";
import { iDebugManager as dbgManager } from "../iUtilityManager/iDebugManager";
import iProduct from "../iTypeManager/iType_User";
import iConfigManager from "../iStoreManager/iConfigManager";
import iHashManager from "../iUtilityManager/iHashManager";
import iDBClientManager from "../iStoreManager/iDBConnectionManager";
import iUser from "../iTypeManager/iType_User";

export class iUserModelManager {
  /* db_User_New_Create */
  async db_User_New_Create(xUser: iUser): Promise<iUser | null> {
    try {
      //console.log(xUser);
 
      if (xUser != null || xUser != "undefined") {
        const connection = await iDBClientManager.connect();

        const sql = `INSERT INTO ${iConfigManager.iTBL_USERS}
        (
            ${iConfigManager.iCLM_USER_FIRST_NAME}, 
            ${iConfigManager.iCLM_USER_LAST_NAME}, 
            ${iConfigManager.iCLM_USER_PASSWORD}
          )
                  values ($1, $2, $3)
                  RETURNING
                    ${iConfigManager.iCLM_USER_TOKENID},
                    ${iConfigManager.iCLM_USER_FIRST_NAME}, 
                    ${iConfigManager.iCLM_USER_LAST_NAME}`;

        //  iHashManager.iHash_Set_Password(xUser.user_password as string)
        const result = await connection.query(sql, [
          xUser.first_name,
          xUser.last_name,
          iHashManager.iHash_Set_Password(xUser.user_password as string)as string,
        ]);

        //console.log(result.rows[0].user_tokenid);

        connection.release();
        return result.rows[0];

        return xUser;
      }

      //throw new Error(`Unable to create user (${xUser.first_name}) }`);

      return null;
    } catch (error) {
      throw new Error(
        //`Unable to create (${xUser.first_name}): ${(error as Error).message}`

        `Unable to create (${xUser.first_name}): ${(error as Error).message}`
      );
    }
  }

  async db_User_New_Create_X1(xUser: iUser): Promise<iUser | null> {
    try {
      //console.log(xUser);

      const pswd: string | undefined = xUser.user_password;
      /* const xUser: iUser = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        User_Password: req.body.User_Password,
      }; */
      //User_TokenID, first_name, last_name
      if (xUser != null || xUser != "undefined") {
        const connection = await iDBClientManager.connect();
        const sql = `INSERT INTO ${iConfigManager.iTBL_USERS}
        (
            ${iConfigManager.iCLM_USER_FIRST_NAME}, 
            ${iConfigManager.iCLM_USER_LAST_NAME}, 
            ${iConfigManager.iCLM_USER_PASSWORD}
          )
                  values ($1, $2, $3)
                  RETURNING
                    ${iConfigManager.iCLM_USER_TOKENID},
                    ${iConfigManager.iCLM_USER_FIRST_NAME}, 
                    ${iConfigManager.iCLM_USER_LAST_NAME}`;

        const result = await connection.query(sql, [
          xUser.first_name,
          xUser.last_name,
          iHashManager.iHash_Set_Password(xUser.user_password as string),
        ]);
        console.log(result.rows[0].user_tokenid);
        /*   dbgManager.iDebug_Message(
          "oUser1|  result.rows[0] == " + result.rows[0].User_TokenID
        ); */
        connection.release();
        return result.rows[0];
      }

      //throw new Error(`Unable to create user (${xUser.first_name}) }`);

      return null;
    } catch (error) {
      throw new Error(
        //`Unable to create (${xUser.first_name}): ${(error as Error).message}`

        `Unable to create (${xUser.first_name}): ${(error as Error).message}`
      );
    }
  }

  /* db_User_Get_All */
  async db_User_Get_All(): Promise<iUser[] | null> {
    try {
      const connection = await iDBClientManager.connect();
      const sql = `SELECT 
    
     ${iConfigManager.iCLM_USER_TOKENID},
     ${iConfigManager.iCLM_USER_FIRST_NAME},
     ${iConfigManager.iCLM_USER_LAST_NAME}
          
     FROM ${iConfigManager.iTBL_USERS}`;

      const result = await connection.query(sql);
      connection.release();

      return result.rows;
    } catch (error) {
      throw new Error(`Error at retrieving users ${(error as Error).message}`);
    }
  }

  /* db_User_Get_ByUserTokenID */
  async db_User_Get_ByUserTokenID(id: string | unknown): Promise<iUser | null> {
    try {
      const sql = `SELECT 
      ${iConfigManager.iCLM_USER_TOKENID}, 
      ${iConfigManager.iCLM_USER_FIRST_NAME}, 
      ${iConfigManager.iCLM_USER_LAST_NAME}
      FROM
      ${iConfigManager.iTBL_USERS} 
      WHERE
      ${iConfigManager.iCLM_USER_TOKENID}=($1)`;

      const connection = await iDBClientManager.connect();

      const result = await connection.query(sql, [id]);

      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not find user ${id}, ${(error as Error).message}`);
    }
  }

  /* db_User_Update_ByUserTokenID */
  async db_User_Update_ByUserTokenID(xUser: iUser): Promise<iUser | null> {
    try {
      /*  const xUser: iUser = {
        user_tokenid: req.params.id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        user_password: req.body.User_Password,
      }; */

      if (xUser != null || xUser != "undefined") {
        const connection = await iDBClientManager.connect();

        const sql = `UPDATE 
                
        ${iConfigManager.iTBL_USERS}
      SET
        ${iConfigManager.iCLM_USER_FIRST_NAME}=$1,
        ${iConfigManager.iCLM_USER_LAST_NAME}=$2 
      WHERE
        ${iConfigManager.iCLM_USER_TOKENID}=$3
      RETURNING
        ${iConfigManager.iCLM_USER_TOKENID}, 
        ${iConfigManager.iCLM_USER_FIRST_NAME},
        ${iConfigManager.iCLM_USER_LAST_NAME}`;

        const result = await connection.query(sql, [
          xUser.first_name,
          xUser.last_name,
          xUser.user_tokenid,
        ]);
        connection.release();
        return result.rows[0];
      }
      return null;
      /*       throw new Error(
        `Could not update user: ${req.body.first_name} ${req.body.first_name}`
      ); */
    } catch (error) {
      return null;
      /*  throw new Error(
        `Could not update user:  ${req.body.first_name} ${
          req.body.first_name
        }, ${(error as Error).message}`
      ); */
    }
  }

  /* db_User_Delete_ByUserTokenID */
  async db_User_Delete_ByUserTokenID(id: string): Promise<iUser | null> {
    try {
      const connection = await iDBClientManager.connect();
      const sql = `DELETE 
      FROM 
        ${iConfigManager.iTBL_USERS}
      WHERE 
        ${iConfigManager.iCLM_USER_TOKENID}=($1) 
      RETURNING
        ${iConfigManager.iCLM_USER_FIRST_NAME},
        ${iConfigManager.iCLM_USER_LAST_NAME}`;

      const result = await connection.query(sql, [id]);

      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Could not delete user ${id}, ${(error as Error).message}`
      );
    }
  }

  /*  */
  async db_User_Authenticate_ByUserTokenID(
    user_tokenid: string,
    user_password: string
  ): Promise<iUser | null> {
    try {
      const connection = await iDBClientManager.connect();
      const sql = `SELECT 
       ${iConfigManager.iCLM_USER_PASSWORD} 
      FROM
       ${iConfigManager.iTBL_USERS} 
      WHERE
      ${iConfigManager.iCLM_USER_TOKENID}=$1`;

      const result = await connection.query(sql, [user_tokenid]);

      if (result.rows.length) {
        const { user_password: hashPassword } = result.rows[0];
        const isPasswordValid = bcrypt.compareSync(
          `${user_password}${iConfigManager.pepper}`,
          hashPassword
        );
        if (isPasswordValid) {
          const userInfo = await connection.query(
            `SELECT 
            ${iConfigManager.iCLM_USER_TOKENID}, 
            ${iConfigManager.iCLM_USER_FIRST_NAME}, 
            ${iConfigManager.iCLM_USER_LAST_NAME} 
            FROM 
              ${iConfigManager.iTBL_USERS} 
            WHERE 
               ${iConfigManager.iCLM_USER_TOKENID}=($1)`,
            [user_tokenid]
          );
          return userInfo.rows[0];
        }
      }
      connection.release();
      return null;
    } catch (error) {
      throw new Error(`Unable to login: ${(error as Error).message}`);
    }

    // return null;
  }
}

export default iUserModelManager;

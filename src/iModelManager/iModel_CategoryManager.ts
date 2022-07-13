import express, { Application, Request, Response } from "express";
import bcrypt from "bcrypt";
import { iDebugManager as dbgManager } from "../iUtilityManager/iDebugManager";
import iCategory from "../iTypeManager/iType_Category";
import iConfigManager from "../iStoreManager/iConfigManager";
import iDBClientManager from "../iStoreManager/iDBConnectionManager";

export class iCategoryModelManager {
  /* db_Category_New_Create */
  async db_Category_New_Create(req: Request): Promise<iCategory | undefined> {
    try {
      const xCategory: iCategory = {
        category_name: req.body.Category_Name,
      };

      if (xCategory != null || xCategory != "undefined") {
        const connection = await iDBClientManager.connect();
        const sql = `INSERT INTO ${iConfigManager.iTBL_CATEGORIES}
        (  ${iConfigManager.iCLM_CATEGORY_NAME})
                  values ($1)
                  RETURNING
                   ${iConfigManager.iCLM_CATEGORY_TOKENID}, 
            ${iConfigManager.iCLM_CATEGORY_NAME}`;

        const result = await connection.query(sql, [xCategory.category_name]);
        connection.release();
        return result.rows[0];
      }

      return;
      throw new Error(`Unable to create (${xCategory.category_name}) }`);
    } catch (error) {
      throw new Error(
        //`Unable to create (${xCategory.Category_Name}): ${(error as Error).message}`

        `Unable to create (${req.body.Category_Name}): ${
          (error as Error).message
        }`
      );
    }
  }

  /* db_Category_Get_All */
  async db_Category_Get_All(): Promise<iCategory[]> {
    try {
      const connection = await iDBClientManager.connect();
      const sql = `SELECT 
    
     ${iConfigManager.iCLM_CATEGORY_TOKENID},
     ${iConfigManager.iCLM_CATEGORY_NAME}
          
     FROM ${iConfigManager.iTBL_CATEGORIES}`;

      const result = await connection.query(sql);
      connection.release();

      return result.rows;
    } catch (error) {
      throw new Error(
        `Error at retrieving Categorys ${(error as Error).message}`
      );
    }
  }

  /* db_Category_Get_ByCategoryTokenID */
  async db_Category_Get_ByCategoryTokenID(
    id: string | unknown
  ): Promise<iCategory> {
    try {
      const sql = `SELECT 
      ${iConfigManager.iCLM_CATEGORY_TOKENID}, 
      ${iConfigManager.iCLM_CATEGORY_NAME}
      FROM
      ${iConfigManager.iTBL_CATEGORIES} 
      WHERE
      ${iConfigManager.iCLM_CATEGORY_TOKENID}=($1)`;

      const connection = await iDBClientManager.connect();

      const result = await connection.query(sql, [id]);

      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Could not find Category ${id}, ${(error as Error).message}`
      );
    }
  }

  /* db_Category_Update_ByCategoryTokenID */
  async db_Category_Update_ByCategoryTokenID(req: Request): Promise<iCategory> {
    try {
      const xCategory: iCategory = {
        category_tokenid: req.params.id,
        category_name: req.body.Category_Name,
      };

      if (xCategory != null || xCategory != "undefined") {
        const connection = await iDBClientManager.connect();

        const sql = `UPDATE 
                
        ${iConfigManager.iTBL_CATEGORIES}
      SET
        ${iConfigManager.iCLM_CATEGORY_NAME}=$1
      WHERE
        ${iConfigManager.iCLM_CATEGORY_TOKENID}=$2
      RETURNING
        ${iConfigManager.iCLM_CATEGORY_TOKENID}, 
        ${iConfigManager.iCLM_CATEGORY_NAME}`;

        const result = await connection.query(sql, [
          xCategory.category_name,
          xCategory.category_tokenid,
        ]);
        connection.release();
        return result.rows[0];
      }

      throw new Error(
        `Could not update Category: ${req.body.Category_Name} ${req.body.Category_Name}`
      );
    } catch (error) {
      throw new Error(
        `Could not update Category:  ${req.body.Category_Name} ${
          req.body.Category_Name
        }, ${(error as Error).message}`
      );
    }
  }

  /* db_Category_Delete_ByCategoryTokenID */
  async db_Category_Delete_ByCategoryTokenID(id: string): Promise<iCategory> {
    try {
      const connection = await iDBClientManager.connect();
      const sql = `DELETE 
      FROM 
        ${iConfigManager.iTBL_CATEGORIES}
      WHERE 
        ${iConfigManager.iCLM_CATEGORY_TOKENID}=($1) 
      RETURNING
        ${iConfigManager.iCLM_CATEGORY_TOKENID},
        ${iConfigManager.iCLM_CATEGORY_NAME}`;

      const result = await connection.query(sql, [id]);

      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Could not delete Category ${id}, ${(error as Error).message}`
      );
    }
  }
}

export default iCategoryModelManager;

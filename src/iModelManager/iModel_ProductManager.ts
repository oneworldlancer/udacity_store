import express, { Application, Request, Response } from "express";
import bcrypt from "bcrypt";
import { iDebugManager as dbgManager } from "../iUtilityManager/iDebugManager";
import iProduct from "../iTypeManager/iType_Product";
import iConfigManager from "../iStoreManager/iConfigManager";
import iHashManager from "../iUtilityManager/iHashManager";
import iDBClientManager from "../iStoreManager/iDBConnectionManager";

export class iProductModelManager {
  /* db_Product_New_Create */
  async db_Product_New_Create(xProduct: iProduct): Promise<iProduct | null> {
    try {
      if (xProduct != null || xProduct !== "undefined") {
        const connection = await iDBClientManager.connect();
        const sql = `INSERT INTO 
        ${iConfigManager.iTBL_PRODUCTS}
        (
        ${iConfigManager.iCLM_PRODUCT_NAME}, 
        ${iConfigManager.iCLM_PRODUCT_PRICE},
        ${iConfigManager.iCLM_CATEGORY_NAME} 
        )
      values ($1, $2, $3 )
      RETURNING
        ${iConfigManager.iCLM_PRODUCT_TOKENID},
        ${iConfigManager.iCLM_PRODUCT_NAME},
        ${iConfigManager.iCLM_PRODUCT_PRICE},
        ${iConfigManager.iCLM_CATEGORY_NAME}`;

        const result = await connection.query(sql, [
          xProduct.product_name,
          xProduct.product_price,
          xProduct.category_name  ]);

        connection.release();
        return result.rows[0];
      }
      return null;
      //throw new Error(`Unable to create (${req.body.Product_Name}) }`);
    } catch (error: string | Error | unknown | null) {
      dbgManager.iDebug_Message(error);
      return null;

      /*       throw new Error(
        //`Unable to create (${xProduct.Product_Name}): ${(error as Error).message}`

        `Unable to create (${xProduct.product_name as string}): ${
          (error as Error).message
        }`
      ); */
    }
  }

  /* db_Product_Get_All */
  async db_Product_Get_All(): Promise<iProduct[] | null> {
    try {
      const connection = await iDBClientManager.connect();

      const sql = `SELECT 
    
     ${iConfigManager.iCLM_PRODUCT_TOKENID},
     ${iConfigManager.iCLM_PRODUCT_NAME},
     ${iConfigManager.iCLM_PRODUCT_PRICE},
     ${iConfigManager.iCLM_CATEGORY_NAME},
     ${iConfigManager.iCLM_PRODUCT_COUNT}
          
     FROM ${iConfigManager.iTBL_PRODUCTS}`;

      const result = await connection.query(sql);
      connection.release();

      return result.rows;
    } catch (error) {
      throw new Error(
        `Error at retrieving Products ${(error as Error).message}`
      );
    }
  }

  async db_Product_Get_All_ByCategoryName(
    CategoryName: string
  ): Promise<iProduct[] | null> {
    try {
      const connection = await iDBClientManager.connect();

      const sql = `SELECT 
    
     ${iConfigManager.iCLM_PRODUCT_TOKENID},
     ${iConfigManager.iCLM_PRODUCT_NAME},
     ${iConfigManager.iCLM_PRODUCT_PRICE},
     ${iConfigManager.iCLM_CATEGORY_NAME},
     ${iConfigManager.iCLM_PRODUCT_COUNT}
          
     FROM ${iConfigManager.iTBL_PRODUCTS}
     WHERE
      ${iConfigManager.iCLM_CATEGORY_NAME}=($1)`;

      const result = await connection.query(sql, [CategoryName]);
      connection.release();

      return result.rows;
    } catch (error) {
      throw new Error(
        `Error at retrieving Products ${(error as Error).message}`
      );
    }
  }

  /* db_Product_Get_ByProductTokenID */
  async db_Product_Get_ByProductTokenID(
    id: string | unknown
  ): Promise<iProduct | null> {
    try {
      const sql = `SELECT 
      ${iConfigManager.iCLM_PRODUCT_TOKENID}, 
      ${iConfigManager.iCLM_PRODUCT_NAME}, 
      ${iConfigManager.iCLM_PRODUCT_PRICE},
      ${iConfigManager.iCLM_CATEGORY_NAME},
      ${iConfigManager.iCLM_PRODUCT_COUNT}
      FROM
      ${iConfigManager.iTBL_PRODUCTS} 
      WHERE
      ${iConfigManager.iCLM_PRODUCT_TOKENID}=($1)`;

      const connection = await iDBClientManager.connect();

      const result = await connection.query(sql, [id]);

      connection.release();
      return result.rows[0];
    } catch (error: string | Error | unknown | null) {
      dbgManager.iDebug_Message(error);
      return null;
      throw new Error(
        `Could not find Product ${id}, ${(error as Error).message}`
      );
    }
  }

  /* db_Product_Get_ByPopular */
  async db_Product_Get_ByPopular( ): Promise<iProduct[] | null> {
    try {
      const sql = `SELECT 
      ${iConfigManager.iCLM_PRODUCT_TOKENID}, 
      ${iConfigManager.iCLM_PRODUCT_NAME}, 
      ${iConfigManager.iCLM_PRODUCT_PRICE},
      ${iConfigManager.iCLM_CATEGORY_NAME},
      ${iConfigManager.iCLM_PRODUCT_COUNT}
      FROM
      ${iConfigManager.iTBL_PRODUCTS} 
      WHERE
      ${iConfigManager.iCLM_PRODUCT_COUNT} != ($1)
      ORDER BY
      ${iConfigManager.iCLM_PRODUCT_COUNT} 
      DESC LIMIT 5`;

      const connection = await iDBClientManager.connect();

      const result = await connection.query(sql,[0]);
      connection.release();

      return result.rows;
  
    } catch (error: string | Error | unknown | null) {
      dbgManager.iDebug_Message(error);
      return null;
     /*  throw new Error(
        `Could not find Product ${id}, ${(error as Error).message}`
      ); */
    }
  }

  /* db_Product_Update_ByProductTokenID */
  async db_Product_Update_ByProductTokenID(
    xProduct: iProduct
  ): Promise<iProduct | null> {
    try {
      /*   const xProduct: iProduct = {
        product_tokenid: req.params.id,
        product_name: req.body.Product_Name,
        product_price: req.body.Product_Price,
        category_tokenid: req.body.Category_TokenID,
      }; */

      if (xProduct != null || xProduct != "undefined") {
        const connection = await iDBClientManager.connect();

        const sql = `UPDATE 
                
        ${iConfigManager.iTBL_PRODUCTS}
      SET
        ${iConfigManager.iCLM_PRODUCT_NAME}=$1,
        ${iConfigManager.iCLM_PRODUCT_PRICE}=$2,
        ${iConfigManager.iCLM_CATEGORY_NAME}=$3
      WHERE
        ${iConfigManager.iCLM_PRODUCT_TOKENID}=$4
      RETURNING
        ${iConfigManager.iCLM_PRODUCT_TOKENID}, 
        ${iConfigManager.iCLM_PRODUCT_NAME},
        ${iConfigManager.iCLM_PRODUCT_PRICE},
        ${iConfigManager.iCLM_CATEGORY_NAME}`;

        const result = await connection.query(sql, [
          xProduct.product_name,
          xProduct.product_price,
          xProduct.category_name,
          xProduct.product_tokenid,
        ]);
        connection.release();
        return result.rows[0];
      }
      return null;
      /*     throw new Error(
        `Could not update Product: ${xProduct.product_name as string}`
      ); */
    } catch (error: string | Error | unknown | null) {
      dbgManager.iDebug_Message(error);
      return null; /*  throw new Error(
        `Could not update Product:  ${xProduct.product_name as string} ${
          req.body.Product_Name
        }, ${(error as Error).message} `
      );*/
    }
  }

  /* db_Product_Delete_ByProductTokenID */
  async db_Product_Delete_ByProductTokenID(
    id: string
  ): Promise<iProduct | null> {
    try {
      const connection = await iDBClientManager.connect();
      const sql = `DELETE 
      FROM 
        ${iConfigManager.iTBL_PRODUCTS}
      WHERE 
        ${iConfigManager.iCLM_PRODUCT_TOKENID}=($1) 
      RETURNING
        ${iConfigManager.iCLM_PRODUCT_NAME},
        ${iConfigManager.iCLM_PRODUCT_PRICE}`;

      const result = await connection.query(sql, [id]);

      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Could not delete Product ${id}, ${(error as Error).message}`
      );
    }
  }
}

export default iProductModelManager;

import { Application, Request, Response } from "express";
import { iDebugManager as dbgManager } from "../iUtilityManager/iDebugManager";
import iOrder from "../iTypeManager/iType_Order";
import iConfigManager from "../iStoreManager/iConfigManager";
import iHashManager from "../iUtilityManager/iHashManager";
import iDBClientManager from "../iStoreManager/iDBConnectionManager";
import iDateTimeManager from "../iUtilityManager/iDateTimeManager";
import iProduct from "../iTypeManager/iType_Product";
import iProductModelManager from "../iModelManager/iModel_ProductManager";
export class iOrderModelManager {
  /* db_Order_New_Create */
  async db_Order_New_Create(xOrder: iOrder): Promise<iOrder | null> {
    try {
      const iDateTimeNow = new Date();

      dbgManager.iDebug_Message(
        `iDateTimeNow == ${iDateTimeManager.iDateTime_Get_Date_Format(
          iDateTimeNow
        )}`
      );

      if (xOrder != null || xOrder !== "undefined") {
        const connection = await iDBClientManager.connect();
        const sql = `INSERT INTO 
        ${iConfigManager.iTBL_ORDERS}
        (
         ${iConfigManager.iCLM_USER_TOKENID}, 
         ${iConfigManager.iCLM_ORDER_STATUS}
          )
                  values ($1, $2)
                  RETURNING
                ${iConfigManager.iCLM_ORDER_TOKENID},
                ${iConfigManager.iCLM_USER_TOKENID},
                ${iConfigManager.iCLM_ORDER_STATUS}`;

        const result = await connection.query(sql, [
          xOrder.user_tokenid,
          xOrder.order_status,
        ]);
        connection.release();
        return result.rows[0];
      }
      return null;
      //throw new Error("");
    } catch (error: string | Error | unknown | null) {
      dbgManager.iDebug_Message(error);
      return null;

      /*  throw new Error(
        //`Unable to create (${xOrder.First_Name}): ${(error as Error).message}`

        `Unable to create order for userID (${req.body.User_TokenID}): ${
          (error as Error).message
        }`
      ); */
    }
  }

  /* db_Order_Add_Product */
  async db_Order_Add_Product(
    OrderTokenID: string,
    ProductTokenID: string
  ): Promise<void> {
    try {
      if (OrderTokenID != null && ProductTokenID !== null) {
        await this.db_Order_Add_Product_Join(OrderTokenID, ProductTokenID);

        await this.db_Order_Add_Product_Popular(ProductTokenID);
      }
      return;
      //throw new Error("");
    } catch (error: string | Error | unknown | null) {
      dbgManager.iDebug_Message(error);
      return;

      /*  throw new Error(
        //`Unable to create (${xOrder.First_Name}): ${(error as Error).message}`

        `Unable to create order for userID (${req.body.User_TokenID}): ${
          (error as Error).message
        }`
      ); */
    }
  }

  /* db_Order_Add_Product_Join */
  async db_Order_Add_Product_Join(
    OrderTokenID: string,
    ProductTokenID: string
  ): Promise<void> {
    try {
      if (OrderTokenID != null && ProductTokenID !== null) {
        const connection = await iDBClientManager.connect();
        const sql = `INSERT INTO 
        ${iConfigManager.iTBL_ORDER_PRODUCT_JOIN}
        (
         ${iConfigManager.iCLM_ORDER_TOKENID}, 
         ${iConfigManager.iCLM_PRODUCT_TOKENID},
         ${iConfigManager.iCLM_PRODUCT_QUANTITY}
          )
                  values ($1, $2,$3)
                  RETURNING
                ${iConfigManager.iCLM_ORDER_TOKENID},
                ${iConfigManager.iCLM_PRODUCT_TOKENID},
                ${iConfigManager.iCLM_PRODUCT_QUANTITY}`;

        const result = await connection.query(sql, [
          OrderTokenID,
          ProductTokenID,
          1,
        ]);
        connection.release();

        //////////////////////////

        return result.rows[0];
      }
      return;
      //throw new Error("");
    } catch (error: string | Error | unknown | null) {
      dbgManager.iDebug_Message(error);
      return;

      /*  throw new Error(
        //`Unable to create (${xOrder.First_Name}): ${(error as Error).message}`

        `Unable to create order for userID (${req.body.User_TokenID}): ${
          (error as Error).message
        }`
      ); */
    }
  }

  /* db_Order_Add_Product_Popular */
  async db_Order_Add_Product_Popular(ProductTokenID: string): Promise<void> {
    try {
      if (ProductTokenID != null) {
        const iProductManager = new iProductModelManager();
        const xProduct: iProduct | unknown = iProductManager
          .db_Product_Get_ByProductTokenID(ProductTokenID)
          .then(async function (oProduct) {
            console.log(oProduct); // "secondPromise"

            if (oProduct != null) {
              const iProductCount: number = parseInt(
                oProduct.product_count as string
              );

              const connection = await iDBClientManager.connect();

              const sql = `UPDATE 
                
        ${iConfigManager.iTBL_PRODUCTS}
      SET
        ${iConfigManager.iCLM_PRODUCT_COUNT}=$1 
      WHERE
        ${iConfigManager.iCLM_PRODUCT_TOKENID}=$2
      RETURNING
        ${iConfigManager.iCLM_PRODUCT_TOKENID}, 
        ${iConfigManager.iCLM_PRODUCT_COUNT} `;

              const result = await connection.query(sql, [
                iProductCount + 1,
                ProductTokenID,
              ]);
              connection.release();
              return result.rows[0];
            }
          });
      }
      return;
      //throw new Error("");
    } catch (error: string | Error | unknown | null) {
      dbgManager.iDebug_Message(error);
      return;

      /*  throw new Error(
        //`Unable to create (${xOrder.First_Name}): ${(error as Error).message}`

        `Unable to create order for userID (${req.body.User_TokenID}): ${
          (error as Error).message
        }`
      ); */
    }
  }

  /* db_Order_Get_All */
  async db_Order_Get_All(): Promise<iOrder[] | null> {
    try {
      const connection = await iDBClientManager.connect();
      const sql = `SELECT 
    
     ${iConfigManager.iCLM_ORDER_TOKENID},
     ${iConfigManager.iCLM_USER_TOKENID},
     ${iConfigManager.iCLM_ORDER_STATUS}
          
     FROM ${iConfigManager.iTBL_ORDERS}`;

      const result = await connection.query(sql);
      connection.release();

      return result.rows;

      //throw new Error("`Could not delete Order ${id}`");
    } catch (error) {
      throw new Error(`Error at retrieving Orders ${(error as Error).message}`);
    }
  }

  /* db_Order_Get_All_Close_ByUserTokenID */
  async db_Order_Get_All_Close_ByUserTokenID(
    UserTokenID: string
  ): Promise<iOrder[] | null> {
    try {
      const connection = await iDBClientManager.connect();
      const sql = `SELECT 
    
     ${iConfigManager.iCLM_ORDER_TOKENID},
     ${iConfigManager.iCLM_USER_TOKENID},
     ${iConfigManager.iCLM_ORDER_STATUS}
          
     FROM ${iConfigManager.iTBL_ORDERS}
     WHERE
     ${iConfigManager.iCLM_USER_TOKENID}=($1)
     AND 
      ${iConfigManager.iCLM_ORDER_STATUS}=($2)  `;

      const result = await connection.query(sql, [UserTokenID, "close"]);
      connection.release();

      return result.rows;

      //throw new Error("`Could not delete Order ${id}`");
    } catch (error) {
      throw new Error(`Error at retrieving Orders ${(error as Error).message}`);
    }
  }

  /* db_Order_Get_All_Open_ByUserTokenID */
  async db_Order_Get_All_Open_ByUserTokenID(
    UserTokenID: string
  ): Promise<iOrder[] | null> {
    try {
      const connection = await iDBClientManager.connect();
      const sql = `SELECT 
    
     ${iConfigManager.iCLM_ORDER_TOKENID},
     ${iConfigManager.iCLM_USER_TOKENID},
     ${iConfigManager.iCLM_ORDER_STATUS}
          
     FROM ${iConfigManager.iTBL_ORDERS}
     WHERE
     ${iConfigManager.iCLM_USER_TOKENID}=($1)
     AND 
      ${iConfigManager.iCLM_ORDER_STATUS}=($2)  `;

      const result = await connection.query(sql, [UserTokenID, "open"]);
      connection.release();

      return result.rows;

      //throw new Error("`Could not delete Order ${id}`");
    } catch (error) {
      throw new Error(`Error at retrieving Orders ${(error as Error).message}`);
    }
  }

  /* db_Order_Get_All_ByUserTokenID */
  async db_Order_Get_All_ByUserTokenID(
    UserTokenID: string
  ): Promise<iOrder[] | null> {
    try {
      const connection = await iDBClientManager.connect();
      const sql = `SELECT 
    
     ${iConfigManager.iCLM_ORDER_TOKENID},
     ${iConfigManager.iCLM_USER_TOKENID},
     ${iConfigManager.iCLM_ORDER_STATUS}
          
     FROM ${iConfigManager.iTBL_ORDERS}
     WHERE
     ${iConfigManager.iCLM_USER_TOKENID}=($1)`;

      const result = await connection.query(sql, [UserTokenID]);
      connection.release();

      return result.rows;

      //throw new Error("`Could not delete Order ${id}`");
    } catch (error) {
      throw new Error(`Error at retrieving Orders ${(error as Error).message}`);
    }
  }

  /* db_Order_Get_ByOrderTokenID */
  async db_Order_Get_ByOrderTokenID(
    id: string | unknown
  ): Promise<iOrder | null> {
    try {
      const sql = `SELECT 
      ${iConfigManager.iCLM_ORDER_TOKENID}, 
      ${iConfigManager.iCLM_USER_TOKENID}, 
      ${iConfigManager.iCLM_ORDER_STATUS}
      FROM
      ${iConfigManager.iTBL_ORDERS} 
      WHERE
      ${iConfigManager.iCLM_ORDER_TOKENID}=($1)`;

      const connection = await iDBClientManager.connect();

      const result = await connection.query(sql, [id]);

      connection.release();
      return result.rows[0];

      throw new Error(`Could not get Order ${id}`);
    } catch (error) {
      throw new Error(
        `Could not find Order ${id}, ${(error as Error).message}`
      );
    }
  }

  /* db_Order_Update_ByOrderTokenID */
  async db_Order_Update_ByOrderTokenID(xOrder: iOrder): Promise<iOrder | null> {
    try {
      /*  const xOrder: iOrder = {
        order_tokenid: req.params.id,
        order_status: req.body.Order_Status,
      }; */

      if (xOrder != null || xOrder != "undefined") {
        const connection = await iDBClientManager.connect();

        const sql = `UPDATE 
                
        ${iConfigManager.iTBL_ORDERS}
      SET
        ${iConfigManager.iCLM_ORDER_STATUS}=$1 
      WHERE
        ${iConfigManager.iCLM_ORDER_TOKENID}=$2
      RETURNING
        ${iConfigManager.iCLM_ORDER_TOKENID}, 
        ${iConfigManager.iCLM_USER_TOKENID},
        ${iConfigManager.iCLM_ORDER_STATUS}`;

        const result = await connection.query(sql, [
          xOrder.order_status,
          xOrder.order_tokenid,
        ]);
        connection.release();
        return result.rows[0];
      }
      return null;
      /*  throw new Error(
        `Could not update Order: ${req.body.First_Name} ${req.body.First_Name}`
      ); */
    } catch (error: string | Error | unknown | null) {
      dbgManager.iDebug_Message(error);
      return null; /*  throw new Error(
        `Could not update Order:  ${req.body.First_Name} ${
          req.body.First_Name
        }, ${(error as Error).message}`
      ); */
    }
  }

  /* db_Order_Delete_ByOrderTokenID */
  async db_Order_Delete_ByOrderTokenID(id: string): Promise<iOrder | null> {
    try {
      const connection = await iDBClientManager.connect();
      const sql = `DELETE 
      FROM 
        ${iConfigManager.iTBL_ORDERS}
      WHERE 
        ${iConfigManager.iCLM_ORDER_TOKENID}=($1) 
      RETURNING
        ${iConfigManager.iCLM_ORDER_TOKENID},
        ${iConfigManager.iCLM_USER_TOKENID}`;

      const result = await connection.query(sql, [id]);

      connection.release();

      return result.rows[0];

      /*   throw new Error(
        `Could not delete Order ${id}`
      ); */
    } catch (error) {
      throw new Error(
        `Could not delete Order ${id}, ${(error as Error).message}`
      );
    }
  }
}

export default iOrderModelManager;

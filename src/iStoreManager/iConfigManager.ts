//import { iDebugManager as dbgManager } from "./iUtilityManager/iDebugManager";
import * as dotenv from "dotenv";

dotenv.config();

//dbgManager.iDebug_Message("iConfigManager == " + process.env.iPORT);

const {
  iPORT,
  iNODE_ENV,
  iPOSTGRES_HOST,
  iPOSTGRES_PORT,
  iPOSTGRES_DB_DEV,
  iPOSTGRES_DB_TST,
  iPOSTGRES_USER,
  iPOSTGRES_PASSWORD,
  BCRYPT_PASSWORD,
  SALT_ROUNDS,
  TOKEN_SECRET,

  /* Tables */
  iTBL_USERS,
  iTBL_PRODUCTS,
  iTBL_CATEGORIES,
  iTBL_ORDERS,
  iTBL_ORDER_PRODUCT_JOIN,

  /* Columns */
  iCLM_USER_TOKENID,
  iCLM_USER_FIRST_NAME,
  iCLM_USER_LAST_NAME,
  iCLM_USER_PASSWORD,

  iCLM_PRODUCT_TOKENID,
  iCLM_PRODUCT_NAME,
  iCLM_PRODUCT_PRICE,
  iCLM_PRODUCT_QUANTITY,
  iCLM_PRODUCT_COUNT,

  iCLM_CATEGORY_TOKENID,
  iCLM_CATEGORY_NAME,

  iCLM_ORDER_TOKENID,
  iCLM_ORDER_STATUS,
} = process.env;

export default {
  iPort: iPORT,
  iNode_Env: iNODE_ENV,
  iDB_Host: iPOSTGRES_HOST,
  iDB_Port: iPOSTGRES_PORT,
  iDB_Dev: iPOSTGRES_DB_DEV,
  iDB_Tst: iPOSTGRES_DB_TST,
  iDB_User: iPOSTGRES_USER,
  iDB_Password: iPOSTGRES_PASSWORD,
  iDB_Databse: iNODE_ENV == "dev" ? iPOSTGRES_DB_DEV : iPOSTGRES_DB_TST,
  pepper: BCRYPT_PASSWORD,
  salt: SALT_ROUNDS,
  tokenSecret: TOKEN_SECRET,

  iTBL_USERS: iTBL_USERS,
  iTBL_PRODUCTS: iTBL_PRODUCTS,
  iTBL_CATEGORIES: iTBL_CATEGORIES,
  iTBL_ORDERS: iTBL_ORDERS,
  iTBL_ORDER_PRODUCT_JOIN:iTBL_ORDER_PRODUCT_JOIN,

  iCLM_USER_TOKENID: iCLM_USER_TOKENID,
  iCLM_USER_FIRST_NAME: iCLM_USER_FIRST_NAME,
  iCLM_USER_LAST_NAME: iCLM_USER_LAST_NAME,
  iCLM_USER_PASSWORD: iCLM_USER_PASSWORD,

  iCLM_PRODUCT_TOKENID: iCLM_PRODUCT_TOKENID,
  iCLM_PRODUCT_NAME: iCLM_PRODUCT_NAME,
  iCLM_PRODUCT_PRICE: iCLM_PRODUCT_PRICE,
  iCLM_PRODUCT_QUANTITY: iCLM_PRODUCT_QUANTITY,
  iCLM_PRODUCT_COUNT:iCLM_PRODUCT_COUNT,

  iCLM_CATEGORY_TOKENID: iCLM_CATEGORY_TOKENID,
  iCLM_CATEGORY_NAME: iCLM_CATEGORY_NAME,
  iCLM_ORDER_TOKENID: iCLM_ORDER_TOKENID,
  iCLM_ORDER_STATUS: iCLM_ORDER_STATUS,
};

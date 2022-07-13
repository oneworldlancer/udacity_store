import { iDebugManager as dbgManager } from "../iUtilityManager/iDebugManager";
import iConfigManager from "./iConfigManager";
import { Pool } from "pg";

/* console.warn(
  "iDBConnectionManager-POSTGRES_HOST == " + iConfigManager.iDB_Port
); */

const iDBClientManager = new Pool({
  host: iConfigManager.iDB_Host,
  database: iConfigManager.iDB_Databse,
  user: iConfigManager.iDB_User,
  password: iConfigManager.iDB_Password,
  port: parseInt(iConfigManager.iDB_Port as string, 10),
});

iDBClientManager.on("error", (error: Error) => {
  dbgManager.iDebug_Message(`iDBClientManager-Error == ${error}`);
});

export default iDBClientManager;

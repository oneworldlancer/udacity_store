import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import { iDebugManager as dbgManager } from "./iUtilityManager/iDebugManager";
import iConfigManager from "./iStoreManager/iConfigManager";
import iDBClientManager from "./iStoreManager/iDBConnectionManager";
import iRouteManager from "./iRouteManager";
 import bodyParser from "body-parser";
 
 
/* dbgManager.iDebug_Message(
  `iConfigManager.iDB_Port == ${iConfigManager.iPort}`
); */

//dbgManager.iDebug_Message(`iDBConnectionManager == ${iDBClientManager}`);



const iPort = iConfigManager.iPort || 3000;
//const xPORT = iDBConnection.connect;



// create an instance server
const app: Application = express();

 
app.use(bodyParser.json());

// HTTP request logger middleware
app.use(morgan("short"));



app.get("/api", (req: Request, res: Response) => {
  res.json({
    code: 200,
    status: "success",
    message: "Hello World 2022 🌍",
  });
});



// add routing for / path
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Hello World 2022 🌍",
    //message: "Hello from Shaymaa Hafez Ebrahiem\noneworldlancer@gmail.com",
  });
});



app.use("/api", iRouteManager);





// #region "Test DB"

/* try {
  
iDBClientManager
  .connect()
  .then((client) => {
  return client
    .query("SELECT NOW()")
    .then((res) => {
      client.release();
      dbgManager.iDebug_Message(`iDBClientManager-Client == ${res.rows}`);
    })
    .catch((error: Error) => {
      client.release();
      dbgManager.iDebug_Message(`iDBClientManager-Client == ${error.message}`);
    });
});

} catch (error) {
      dbgManager.iDebug_Message(`iDBClientManager-Client == ${error}`); 
} */

// #endregion






// start express server
app.listen(iPort, () => {
  dbgManager.iDebug_Message(`Server is starting at port:${iPort}`);
});

export default app;

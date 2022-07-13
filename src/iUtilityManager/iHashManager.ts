import iConfigManager from "../iStoreManager/iConfigManager";
import bcrypt from "bcrypt";
import { iDebugManager as dbgManager } from "../iUtilityManager/iDebugManager";


export class iHashManager {
  /*   strMessage: string;
  constructor(folder: string) {
    this.strMessage = folder;
  } */

  /* iHash_Set_Password */
  static iHash_Set_Password = (iPassword: string) => {
    try {
      const salt = parseInt(iConfigManager.salt as string, 10);
      return bcrypt.hashSync(`${iPassword}${iConfigManager.pepper}`, salt);
    } catch (error) {
      dbgManager.iDebug_Message(`${error}`);
    }
  };

  /* iHash_Get_Password */
  static iHash_Get_Password = (iPassword: string) => {
    try {
      const salt = parseInt(iConfigManager.salt as string, 10);
      return bcrypt.hashSync(`${iPassword}${iConfigManager.pepper}`, salt);
    } catch (error) {
      dbgManager.iDebug_Message(`${error}`);
    }
  };

  /* iDebug_Message */
}

export default iHashManager;

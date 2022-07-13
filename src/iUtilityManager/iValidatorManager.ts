import { iDebugManager as dbgManager } from "./iDebugManager";

export class iValidatorManager {
  strValue: string;
  constructor(folder: string) {
    this.strValue = folder;
  }

  /* Validator_isNumber */
  static Validator_isNumber(value: string | number): boolean {
    try {
      return value != null && value !== "" && !isNaN(Number(value.toString()));
    } catch (error: string | Error | unknown | null) {
      dbgManager.iDebug_Message(error);
      return false;
    }
  }
}

export default iValidatorManager;

export class iDateTimeManager {
  strMessage: string;
  constructor(folder: string) {
    this.strMessage = folder;
  }

  /* iDateTime_Get_Now */
  static iDateTime_Get_Now(): string {
    try {
      return new Date().toString();
    } catch (error: string | Error | unknown | null) {
      console.log(error);
      return "0";
    }
  }

  /* iDateTime_Get_Now */
  /*   static iDateTime_Get_Now(iDateTimeNow: Date): string {
    try {
      return new Date().toString();
    } catch (error: string | Error | unknown | null) {
      console.log(error);
      return "0";
    }
  } */

  /* iDateTime_Get_Now_MilliSec */
  static iDateTime_Get_Now_MilliSec(): string {
    try {
      return new Date().getMilliseconds.toString();
    } catch (error: string | Error | unknown | null) {
      console.log(error);
      return "0";
    }
  }

  /* iDateTime_Get_Now_MilliSec */
  static iDateTime_Get_Date_MilliSec(iDateTime: Date): string {
    try {
      return iDateTime.getMilliseconds().toString();
    } catch (error: string | Error | unknown | null) {
      console.log(error);
      return "0";
    }
  }

  /* iDateTime_Get_Now_Day */
  static iDateTime_Get_Now_Day(): string {
    try {
      return new Date().getDay().toString();
    } catch (error: string | Error | unknown | null) {
      console.log(error);
      return "0";
    }
  }

  /* iDateTime_Get_Now_Month */
  static iDateTime_Get_Now_Month(): string {
    try {
      return new Date().getMonth().toString();
    } catch (error: string | Error | unknown | null) {
      console.log(error);
      return "0";
    }
  }

  /* iDateTime_Get_Now_Year */
  static iDateTime_Get_Now_Year(): string {
    try {
      return new Date().getFullYear().toString();
    } catch (error: string | Error | unknown | null) {
      console.log(error);
      return "0";
    }
  }

  /* iDateTime_Get_Now_Hour */
  static iDateTime_Get_Now_Hour(): string {
    try {
      return new Date().getHours().toString();
    } catch (error: string | Error | unknown | null) {
      console.log(error);
      return "0";
    }
  }

  /* iDateTime_Get_Now_Minute */
  static iDateTime_Get_Now_Minute(): string {
    try {
      return new Date().getMinutes().toString();
    } catch (error: string | Error | unknown | null) {
      console.log(error);
      return "0";
    }
  }

  /* iDateTime_Get_Now_Format */
  static iDateTime_Get_Now_Format(): string {
    try {
      return new Date().toUTCString().toString();
    } catch (error: string | Error | unknown | null) {
      console.log(error);
      return "0";
    }
  }

  /* iDateTime_Get_Date_Format */
  static iDateTime_Get_Date_Format(iDateTime: Date): string {
    try {
      return iDateTime.toUTCString().toString();
    } catch (error: string | Error | unknown | null) {
      console.log(error);
      return "0";
    }
  }
}

export default iDateTimeManager;

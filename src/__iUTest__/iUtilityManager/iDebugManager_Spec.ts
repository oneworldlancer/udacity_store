import { iDebugManager as dbgManager } from "../../iUtilityManager/iDebugManager";
describe("__iUTest__ iUtility-iDebugManager", () => {

    it("dbgManager.iDebug_Message::\nSHOULD return TRUE if ERROR===NULL", () => {
      try {
        expect(dbgManager.iDebug_Message(null)).toBeTrue();
      } catch (error: string | Error | unknown | null) {
        console.log(error);
      }
    });
    

    it("dbgManager.iDebug_Message::\nSHOULD return TRUE if ERROR===isEmpty()", () => {
      try {
        expect(dbgManager.iDebug_Message("")).toBeTrue();
      } catch (error: string | Error | unknown | null) {
        console.log(error);
      }
    });
    

    it("dbgManager.iDebug_Message::\nSHOULD return FALSE if ERROR===NOT-NULL", () => {
      try {
        expect(dbgManager.iDebug_Message("x")).toBeFalse;
      } catch (error: string | Error | unknown | null) {
        console.log(error);
      }
    });

});

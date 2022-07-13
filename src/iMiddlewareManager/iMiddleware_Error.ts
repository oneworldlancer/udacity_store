import { Response, Request, NextFunction } from "express";
import iError from "../iInterfaceManager/iInterface.Error";

const iErrorModelManager = (
  error: iError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = error.status || 500;
  const message = error.message || "Whoops!! something went wrong";
  res.status(status).json({ status, message });
};

export default iErrorModelManager;

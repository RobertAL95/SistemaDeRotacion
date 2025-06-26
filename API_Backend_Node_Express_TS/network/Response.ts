import { Response } from "express";

export function success(res: Response, data: any, status = 200) {
  res.status(status).json({
    error: false,
    body: data,
  });
}

export function error(res: Response, message: string, status = 500) {
  res.status(status).json({
    error: true,
    message,
  });
}

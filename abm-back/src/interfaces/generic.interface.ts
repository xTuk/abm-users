import { Request } from "express";

export interface GenericRequest<T> extends Request {
  body: T;
}

export interface GenericObjectString {
  [key: string]: string;
}

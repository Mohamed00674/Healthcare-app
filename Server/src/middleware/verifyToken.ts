const jwt = require("jsonwebtoken");
import { Request , Response, NextFunction } from "express";
import {IGetUserAuthInfoRequest} from "../interface//Request"

const config = process.env;

const verifyToken = (req : IGetUserAuthInfoRequest  , res : Response, next :NextFunction ) => {
  const token = req.headers["authorization"];
  console.log(req.headers);
  if (!token) {
    return res.status(403).send("Access Denied");
  }
  try {
    const decoded = jwt.verify(token, config.SECRET_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
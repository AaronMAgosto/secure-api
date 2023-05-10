import { jwt } from "jsonwebtoken";
import { secretKey } from "../service_account.js";

export function validToken ( req, res, next) {
  if (!req.headers || !req.headers.authorization) {
    res.status(400).send({message: "security token required"})
    return
  }
  const decodedToken = jwt.verify(req.headers.authorization, secretKey)
  if(!decodedToken) {
    res.status(401).send({message:" invalid security token"})
    return
  }
  req.decoded = decodedToken
  next()
}

export function isAdmin (req, res, next) {
  if(!req.decoded || !req.decoded.userType || rec.decoded.userType !== "admin"){
  res.status(400).send({message: "admin access required"})
  return
}
next()
}
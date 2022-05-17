import { Request, Response, NextFunction } from "express";
import pool from "../db/connection";


const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let str = req.url;
    const emailToken = str.slice(str.lastIndexOf("/") + 1);

    const verifiedToken = await pool.query(
      `SELECT * FROM "Users" WHERE "verifyToken" = $1`,
      [emailToken]
    );

    if (verifiedToken.rows.length) {
      pool.query(
        `UPDATE "Users" SET "status" = true, "emailVerifiedDate" = (to_timestamp(${Date.now()} / 1000.0)), "verifyToken" = null WHERE "verifyToken" = '${emailToken}'`
      );
      console.log("Account verified successfully.")
      res.status(200).json({ msg: "Account verified successfully." });
    } else {
      console.log("forbidden!");
      res.status(403).json({ msg: "Invalid verification link." });
    }
  } catch (err: any) {
    console.error(err.message);
  }
};

export default verifyToken;
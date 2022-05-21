import { Request, Response, NextFunction } from 'express';
import pool from "../db/connection";
import hashPassword from '../auth/encrypt';

const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const resetUrl = req.url;
    const resetToken = resetUrl.slice(resetUrl.lastIndexOf("/") + 1);

    const targetUser = await pool.query(
      `SELECT * FROM "Users" WHERE "resetToken" = $1`,
      [resetToken]
    );

    if (targetUser.rows.length) {
      const { password } = req.body;
      const hashedPassword = await hashPassword(password);

      pool.query(
        `UPDATE "Users" SET "password" = $1, "resetToken" = $2 WHERE "resetToken" = $3`,
        [hashedPassword, null, resetToken]
      );
      res.status(200).send("Password updated successfully.");

    } else {
      console.log("Password reset link has expired.");
      res.status(403).send("Password reset link has expired.");
    }
  } catch (err: any) {
    console.error(err.message);
  }
};

export default resetPassword;
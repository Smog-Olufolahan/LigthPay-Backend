import { Request, Response } from 'express';
import pool from '../db/connection';

export const getTransactions = async (req: Request, res: Response) => {
    try {
        const allTransactions = await pool.query(`SELECT * FROM "Transactions"`);
        res.status(200).send(allTransactions.rows);
    } catch (error: any) {
        console.log(error.message);
    }
}
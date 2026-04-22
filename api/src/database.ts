"use strict";

import 'dotenv';
import * as mariadb from "mariadb";

const pool: mariadb.Pool = mariadb.createPool({
    host: process.env.db_host || "localhost",
    port: process.env.DB_PORT || 3306,
    user: process.env.db_user || "user",
    password:process.env.db_password || "invalid-password",
    database: process.env.mysql_database || "saver_db",
    connectionLimit: 20,
    bigIntAsNumber: true
});

export const db = {
    connect: async function connect() {
        return await pool.getConnection();
    },

    query: async function query(sql: string, params: unknown[] = []) {
        let conn;

        try {
            conn = await this.connect();
            const result = await conn.query(sql, params);

            return result;
        } catch(error) {
            console.error("Could not query to database");
            throw error;
        } finally {
            if (conn) await conn.end();
        }
    },

    select: async function select(table: string, columns: string[] = ['*'], where: string = '', params: any[] = [], limit: number|null = null, offset: number|null = null) {
        let sql =
        `SELECT ${Array.isArray(columns) ? columns.join(', ') : columns} FROM ${table}` +
        (where ? ` WHERE ${where}` : '');

        if (limit != null) {
            sql += ` LIMIT ${limit}`;
            if (offset != null) {
                sql += ` OFFSET ${offset}`;
            }
        }

        return this.query(sql, params);
    },

    // Helper function for insert.
    insert: async function insert<T extends Record<string, unknown>>(table: string, data: T) {
        const keys = Object.keys(data);
        const values = Object.values(data);
        const placeholders = keys.map(() => '?').join(', ');

        const sql = `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${placeholders})`;

        return this.query(sql, values);
    },

    // Helper function for update.
    update: async function update<T extends Record<string, unknown>>(table: string, data: T, where: string, params = []) {
        const setClause = Object.keys(data)
            .map((k) => `${k} = ?`)
            .join(', ');

        const sql = `UPDATE ${table} SET ${setClause}` + (where ? ` WHERE ${where}` : '');

        return this.query(sql, [...Object.values(data), ...params]);
    },

    // Helper function for remove.
    remove: async function remove(table: string, where: string, params = []) {
        const sql = `DELETE FROM ${table}` + (where ? ` WHERE ${where}` : '');

        return this.query(sql, params);
    }
};
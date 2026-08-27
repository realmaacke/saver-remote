"use strict";
import { pool } from "../db";
import * as argon2 from "argon2";
import { Auth } from "./auth";

const sqlMap = {
    "getUser": "SELECT * FROM get_specific_user($1)",
    "createUser": "SELECT * FROM create_user($1, $2)",
    "connectUser": "SELECT * FROM get_user_password($1)",
    "getUserById": "SELECT * FROM get_user_by_id($1)",
}

export interface DatabaseResponse<T = any> {
  success: boolean;
  data: T | null;
  message: string;
}

export interface genericUserResponse{
    user_id: number,
    username: string,
    token?: string | null
}

interface connectUserResponse {
    password: string
}

export const database = {
    response<T>(success: boolean, data: T | null, message: string = ""): DatabaseResponse<T> {
        return { success, data, message };
    },

    async getUser(username: string) {
        const { rows } = await pool.query<genericUserResponse>(sqlMap.getUser,[username]);

        if (rows.length === 0) {
            return this.response(false, null, "Invalid username");
        }

        return this.response(true, rows[0], "Succesfully retrived user");
    },

    async getUserById(userId: number) {
        const { rows } = await pool.query<genericUserResponse>(sqlMap.getUserById, [userId]);

        if (rows.length === 0) {
            return this.response(false, null, "No username with that userId");
        }

        return this.response(true, rows[0], "Succesfully retrived user");
    },
    
    async createUser(username: string, password: string) {
        if ((await this.getUser(username)).success) {
            return this.response(false, null, "User already exists");
        }
        const hashedPass = await argon2.hash(password);        
        try {
            const { rows } = await pool.query<genericUserResponse>(sqlMap.createUser, [username, hashedPass]);
            return this.response(true, rows[0], "Successfully created user");
        } catch (error: any) {
            if (error.code === "23505") {
            return this.response(false, null, "User already exists");
            }
            return this.response(false, null, "Could not create user");
        }
    },

    async connectUser(username: string, password: string) {
        const userData = await this.getUser(username);

        if (!userData.success || !userData.data) {
            return this.response(false, null, "User does not exists");
        }
        const { rows } = await pool.query<connectUserResponse>(sqlMap.connectUser, [username]);

        if (rows.length === 0 || !rows[0]?.password) {
            return this.response(false, null, "Invalid credentials");
        }

        const isCorrect = await argon2.verify(rows[0].password, password);
        
        if (!isCorrect) {
            return this.response(false, null, "Invalid credentials");
        }

        const user = userData.data;
        const tokenResult = Boolean(user.token && Auth.verify_token(`Bearer ${user.token}`).success);
        
        if (!tokenResult) {
            const token = Auth.issue_token(user.user_id);
            return this.response(true, {
                user_id: user.user_id,
                username: user.username,
                token: token
            }, "Succesfully connected");
        }

        return this.response(true, userData.data, "Succesfully connected");
    }

};
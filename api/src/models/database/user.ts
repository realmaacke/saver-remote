import {
response,
SQLMAP_USER,
UserResponse,
PasswordByName

} from "./interfaces";
import { pool } from "../../db";

import * as argon2 from "argon2";
import { Auth } from "../auth";


export const user = {
    async getUserByName(username: string) {
        const { rows } = await pool.query<UserResponse>(SQLMAP_USER.getUser,[username]);

        if (rows.length === 0) {
            return response(false, null, "Invalid username");
        }
        return response(true, rows[0], "Succesfully retrived user");
    },

    async getUserById(userId: number) {
        const { rows } = await pool.query<UserResponse>(SQLMAP_USER.getUserById, [userId]);

        if (rows.length === 0) {
            return response(false, null, "No username with that userId");
        }

        return response(true, rows[0], "Succesfully retrived user");
    },

    async createUser(username: string, password: string) {
        if ((await this.getUserByName(username)).success) {
            return response(false, null, "User already exists");
        }

        const hashedPass = await argon2.hash(password);        
        try {
            const { rows } = await pool.query<UserResponse>(SQLMAP_USER.createUser, [username, hashedPass]);
            return response(true, rows[0], "Successfully created user");
        } catch (error: any) {
            if (error.code === "23505") {
            return response(false, null, "User already exists");
            }
            return response(false, null, "Could not create user");
        }
    },

    async connect(username: string, password: string) {
        const userData = await this.getUserByName(username);

        if (!userData.success || !userData.data) {
            return response(false, null, "User with that name does not exist");
        }

        const pass = await pool.query<PasswordByName>(SQLMAP_USER.getPasswordByName, [username]);

        if (pass.rows.length === 0 || !pass.rows[0].password) {
            return response(false, null, "Invalid credentials");
        }

        if (!(await argon2.verify(pass.rows[0].password, password))) {
            return response(false, null, "Invalid credentials");
        }

        const user = userData.data;

        const token_res = Boolean(user.token && Auth.verify_token(`Bearer ${user.token}`).success);
        
        if (!token_res) {
            const tokenOBJ = Auth.issue_token(user.user_id);
            return response(true, {
                    user_id: user.user_id,
                    username: user.username,
                    token: tokenOBJ.token
                }, "Succesfully connected");
        }

        return response(true, userData.data, "Succesfully connected");
    }
};
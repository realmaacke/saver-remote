"use strict";
import jwt from "jsonwebtoken";
import authResponse from "../dto/authResponse";
const SECRET = "hide-me";

const tempDB = [
    {
        userId: 0,
        username:
        "realmaacke",
        password: "should-be-hashed"
    },
    {
        userId: 1,
        username: "other_user",
        password: "pass"
    }
];

export const Auth = {


    issue_token(user_id: number) {
        try {
            const token = jwt.sign(
                { userId: user_id,},
                SECRET,
                { expiresIn: '7d'}
            );
            return authResponse(token, true);
        } catch (error) {
            return authResponse(null, false, `Could not issue token for user: ${user_id}`);
        }
    },

    verify_token(authHeader: string) {
        // removes the "Bearer <token>"
        const token = authHeader.split(' ')[1];

        if (!token) {
            return authResponse(null, false, "Could not find token");
        }

        try {
            const decoded = jwt.verify(token, SECRET);
            return authResponse(decoded as object, true, "Token verified");
        } catch (error) {
            return authResponse(null, false, "Invalid Token");
        }
    },

    renew_token(authHeader: string) {
        const verified = this.verify_token(authHeader);

        if (!verified.success || !verified.token) {
            return authResponse(null, false, "Cannot renew: invalid or expired token");
        }
        const decoded = verified.token as { userId: number };
        return this.issue_token(decoded.userId);
    },

    // Super temporary, until i choose what db i want.
    login_user(username: string, hashedPassword: string) {

        let isCorrect: boolean = false;
        let correctIndex: number = 0;
        for (let i = 0; i < tempDB.length; i++) {
            if (username == tempDB[i].username &&
                hashedPassword == tempDB[i].password
            ) {
                isCorrect = true;
                correctIndex = i;
                break;
            }
        }

        if (isCorrect) {
            const token = this.issue_token(correctIndex).token;
            return authResponse(token, true, "connected to server");
        }
        return authResponse(null, false, "Invalid credentials.");
    }
};
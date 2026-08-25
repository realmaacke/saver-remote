"use strict";
import jwt from "jsonwebtoken";
import authResponse from "../dto/authResponse";

// Super super temporary
const SECRET = "hide-me";

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
};
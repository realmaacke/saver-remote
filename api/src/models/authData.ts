"use strict";
import type { ParamsDictionary } from "express-serve-static-core";

export interface loginBody {
    username: string,
    password: string
};

export interface invokeKeyParams extends ParamsDictionary {
    user: string
};

export interface invokeKeyType {
    fieldname: string,
    originalname: string,
    encoding: string
    mimetype: string,
    buffer: Buffer,
}

export interface challengeKeyParams extends ParamsDictionary {
    user: string
};

export interface challengeKeyBody {
    json: string
}

export interface challengePayload {
    message: string,
    signature: string
}

export interface sessionChallengeParams extends ParamsDictionary {
    username: string,
    session_id: string
}



// push_to_repository function
// export interface pushRepoParams extends ParamsDictionary{
//     user: string,
//     project: string
// }

// export interface pushRepoBody {
//     manifest: string
// }

// export interface pushRepoFileType {
//     fieldname: string,
//     originalname: string,
//     encoding: string
//     mimetype: string,
//     buffer: Buffer,
// }

// export interface manifestType {
//     field: string,
//     path: string
// }
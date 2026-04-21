"use strict";
import type { ParamsDictionary } from "express-serve-static-core";

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
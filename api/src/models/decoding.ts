"use strict";

import { BlobObject } from "../dto/project";


export const Decoding = {
    base64_to_string(data: string) {
        let buffer = Buffer.from(data, 'base64');
        return buffer.toString("utf-8");
    },

    get_blob_type(bytes: string) {
        const types = ["blob", "tree", "object", "commit"];
        const header = bytes.split(' ')[0];
        const found_type = types.find((element) => element == header);
        return found_type || null;
    }
};
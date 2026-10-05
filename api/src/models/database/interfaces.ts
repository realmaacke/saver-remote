
export interface DatabaseResponse<T = any> {
  success: boolean;
  data: T | null;
  message: string;
}

export interface UserResponse {
    user_id: number,
    username: string,
    token?: string | null
};

export interface PasswordByName {
    password: string
};

export interface UserConnectResponse {
    password: string
};

export function response<T>
(success: boolean, data: T | null, message: string = ""): DatabaseResponse<T> {
    return { success, data, message };
};

export const SQLMAP_USER = {
    "getUser": "SELECT * FROM get_specific_user($1)",
    "createUser": "SELECT * FROM create_user($1, $2)",
    "connectUser": "SELECT * FROM get_user_password($1)",

    "getUserById": "SELECT * FROM get_user_by_id($1)",
    "getPasswordByName": "SELECT * FROM get_user_password($1)",
};

export const SQLMAP_PROJECT = {};
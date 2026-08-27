export default function authResponse(token: string | object | null, success: boolean, message: string = "") {
    return {
        token: token,
        success: success,
        message: message
    };
}

export function genericResponse(data: string | number | object | null, success: boolean, message = "") {
    return {
        data: data,
        success: success,
        message: message
    };
}
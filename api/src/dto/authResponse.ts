export default function authResponse(token: string | object | null, success: boolean, message: string = "") {
    return {
        token: token,
        success: success,
        message: message
    };
}
"use server";

export async function onLogin(formData: FormData) {
    console.log(formData);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    console.log('Server get: onLogin(): ', {username, password});
}

export async function onRegister(formData: FormData) {
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    console.log('Server get: onRegister(): ', {username, password});
}
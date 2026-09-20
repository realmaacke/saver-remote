"use client";
import './register.css';
import { onRegister } from '../authActions';

export default function RegisterForm() {
    return (
        <>
            <form
                className="card register-card w-full max-w-sm min-h-[38rem] p-9"
                action={onRegister}
            >
                <h1 className="register-title text-4xl font-extrabold leading-tight">
                    One step away from saving!
                </h1>
        
                <div className="mt-10 space-y-4">
                <div>
                    <label className="label-text register-label mb-1.5 block" htmlFor="username">
                    Username
                    </label>
                    <div className="input register-input w-full">
                    <input
                        name='username'
                        type="text"
                        placeholder="Enter your username"
                    />
                    </div>
                </div>
        
                <div>
                    <label className="label-text register-label mb-1.5 block" htmlFor="password">
                    Password
                    </label>
                    <div className="input register-input w-full">
                    <input
                        name='password'
                        type='password'
                        placeholder="········"
                    />
                    </div>
                </div>
                </div>
        
                <button type="submit" className="btn register-btn mt-10 w-full">
                    Register at saver
                </button>
        
                <p className="register-muted mt-4 text-center text-sm">
                Already have an account?{' '}
                <a href="/auth/login" className="register-link">
                    Login here
                </a>
                </p>
            </form>
        </>
    )
}
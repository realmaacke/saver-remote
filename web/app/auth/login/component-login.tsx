"use client";
import { useState } from 'react';
import './login.css';

import { onLogin } from '../authActions';

export default function LoginForm() {
    return(
        <>
            <form
                className="card login-card w-full max-w-sm min-h-[38rem] p-9"
                action={onLogin}
            >
                <h1 className="login-title text-4xl font-extrabold leading-tight">
                Don&apos;t forget to save!
                </h1>
        
                <div className="mt-10 space-y-4">
                <div>
                    <label className="label-text login-label mb-1.5 block" htmlFor="username">
                    Username
                    </label>
                    <div className="input login-input w-full">
                    <input
                        name='username'
                        type="text"
                        placeholder="Enter your username"
                        autoComplete="username"
                    />
                    </div>
                </div>
        
                <div>
                    <label className="label-text login-label mb-1.5 block" htmlFor="password">
                    Password
                    </label>
                    <div className="input login-input w-full">
                    <input
                        name='password'
                        type='password'
                        placeholder="········"
                        autoComplete="current-password"
                    />
                    </div>
                </div>
                </div>
        
                <button type="submit" className="btn login-btn mt-10 w-full">
                Login to Saver
                </button>
        
                <p className="login-muted mt-4 text-center text-sm">
                Don&apos;t have an account?{' '}
                <a href="/auth/register" className="login-link">
                    Register here
                </a>
                </p>
            </form>
                
        </>
    )
}
import RegisterForm from "./component-register"
import './register.css'

export default function registerPage() {
    return(
        <>
            <main className="register-page flex min-h-screen items-center justify-center p-6">
                <RegisterForm/>
            </main>
        </>
    )
}
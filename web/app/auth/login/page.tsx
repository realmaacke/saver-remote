import LoginForm from './component-login';
import Navbar from '@/app/navbar/Navbar';
import './login.css';

export default function LoginPage() {
  return (
    <>
    <main className="login-page flex flex-col">
      <Navbar/>
      <div className='login-page flex min-h-screen items-center justify-center p-6'>
        <LoginForm/>
      </div>
    </main>
    </>
  );
}
 

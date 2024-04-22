"use client"
import React, { useState, FormEventHandler } from "react";
import Link from "next/link";
import SeoMeta from "@/partials/SeoMeta";
import ImageFallback from "@/helpers/ImageFallback";
import Input from "@/shortcodes/Input";
import SocialLoginButton from "@/shortcodes/SocialLoginButton";
import { useRouter } from 'next/navigation';
import { LoginUser } from "@/lib/utils/interfaces";
import InputPassword from "@/shortcodes/Input-password";
import { ToastContainer } from "react-toastify";



const Login = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [passwordShown, setPasswordShown] = useState(false);
    const [inputType, setInputType] = useState('password');
    const router = useRouter()

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        LoginUser(email, password, router)

    }

  
    const togglePasswordVisibility = () => {
        setPasswordShown(!passwordShown);
        setInputType(passwordShown ? 'password' : 'text');
      };
  

    return (
        <>
<ToastContainer/>
            <SeoMeta />
            <section className="section bg-[#fbfcfd] pt-4 fixed h-full  w-full">
                <div className="home-header bg-[#fbfcfd] header absolute w-full z-40  px-4 md:px-12 top-0">
                    <nav className="navbar container uppercase text-[12px]">
                        {/* logo */}
                        <Link href="/" className="order-0">
                            <ImageFallback src="/images/Logo.svg" className="mt-4" width={120} height={85} alt="Logo"/>
                        </Link>
                        <ul>
                            <li>
                                <Link href="#" className="">
                                    Register
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="container">
                    <div className="row justify-center md:px-[15rem] lg:px-[25rem] xl:px-[30rem]">
                        <form onSubmit={handleSubmit} className="md:bg-white rounded-lg mt-[10rem] mb-5 md:mt-60 lg:mt-24 xl:mt-20">
                            <h4 className="text-gray-600 flex m-5 text-[2.5rem] md:text-[1.5rem] my-4 md:my-8 text-center justify-center font-bold">Login</h4>
                            <div className="mt-4 mb-2">

                                <Input icon="none" type="email" onChange={e => setEmail(e.target.value)} placeholder="Email" value={email} />

                                <InputPassword icon={togglePasswordVisibility} type={inputType} prop={passwordShown} onChange={e => setPassword(e.target.value)} placeholder="Password"  value={password} />

                            </div>
                            <div className="mx-0">
                                <button type='submit' className="btn btn-primary w-full mb-4 px-2 h-[85%] md:h-[75%] pt-4 md:pt-3 rounded uppercase flex justify-center me-1 no-underline hover:text-white dark:hover:text-[#3265fc]">
                                   Login
                                </button>
                            </div>
                            <div className="OR my-5 md:my-2 text-[12px] text-center">Or</div>
                            <div className="social">
                                <SocialLoginButton action="Login" label="Google" iconName="google" />
                                <SocialLoginButton action="Login" label="Facebook" iconName="facebook" />
                            </div>
                            <div className="w-ful text-center mt-10 md:mt-3 mb-5 md:mb-2">
                                <a href="#" className="forgot-txt font-semibold underline text-[12px] text-gray-600">Forgot your password?</a>
                            </div>
                            <div className="w-full mb-2 text-center">
                             <span className="font-semibold text-[12px] text-gray-600">Don&apos;t have an account? <Link href="/signup" className="text-[#3265fc] underline">Sign up</Link></span>

                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Login;

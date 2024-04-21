"use client"
import React, { useState, FormEventHandler } from "react";
import SeoMeta from "@/partials/SeoMeta";
import Link from "next/link";
import ImageFallback from "@/helpers/ImageFallback";
import { useRouter } from "next/navigation";
import { SignUpUser } from "@/lib/utils/interfaces";
import Input from "@/shortcodes/Input";
import InputPassword from "@/shortcodes/Input-password";
import { ToastContainer } from "react-toastify";




const Signup = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [passwordShown, setPasswordShown] = useState(false);
    const [inputType, setInputType] = useState('password');
    const router = useRouter()

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        SignUpUser(email, password, router)

    }

 
  
    const togglePasswordVisibility = () => {
      setPasswordShown(!passwordShown);
      setInputType(passwordShown ? 'password' : 'text');
    };

    return (
        <>
         <ToastContainer className="bg-[fbfcfd] " />
            <SeoMeta />
            <section className="section bg-[#fbfcfd] pt-4 fixed h-full  w-full">
                <div className="home-header bg-[#fbfcfd] header absolute w-full z-40  px-4 md:px-12 top-0">
                    <nav className="navbar container uppercase text-[12px]">
                        <Link href="/" className="order-0">
                            <ImageFallback src="/images/Logo.svg" className="mt-4" width={120} height={85} alt="logo" />
                        </Link>
                        <ul>
                            <li>
                                <Link className="" href="#">
                                    Register
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="container">
                    <div className="row justify-center md:px-[15rem] lg:px-[25rem] xl:px-[30rem]">
                        <form onSubmit={handleSubmit} className="md:bg-white rounded-lg mt-[10rem] mb-5 md:mt-60 lg:mt-24 xl:mt-20">
                            <h4 className="text-gray-600 flex m-5 text-[2.5rem] md:text-[1.5rem] my-4 md:my-8 text-center justify-center font-bold">Sign up</h4>
                            <div className="mt-4 mb-2">

                                <Input icon="none" type="email" onChange={e => setEmail(e.target.value)} placeholder="Email" value={email} />

                                <InputPassword icon={togglePasswordVisibility} type={inputType} prop={passwordShown} onChange={e => setPassword(e.target.value)} placeholder="Password"  value={password} />


                            </div>
                            <div className="mx-0">
                                <button type="submit" className="btn btn-primary w-full mb-4 px-2 h-[85%] md:h-[75%] pt-4 md:pt-3 rounded uppercase flex justify-center me-1 no-underline hover:text-white dark:hover:text-[#3265fc]">
                                  Sign Up
                                </button>
                            </div>
                            <div className="OR my-5 md:my-2 text-[12px] text-center">Or</div>
                          
                            <div className=" w-full mt-5  mb-5 text-center">
                                <span className=" font-semibold text-[12px] text-gray-600">Have an account? <Link href="/login" className="text-[#3265fc] underline">Sign in</Link></span>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Signup;

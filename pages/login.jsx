import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import toast from "react-hot-toast";
import { useGoogleLogin } from '@react-oauth/google';


export default function Login() {

   const[email, setEmail] = useState("")
   const[password, setPassword] = useState("")
   const navigate = useNavigate()
 const googleLogin = useGoogleLogin(
		{
			onSuccess: (response)=>{
				axios.post(import.meta.env.VITE_API_URL + "/users/google-login" , {token : response.access_token}).then(
					(response)=>{
						toast.success("Login Successful")
						localStorage.setItem("token" , response.data.token)
						if(response.data.role == "admin"){
							navigate("/admin/")
						}else{
							navigate("/")
						}
					}
				).catch(
					(err)=>{
						toast.error(err?.response?.data?.message || "Google login failed. Please try again.")
					}
				)
			},
			onError: (error)=>{
				toast.error("Google login failed. Please try again.")
			}
		}
	)
/*
   function login(){
      console.log(email)
      console.log(password)
      axios.post("http://localhost:3000/users/login", 
        {
        email: email,
        password:password
        }
    ).then(
        (response)=>{
            console.log(response)
        }
    ).catch(
        (error)=>{
           console.log(error)
        }
    )
   }
          */

   async function login(){
    console.log("API URL =", import.meta.env.VITE_API_URL);

       
    try{
          const response = await axios.post(import.meta.env.VITE_API_URL + "/users/login",
            {
                email: email,
                password:password
            }
          )
          console.log(response)

          toast.success("Login Successful")
          localStorage.setItem("token" , response.data.token)
          
          if(response.data.role == "admin"){
            //we should redirect to admin dashboard
            //window.location.href = "/admin/"

            navigate("/admin/")
          }else{
            navigate("/")
          }

       }catch(error){
        console.log(error)
        //console.log("Login Faild")
        toast.error("Login Faild")
       }
          
         
    
}
   

    return (
        <div className="w-full h-full bg-[url('/background.jpg')] bg-cover bg-no-repeat bg-center flex">
            <div className="w-[50%]  h-full hidden lg:flex justify-center items-center flex-col">
                <img src="/Logo.png" alt="Logo" className="w-[300px]" />
                <h1 className="text-4xl font-bold mt-5 text-white">Isuri Computers</h1>

            </div>
            <div className="w-full lg:w-[50%]  h-full  flex justify-center items-center">
                <div className="backdrop-blur-3xl w-[450px] h-[600px] shadow-2xl rounded-lg flex flex-col justify-center">
                <img src="/Logo.png" className="w-[100px] mx-auto lg:hidden" />
					<h1 className="lg:hidden text-3xl font-semibold mt-5 text-white text-center">Isuri Computers</h1>
                    <input
                        type="email"
                        placeholder="email"
                        onChange={
                            (e)=>{
                               setEmail(e.target.value)
                            }
                        }
                        className="m-5 p-3 w-[90%] h-[50px] rounded-lg border border-secondary outline-none"
                    />

                    <input
                        type="password"
                        placeholder="password"
                        onChange={
                            (e)=>{
                                setPassword(e.target.value)
                            }
                        }
                        className="m-5 p-3 w-[90%] h-[50px] rounded-lg border border-secondary outline-none"
                    />
                    <button  onClick={login} className="m-5 p-3 w-[90%] h-[50px] rounded-lg bg-sky-400 text-white font-bold">
                        Login
                    </button>
                    <p className="w-full text-right text-white pr-5">
                        Foggot Password ?
                        <Link to="/forgotPassword" className="text-sky-400">
                            Reset
                        </Link>
                    </p>

                    <button onClick={googleLogin} className="m-5 p-3 w-[90%] h-[50px] rounded-lg border border-sky-400 text-white font-bold">
                        Login with Google
                    </button>
                    <p className="w-full text-right text-white pr-5">
                        Don't have an account?
                        <Link to="/register" className="text-sky-400">
                            Sign Up
                        </Link></p>

                </div>

            </div>

        </div>

    )
}
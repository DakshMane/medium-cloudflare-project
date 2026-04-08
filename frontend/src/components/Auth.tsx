import  { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputComponent from './InputComponent';
import axios from 'axios' ;
import { BACKEND_URL } from '../config';
//@ts-ignore



const Auth = ({ type }: { type: 'signup' | 'signin' }) => {

const navigate = useNavigate();

  const [signupInputs, setSignupInputs] = useState({
    name : "" ,
    email  :  "" ,
    password : ""
  })

  const submitHandler = async () => {



    if (type === 'signin') {
      try {
        const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
          email: signupInputs.email,
          password: signupInputs.password,
        });
        const { token } = response.data;
        localStorage.setItem('token', token);
        navigate('/blogs');
      } catch (error) {
        console.error('Error signing in:', error);
      }
    } else {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, signupInputs);
      const token = response.data.token;
      localStorage.setItem('token', token);
      navigate('/blogs');
    }
    setSignupInputs({
      name : "" ,
      email  :  "" ,
      password : ""
    })
  }




  return (
    <div className="h-screen flex justify-center flex-col  ">
      <div className="flex justify-center ">
        <div className="border-2 p-30  rounded-2xl">
          <div className="text-3xl font-extrabold">{type === "signup" ? "Create an account" : "Sign in"}</div>
          <div className="text-slate-400">
            {type === "signup" ? "Already have an account?" : "Don't have an account?"}
            <Link className="pl-2 underline" to={type === "signup" ? "/signin" : "/signup"}>
              Login
            </Link>
          </div>
          <div className="flex flex-col gap-4 mt-6">
            {type == "signup" ? <InputComponent
              label="Name"
              value={signupInputs.name}
              placeholder="Enter your name"
              onChange={(e) => setSignupInputs({ ...signupInputs, name: e.target.value })}
            /> : null }

            <InputComponent
              type="password"
              label="Password"
              value={signupInputs.password}
              placeholder="Enter your password"
              onChange={(e) => setSignupInputs({ ...signupInputs, password: e.target.value })}
            />

            <InputComponent
              label="Email"
              value={signupInputs.email}
              placeholder="Enter your email"
              onChange={(e) => setSignupInputs({ ...signupInputs, email: e.target.value })}
            />

            <button
            onClick={() => submitHandler()}
              className="w-full mt-4 border-2 border-black bg-black text-white py-3 rounded-lg font-semibold
    hover:bg-gray-800 transition-all"
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;

import AuthImagePattern from '@/_components/AuthImagePattern';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/store/useAuthStore';
import { Eye, EyeOff, Loader2Icon, Lock, Mail, MessageSquare } from 'lucide-react';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from "sonner"

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoggingIn } = useAuthStore()

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!email || !password) {
      toast("All fields are required");
      return
    }

    try {
      const res = await login({
        email,
        password
      })
      console.log("Logged in userData: ", res)
    } 
    catch (err) {
      console.error("Login failed: ", err)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const buttonEvent = new Event('click') as any;
      handleSubmit(buttonEvent);
    }
  }

  return (
    <div className='h-[calc(100vh-3.4rem)] grid lg:grid-cols-2'>
      <div className='flex flex-col justify-center items-center p-6 sm:p-12 bg-gray-900 text-white relative overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900'></div>
        <div className='absolute top-10 right-10 w-32 h-32 bg-amber-500/10 rounded-full blur-xl'></div>
        <div className='absolute bottom-10 left-10 w-24 h-24 bg-blue-500/10 rounded-full blur-xl'></div>
        <div className='w-full max-w-md space-y-8 relative z-10'>
          <div className='text-center mb-8'>
            <div className='flex flex-col items-center gap-2 group'>
              <div className='w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ff4e50] to-[#f9d423] flex items-center justify-center transition-all duration-300 shadow-lg shadow-gray-800/30 group-hover:shadow-gray-900/50 group-hover:scale-105'>
                <MessageSquare className='w-8 h-8 text-white' />
              </div>
              <h1 className='text-2xl font-bold mt-2 text-white'>Log in to Your Account</h1>
              <p className='text-gray-600'>Get started with your free account</p>
            </div>
          </div>
          <div className='w-full flex flex-col justify-center items-center' onKeyDown={handleKeyDown}>
            <div className='w-[90%] mb-4'>
              <label className='text-sm px-0.5 py-1'>Email</label>
              <div className='relative flex items-center'>
                <Mail className='absolute w-4 h-4 text-gray-500 ml-3 z-10' />
                <Input placeholder='example@gmail.com' className='pl-10 border-gray-500' type='text' required={true} spellCheck={false} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
            <div className='w-[90%] mb-4'>
              <label className='text-sm px-0.5 py-1'>Password</label>
              <div className='relative flex items-center'>
                <Lock className='absolute w-4 h-4 text-gray-500 ml-3 z-10' />
                <Input placeholder='******' className='pl-10 pr-10 border-gray-500' type={showPassword ? "text" : "password"} required={true} onChange={(e) => setPassword(e.target.value)} />
                <div
                  className="absolute right-3 cursor-pointer text-gray-500 z-10"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Eye className='w-4 h-4' /> : <EyeOff className='w-4 h-4' />}
                </div>
              </div>
            </div>
            <Button className='w-[90%] mb-2 bg-gradient-to-br from-[#f83437] to-[#f4d32e] hover:bg-gradient-to-br hover:from-[#e3272a] hover:to-[#e4c52d] active:bg-gradient-to-br active:from-[#ad0003] active:to-[#b29400]' disabled={isLoggingIn} onClick={handleSubmit}>{isLoggingIn ? <Loader2Icon className='h-4 w-4 animate-spin' /> : "Log in"}</Button>
            <p className='text-center mt-2'>Don&apos;t have an account? <Link to={"/signup"}><span className='text-blue-400'>Sign up</span></Link></p>
          </div>
        </div>
      </div>
      <AuthImagePattern />
    </div>
  )
}

export default Login
import AuthImagePattern from '@/_components/AuthImagePattern';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/store/useAuthStore';
import { Eye, EyeOff, Loader2Icon, Lock, Mail, MessageSquare, User } from 'lucide-react';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from "sonner"

const Signup: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { signup, isSigningUp } = useAuthStore()

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!fullName || !email || !password || !confirmPassword) {
      toast("All fields are required");
      return
    }

    if (password.length < 6) {
      toast("Password must be at least 6 characters");
      return
    }

    if (password !== confirmPassword) {
      toast("Please provide the same password")
      return
    }

    try {
      const res = await signup({
        fullName,
        email,
        password,
        confirmPassword
      })
      console.log("Signed up userData: ", res)
    } 
    catch (err) {
      console.error("Signup failed: ", err)
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
    <div className='min-h-screen grid lg:grid-cols-2'>
      <div className='flex flex-col justify-center items-center p-6 sm:p-12 bg-gray-900 text-white relative overflow-hidden' onKeyDown={handleKeyDown}>
        <div className='absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900'></div>
        <div className='absolute top-10 right-10 w-32 h-32 bg-amber-500/10 rounded-full blur-xl'></div>
        <div className='absolute bottom-10 left-10 w-24 h-24 bg-blue-500/10 rounded-full blur-xl'></div>
        <div className='w-full max-w-md space-y-8 relative z-10'>
          <div className='text-center mb-8'>
            <div className='flex flex-col items-center gap-2 group'>
              <div className='w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ff4e50] to-[#f9d423] flex items-center justify-center transition-all duration-300 shadow-lg shadow-gray-800/30 group-hover:shadow-gray-900/50 group-hover:scale-105'>
                <MessageSquare className='w-8 h-8 text-white' />
              </div>
              <h1 className='text-2xl font-bold mt-2 text-white'>Create Account</h1>
              <p className='text-gray-600'>Get started with your free account</p>
            </div>
          </div>
          <div className='w-full flex flex-col justify-center items-center'>
            <div className='w-[90%] mb-2'>
              <label className='text-sm px-0.5 py-1'>Full Name</label>
              <div className='relative flex items-center'>
                <User className='absolute w-4 h-4 text-gray-500 ml-3 z-10' />
                <Input placeholder='John Doe' className='pl-10 border-gray-500' type='text' required={true} spellCheck={false} onChange={(e) => setFullName(e.target.value)} />
              </div>
            </div>
            <div className='w-[90%] mb-2'>
              <label className='text-sm px-0.5 py-1'>Email</label>
              <div className='relative flex items-center'>
                <Mail className='absolute w-4 h-4 text-gray-500 ml-3 z-10' />
                <Input placeholder='example@gmail.com' className='pl-10 border-gray-500' type='text' required={false} spellCheck={true} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
            <div className='w-[90%] mb-2'>
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
            <div className='w-[90%] mb-4'>
              <label className='text-sm px-0.5 py-1'>Confirm Password</label>
              <div className='relative flex items-center'>
                <Lock className='absolute w-4 h-4 text-gray-500 ml-3 z-10' />
                <Input placeholder='******' className='pl-10 pr-10 border-gray-500' type={showPassword ? "text" : "password"} required={true} onChange={(e) => setConfirmPassword(e.target.value)} />
                <div
                  className="absolute right-3 cursor-pointer text-gray-500 z-10"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Eye className='w-4 h-4' /> : <EyeOff className='w-4 h-4' />}
                </div>
              </div>
            </div>
            <Button className='w-[90%] mb-2 bg-gradient-to-br from-[#f83437] to-[#f4d32e] hover:bg-gradient-to-br hover:from-[#e3272a] hover:to-[#e4c52d] active:bg-gradient-to-br active:from-[#ad0003] active:to-[#b29400]' disabled={isSigningUp} onClick={handleSubmit}>{isSigningUp ? <Loader2Icon className='h-4 w-4 animate-spin' /> : "Create Account"}</Button>
            <p className='text-center mt-2'>Already have an account? <Link to={"/login"}><span className='text-blue-400'>Log in</span></Link></p>
          </div>
        </div>
      </div>
      <AuthImagePattern />
    </div>
  )
}

export default Signup
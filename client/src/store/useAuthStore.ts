/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"
import { toast } from "sonner"
import { create } from "zustand"

interface UserData {
    fullName: string,
    email: string,
    password: string,
    confirmPassword: string
}

interface AuthUser {
    _id: string,
    email: string,
    fullName: string,
    profilePic: string
}

interface AuthStore {
    authUser: AuthUser | null,
    isSigningUp: boolean,
    isLoggingIn: boolean,
    isLoggingOut: boolean,
    isUpdatingProfile: boolean,
    isCheckingAuth: boolean,
    checkAuth: () => Promise<void>,
    signup: (userData: UserData) => Promise<AuthUser>
    logout: () => Promise<void>
}

export const useAuthStore = create<AuthStore>((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isLoggingOut: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    checkAuth: async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/auth/check", {
                withCredentials: true
            })
            set({ authUser: res.data })
        }
        catch(err) {
            set({ authUser: null })
            console.error("Error in checkAuth ", err);
        }
        finally{
            set({ isCheckingAuth: false })
        }
    },
    signup: async (userData: UserData) => {
        set({ isSigningUp: true })
        try {
            const res = await axios.post("http://localhost:3000/api/auth/signup", userData, {
                withCredentials: true
            })
            
            console.log("Sign up successful ", res.data);
            set({ authUser: res.data })
            toast("Account created successfully")
            return res.data
        }
        catch(err: any) {
            console.error("Error in signing up ", err);
            const errorMessage = err?.response?.data?.message || "Something went wrong. Please try again.";
            toast(errorMessage)
            throw err
        }
        finally {
            set({ isSigningUp: false })
        }
    },
    logout: async () => {
        set({ isLoggingOut: true })
        try {
            await axios.post("http://localhost:3000/api/auth/logout")
            set({ authUser: null })
            toast("User logged out successfully");
        }
        catch(err: any) {
            console.error("Error in signing up ", err);
            const errorMessage = err?.response?.data?.message || "Something went wrong. Please try again.";
            toast(errorMessage)
        }
        finally {
            set({ isLoggingOut: false })
        }
    }
}))
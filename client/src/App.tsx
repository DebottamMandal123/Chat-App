/* eslint-disable react-hooks/exhaustive-deps */
import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import { useAuthStore } from "./store/useAuthStore"
import { useEffect } from "react"
import { Loader2Icon } from "lucide-react"
import { Toaster } from "./components/ui/sonner"

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth()
  }, [])

  console.log({ authUser })

  if (isCheckingAuth && !authUser) {
    return <div className="flex justify-center items-center h-screen" >
      <Loader2Icon className="animate-spin size-10"/>
    </div>
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to={"/login"} />}/>
        <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to={"/"} />}/>
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to={"/"} />}/>
        <Route path="/profile" element={authUser ? <Profile /> : <Navigate to={"/login"} />}/>
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
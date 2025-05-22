import { useAuthStore } from '@/store/useAuthStore'
import React from 'react'

const Navbar: React.FC = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <div>
       
    </div>
  )
}

export default Navbar
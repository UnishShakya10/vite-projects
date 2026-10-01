import { Link, Navigate, Outlet } from 'react-router'
import { Title } from '@mantine/core'

const PrivateRoutes = () => {

    const token = localStorage.getItem("token")
    const storedUser = JSON.parse(localStorage.getItem("user") || "null")
    const role = localStorage.getItem("role") || storedUser?.role

    if (!token ) {
        return <Navigate to="/login" replace />
    }

    if (token && String(role).toLowerCase() === "admin") {
    
  return (
    <>
  
   
  <div className="flex w-full "> 
            <div className='flex flex-col gap-6 bg-black text-white w-1/6 h-screen p-6'>
            <Title size={30} >Admin Admin</Title>
          <Link to={"/admin/dashboard"}>Dashboard</Link>
          <Link to={"blogs/add"}>Blog</Link>
          <div>Home</div>
            </div>
        
        <div className='w-5/6 p-4'>
            <Outlet/>
        </div>
         </div>
    </>
  )
    }

    return <Navigate to="/" replace />
}

export default PrivateRoutes
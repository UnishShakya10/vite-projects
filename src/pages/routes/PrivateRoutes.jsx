import React from 'react'
import { TodoList } from '../components/TodoList'

const PrivateRoutes = ({children}) => {

    const token = localStorage.getItem("token")

    if (!token) {
        return   <div>Login to access admin page {name}</div>
    }

  return (
    <>
  
   
    {children}
    </>
  )
}

export default PrivateRoutes
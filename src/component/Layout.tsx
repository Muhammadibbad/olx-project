import React from 'react'
import Navbar from './Navbar'


interface LayoutProps {
  children: React.ReactNode
  user: any
}

// const Layout = ({ children }: LayoutProps) => {
  const Layout = ({ children, user}: LayoutProps) => {
  return (
    <div className="">
      <Navbar user={user}/>
      <>
        {children}
      </>


    </div>
  )
}

export default Layout
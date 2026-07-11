import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from './Nav'

function Layout() {
  return (
    <>
      <Nav />
      <main className="main-content">
        <Outlet />
      </main>
    </>
  )
}

export default Layout

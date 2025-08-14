'use client'

import Link from 'next/link'
import { Hamburger, Mountain } from 'lucide-react'
import React, { useState } from 'react'
import ContactModalButton from './contact-modal' // adjust the path if needed

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => setIsOpen((prev) => !prev)
  const handleClose = () => setIsOpen(false)

  return (
    <header className="navbar bg-neutral-800 shadow-md sticky top-0 z-2">
      <div className="navbar-start hidden md:block">
        <Link href="/" className="btn btn-ghost text-xl">
          <Mountain className="h-6 w-6" />
          Home
        </Link>

        <div className="dropdown" onMouseLeave={handleClose}>
          <button onClick={handleToggle} className="btn btn-ghost">
            Products
          </button>

          {isOpen && (
            <ul
              className="menu menu-sm dropdown-content z-[2] p-2 shadow bg-neutral-700 rounded-box w-25 md:w-52"
              onClick={handleClose}
            >
              <li>
                <Link href="/products/bongs">Bongs</Link>
              </li>
              <li>
                <Link href="/products/pipes">Pipes</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
      <div className="navbar-start md:hidden dropdown ">
        <Hamburger onClick={handleToggle} />
        {isOpen && (
          <ul
            className="menu menu-sm dropdown-content z-[1] p-2 shadow bg-neutral-700 rounded-box w-25 md:w-52"
            onClick={handleClose}
          >
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/products/bongs">Bongs</Link>
            </li>
            <li>
              <Link href="/products/pipes">Pipes</Link>
            </li>
          </ul>
        )}
      </div>

      <div className="navbar-end">
        <ContactModalButton buttonText="Contact Sales" />
      </div>
    </header>
  )
}

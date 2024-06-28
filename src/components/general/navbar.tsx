"use client"

import React, { useState } from "react"
import {
  HoveredLink,
  Menu,
  MenuItem,
  ProductItem,
} from "@/components/aceternity/navbar-menu"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [active, setActive] = useState<string | null>(null)
  const [lastActive, setLastActive] = useState<string | null>(null)

  return (
    <Menu setActive={setActive} setLastActive={setLastActive} active={active}>
      <HoveredLink setActive={setActive} item="Home" href="/">
        Home
      </HoveredLink>
      <HoveredLink setActive={setActive} item="About Me" href="/about">
        About Me
      </HoveredLink>
      <MenuItem
        setActive={setActive}
        active={active}
        item="Projects"
        lastActive={lastActive}
        setLastActive={setLastActive}
      >
        <div className="  text-sm grid grid-cols-2 gap-10 p-4">
          <ProductItem
            title="Algochurn"
            href="https://algochurn.com"
            src="/agriculture-hall.jpg"
            description="Prepare for tech interviews like never before."
          />
          <ProductItem
            title="Tailwind Master Kit"
            href="https://tailwindmasterkit.com"
            src="/agriculture-hall.jpg"
            description="hello"
          />
          <ProductItem
            title="Moonbeam"
            href="https://gomoonbeam.com"
            src="/agriculture-hall.jpg"
            description="Never write from scratch again. Go from idea to blog in minutes."
          />
          <ProductItem
            title="Rogue"
            href="https://userogue.com"
            src="/agriculture-hall.jpg"
            description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
          />
        </div>
      </MenuItem>
      <HoveredLink setActive={setActive} item="Blog" href="/Blog">
        Blog
      </HoveredLink>
      <HoveredLink setActive={setActive} item="Contact" href="/Contact">
        Contact
      </HoveredLink>
    </Menu>
  )
}

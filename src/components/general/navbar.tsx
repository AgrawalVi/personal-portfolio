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
      <HoveredLink setActive={setActive} item="Projects" href="/#projects">
        Projects
      </HoveredLink>
      <HoveredLink setActive={setActive} item="Blog" href="/Blog">
        Blog
      </HoveredLink>
      <HoveredLink setActive={setActive} item="Contact" href="/Contact">
        Contact
      </HoveredLink>
    </Menu>
  )
}

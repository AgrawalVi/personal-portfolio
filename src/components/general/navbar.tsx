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
            title="SweetBeasts"
            href="/projects/sweetbeasts"
            src="/photography-section/agriculture-hall.jpg"
            description="E-Commerce site for SweetBeasts Inc built from scratch"
          />
          <ProductItem
            title="SweetBeasts Admin"
            href="/projects/sweetbeasts-admin"
            src="/photography-section/agriculture-hall.jpg"
            description="Admin panel for SweetBeasts Inc built from scratch"
          />
          <ProductItem
            title="Personal Portfolio"
            href="projects/personal-portfolio"
            src="/photography-section/agriculture-hall.jpg"
            description="Read about the site you're currently on"
          />
          <ProductItem
            title="View All"
            href="/projects"
            src="/photography-section/agriculture-hall.jpg"
            description="View all of my projects"
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

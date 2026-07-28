"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { DealsRail } from "@/components/deals-rail"
import { GameGrid } from "@/components/game-grid"
import { SiteFooter } from "@/components/site-footer"

export function StoreShell() {
  const [query, setQuery] = useState("")

  return (
    <div className="grid-fade-bg min-h-screen">
      <SiteHeader query={query} onQueryChange={setQuery} />
      <main>
        <Hero />
        <DealsRail />
        <GameGrid query={query} />
      </main>
      <SiteFooter />
    </div>
  )
}

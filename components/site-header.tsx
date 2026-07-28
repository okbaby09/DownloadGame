"use client"

import { useMemo, useState } from "react"
import { Search, Wallet, LogIn, Gamepad2, Plus, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatVND, games } from "@/lib/games"

type SiteHeaderProps = {
  query: string
  onQueryChange: (value: string) => void
}

export function SiteHeader({ query, onQueryChange }: SiteHeaderProps) {
  const [focused, setFocused] = useState(false)
  const balance = 250000

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return games.filter((g) => g.title.toLowerCase().includes(q)).slice(0, 5)
  }, [query])

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 md:h-20 md:gap-6 md:px-6">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 shrink-0" aria-label="CheapGame trang chủ">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground glow-neon md:h-10 md:w-10">
            <Gamepad2 className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="hidden text-xl font-bold tracking-tight text-glow sm:inline">
            CheapGame<span className="text-primary">.</span>
          </span>
        </a>

        {/* Search */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="relative flex-1 max-w-xl"
          role="search"
        >
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => window.setTimeout(() => setFocused(false), 150)}
            placeholder="Tìm game trong kho..."
            aria-label="Tìm kiếm game"
            className="h-10 w-full rounded-full border border-border bg-secondary/60 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-primary focus:bg-secondary focus:ring-2 focus:ring-ring/40 md:h-11"
          />

          {focused && suggestions.length > 0 && (
            <ul className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-border bg-popover shadow-2xl">
              {suggestions.map((g) => (
                <li key={g.appid}>
                  <a
                    href="#store"
                    className="flex items-center gap-3 px-3 py-2 transition-colors hover:bg-secondary"
                  >
                    <img
                      src={g.header || "/placeholder.svg"}
                      alt=""
                      className="h-8 w-[68px] shrink-0 rounded object-cover"
                    />
                    <span className="min-w-0 flex-1 truncate text-sm">{g.title}</span>
                    <span className="shrink-0 font-mono text-xs font-semibold text-primary">
                      {formatVND(g.price)}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </form>

        {/* Balance */}
        <div className="hidden items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1.5 md:flex">
          <Wallet className="h-4 w-4 text-primary" aria-hidden="true" />
          <div className="leading-tight">
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Số dư</p>
            <p className="font-mono text-sm font-semibold text-foreground">{formatVND(balance)}</p>
          </div>
        </div>

        {/* Deposit */}
        <Button className="hidden gap-1.5 rounded-full font-semibold glow-neon sm:inline-flex">
          <Plus className="h-4 w-4" aria-hidden="true" />
          Nạp tiền
        </Button>

        {/* Login */}
        <Button
          variant="outline"
          className="hidden gap-1.5 rounded-full border-border bg-transparent md:inline-flex"
        >
          <LogIn className="h-4 w-4" aria-hidden="true" />
          Đăng nhập
        </Button>

        {/* Mobile menu */}
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full md:hidden"
          aria-label="Mở menu"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </Button>
      </div>
    </header>
  )
}

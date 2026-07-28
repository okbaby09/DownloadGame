"use client"

import { ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatVND, type Game } from "@/lib/games"

const tagStyles: Record<NonNullable<Game["tag"]>, string> = {
  "Giảm sâu": "bg-destructive text-destructive-foreground",
  "Mới ra": "bg-accent text-accent-foreground",
  "Đề cử": "bg-primary text-primary-foreground",
}

export function GameCard({ game }: { game: Game }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:glow-neon">
      <div className="relative aspect-[2/3] overflow-hidden bg-secondary">
        <img
          src={game.portrait || "/placeholder.svg"}
          alt={`Ảnh bìa game ${game.title}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-card to-transparent" />

        <div className="absolute left-2 top-2 flex flex-wrap gap-1.5">
          {game.tag && (
            <span
              className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${tagStyles[game.tag]}`}
            >
              {game.tag}
            </span>
          )}
        </div>

        {game.rating !== null && (
          <span className="absolute right-2 top-2 flex items-center gap-1 rounded-md bg-background/80 px-2 py-0.5 text-[11px] font-medium backdrop-blur">
            <Star className="h-3 w-3 fill-primary text-primary" aria-hidden="true" />
            {game.rating}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="line-clamp-2 min-h-[2.5rem] text-pretty text-sm font-semibold leading-tight md:text-base">
            {game.title}
          </h3>
          <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
            {game.genres.join(" · ")}
          </p>
        </div>

        <div className="mt-auto flex items-end justify-between gap-2">
          <div className="leading-tight">
            <div className="flex h-5 items-center gap-1.5">
              {game.discount > 0 && (
                <>
                  <span className="rounded bg-primary/15 px-1.5 py-0.5 font-mono text-[11px] font-bold text-primary">
                    -{game.discount}%
                  </span>
                  <span className="font-mono text-xs text-muted-foreground line-through">
                    {formatVND(game.originalPrice)}
                  </span>
                </>
              )}
            </div>
            <p className="font-mono text-base font-bold text-primary text-glow md:text-lg">
              {formatVND(game.price)}
            </p>
          </div>
          <Button
            size="icon"
            aria-label={`Mua ngay ${game.title}`}
            className="size-9 shrink-0 rounded-full"
          >
            <ShoppingCart className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </article>
  )
}

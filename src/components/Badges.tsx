import { useMemo, useState } from "react"
import {
  badgeDefinitions,
  isBadgeUnlocked,
  type BadgeDef,
} from "../utils/badges"
import type { Status } from "../types"

export function Badges({ statusMap }: { statusMap: Record<string, Status> }) {
  const unlocked = badgeDefinitions.filter((b) => isBadgeUnlocked(b, statusMap))
  const stack = [...unlocked].reverse()

  // Generate and memoize random offsets only when unlocked badges change
  const offsets = useMemo(
    () =>
      stack.map(() => ({
        x: (Math.random() * 2 - 1) * 4,
        y: (Math.random() * 2 - 1) * 4 - 3,
      })),
    // fallback to join names for dependency
    [stack.map((b) => b.name).join(",")]
  )

  return (
    <div className="flex items-center justify-end -space-x-3 mr-2">
      {stack.map((badge, i) => {
        // safely handle potential undefined offsets
        const { x: offsetX, y: offsetY } = offsets[i] ?? { x: 0, y: 0 }
        return (
          <BadgeWithTooltip
            key={badge.name}
            badge={badge}
            offsetX={offsetX}
            offsetY={offsetY}
          />
        )
      })}
    </div>
  )
}

function BadgeWithTooltip({
  badge,
  offsetX = 0,
  offsetY = 0,
}: {
  badge: BadgeDef
  offsetX?: number
  offsetY?: number
}) {
  const [visible, setVisible] = useState(false)

  return (
    <div
      className="relative inline-block pointer-events-auto"
      style={{ transform: `translate(${offsetX}px, ${offsetY}px)` }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onClick={() => setVisible((v) => !v)}
    >
      <img
        src={`/badges/${badge.image}`}
        title={badge.name}
        alt={badge.name}
        className="h-10 w-10 p-1 transition-transform transition-opacity duration-500 ease-out"
        style={{
          filter: [
            "drop-shadow(1px 0 0 white)",
            "drop-shadow(-1px 0 0 white)",
            "drop-shadow(0 1px 0 white)",
            "drop-shadow(0 -1px 0 white)",
            "drop-shadow(1px 1px 0 white)",
            "drop-shadow(-1px 1px 0 white)",
            "drop-shadow(1px -1px 0 white)",
            "drop-shadow(-1px -1px 0 white)",
            "drop-shadow(0 0 2px rgba(0,0,0,0.25))",
          ].join(","),
        }}
      />
      {visible && (
        <div
          className="absolute bottom-full right-0 mb-2 w-40 bg-white text-black text-xs p-2 rounded shadow-lg z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="font-semibold truncate">{badge.name}</div>
          <div className="mt-1 leading-tight">{badge.description}</div>
        </div>
      )}
    </div>
  )
}

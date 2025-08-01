import { t } from "../constants/strings"
import type { Status } from "../types"
import { Badges } from "./Badges"

export function LegendFooter({
  statusMap,
  showBadges,
}: {
  statusMap: Record<string, Status>
  showBadges: boolean
}) {
  return (
    <div
      className={`flex w-full items-center ${
        showBadges ? "justify-start ml-2" : "justify-center"
      } mt-1 p-2 text-xs relative`}
    >
      {/* legend dots */}
      {['completed', 'inProgress', 'dropped', 'none'].map((key, i) => {
        const color = [
          'bg-green-500',
          'bg-yellow-500',
          'bg-red-500',
          'border border-gray-400',
        ][i]
        return (
          <span
            key={key}
            className="flex-shrink-0 flex items-center space-x-1 mr-6 px-2 py-1 min-w-[5rem]"
          >
            <span className={`h-3 w-3 ${color} rounded-full`} />
            <span className="whitespace-nowrap">{t(key as any)}</span>
          </span>
        )
      })}
      {/* badges to the right */}
      {showBadges && (
        <div className="absolute bottom-0 right-0 flex items-center -space-x-2 px-2">
          <Badges statusMap={statusMap} />
        </div>
      )}
    </div>
  )
}

import { useState, useEffect } from "react"

type OpacityMap = Record<string, number>

// module‐level cache so we only ever fetch once
let heatmapPromise: Promise<OpacityMap> | null = null

export function useHeatmap(): OpacityMap {
  const [map, setMap] = useState<OpacityMap>({})

  useEffect(() => {
    if (!heatmapPromise) {
      heatmapPromise = fetch("/heatmap.json")
        .then((r) => r.json())
        .then(
          (arr: { work_title: string; popularity: number }[]) => {
            const max = Math.max(...arr.map((e) => e.popularity), 1)
            const normalized: OpacityMap = {}
            arr.forEach(({ work_title, popularity }) => {
              normalized[work_title] = popularity / max
            })
            return normalized
          }
        )
    }
    heatmapPromise
      .then(setMap)
      .catch((err) => {
        console.error("Failed to load heatmap.json", err)
      })
  }, [])

  return map
}

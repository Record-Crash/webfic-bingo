import { Modal } from "./Modal"
import { type Settings } from "../types"
import { t } from "../constants/strings"

export function SettingsModal({
  isOpen,
  onClose,
  settings, 
  setSettings }: {
  isOpen: boolean
  onClose: () => void
  settings: Settings
  setSettings: (updater: Settings | ((prev: Settings) => Settings)) => void
}) {
  const toggle = (key: keyof Settings) =>
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }))

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl font-bold mb-4">{t("settings")}</h2>
      <div className="space-y-3">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={settings.autoFeathers}
            onChange={() => toggle("autoFeathers")}
            className="form-checkbox"
          />
          <span>{t("autoFeathers")}</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={settings.showBadges}
            onChange={() => toggle("showBadges")}
            className="form-checkbox"
          />
          <span>{t("showBadges")}</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={settings.showHeatmap}
            onChange={() => toggle("showHeatmap")}
            className="form-checkbox"
          />
          <span>{t("showHeatmap")}</span>
        </label>
      </div>
    </Modal>
  )
}

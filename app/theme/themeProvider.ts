// @ts-ignore
import React from "react"
import { useStores } from "../models/root-store"
import { ColorType, themes } from "./color"

export const ThemeContext = React.createContext({
  theme: "light",
  toggleTheme: () => {},
})

export const useTheme = (): {
  color: ColorType
  toggle: () => void
} => {
  const { themeStore } = useStores()
  const themeContext = React.useContext(ThemeContext)
  const color = themeStore.type ? themes[themeStore.type] : themes.light

  const toggle = () => {
    themeContext.toggleTheme()
  }

  return {
    color,
    toggle,
  }
}

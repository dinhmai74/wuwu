// Welcome to the main entry point of the app.
//
// In this file, we'll be kicking off our app or storybook.

import "./i18n"
import React, { useState, useEffect } from "react"
import { YellowBox } from "react-native"
import { RootStore, RootStoreProvider, setupRootStore } from "./models/root-store"
import { BackButtonHandler, exitRoutes, StatefulNavigator } from "./navigation"
import { initFonts } from "./theme/fonts"
import { AppThemeContext, themes } from "./theme"
import { contains } from "ramda"
import { enableScreens } from "react-native-screens"
import { ApplicationProvider } from "@ui-kitten/components"
import { mapping } from "@eva-design/eva"

// This puts screens in a native ViewController or Activity. If you want fully native
// stack navigation, use `createNativeStackNavigator` in place of `createStackNavigator`:
// https://github.com/kmagiera/react-native-screens#using-native-stack-navigator
enableScreens()

/**
 * Ignore some yellowbox warnings. Some of these are for deprecated functions
 * that we haven't gotten around to replacing yet.
 */
YellowBox.ignoreWarnings([
  "componentWillMount is deprecated",
  "componentWillReceiveProps is deprecated",
  "Require cycle:",
  "Story with",
])

/**
 * Are we allowed to exit the app?  This is called when the back button
 * is pressed on android.
 *
 * @param routeName The currently active route name.
 */
const canExit = (routeName: string) => contains(routeName, exitRoutes)

/**
 * This is the root component of our app.
 */
export default function App() {
  const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined) // prettier-ignore
  useEffect(() => {
    ;(async () => {
      await initFonts()
      setupRootStore().then(setRootStore)
    })()
  }, [])

  const [theme, setTheme] = React.useState("light")

  // Before we show the app, we have to wait for our state to be ready.
  // In the meantime, don't render anything. This will be the background
  // color set in native by rootView's background color.
  //
  // This step should be completely covered over by the splash screen though.
  //
  // You're welcome to swap in your own component to render if your boot up
  // sequence is too slow though.
  if (!rootStore) {
    return null
  }

  const currentTheme = themes[theme]

  const toggle = () => {
    const nextTheme = theme === "light" ? "dark" : "light"
    setTheme(nextTheme)
  }

  // otherwise, we're ready to render the app
  return (
    <RootStoreProvider value={rootStore}>
      <BackButtonHandler canExit={canExit}>
        <AppThemeContext.Provider value={{ theme, toggle }}>
          <ApplicationProvider mapping={mapping} theme={currentTheme}>
            <StatefulNavigator />
          </ApplicationProvider>
        </AppThemeContext.Provider>
      </BackButtonHandler>
    </RootStoreProvider>
  )
}

import { NavigationActions } from "react-navigation"

let navigator: {
  dispatch: (arg0: import("react-navigation").NavigationNavigateAction) => void
}

function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef
}

function navigate(routeName: string, params: any = null) {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  )
}

function goBack() {
  // @ts-ignore
  navigator.dispatch(NavigationActions.back())
}

// add other navigation functions that you need and export them
export const NavigateService = {
  navigate,
  goBack,
  setTopLevelNavigator,
}

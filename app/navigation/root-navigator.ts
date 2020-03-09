import { createStackNavigator } from "react-navigation-stack"
import { PrimaryNavigator } from "./primary-navigator"
import { AuthNavigator } from "./auth-navigator"

// prettier-ignore
import {
} from "../screens" // eslint-disable-line @typescript-eslint/no-unused-vars

export const RootNavigator = createStackNavigator(
  {
    authStack: { screen: AuthNavigator },
    primaryStack: { screen: PrimaryNavigator },
  },
  {
    headerMode: "none",
    navigationOptions: { gesturesEnabled: false },
  },
)

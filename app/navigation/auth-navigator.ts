import { createStackNavigator } from "react-navigation-stack"
import { WelcomeScreen } from "../screens"

export const AuthNavigator = createStackNavigator({
  welcomeScreen: WelcomeScreen,
})


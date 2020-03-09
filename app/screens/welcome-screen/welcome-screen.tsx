import { useStyleSheet, StyleService } from "@ui-kitten/components"
import React, { useState } from "react"
import { Image } from "react-native"
import Animated, { Clock, set, useCode, Value } from "react-native-reanimated"
import { bInterpolate } from "react-native-redash"
import { SafeAreaView, useSafeArea } from "react-native-safe-area-context"
import { NavigationInjectedProps } from "react-navigation"
import { useMemoOne } from "use-memo-one"
import { Button, Screen, SizedBox, Text, View } from "../../components"
import { metrics, spacing, useThemes } from "../../theme"
import { runTiming, runTimingWithEndAction } from "../../utils/reanimated"
import { images } from "../../../assets"

const themedStyles = StyleService.create({
  full: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing[6],
  },
  logo: {
    ...metrics.images.logo,
  },
  footer: {
    justifyContent: "flex-end",
    paddingHorizontal: spacing[6],
  },
  subText: {
    textAlign: "center",
  },
})

export interface WelcomeScreenProps extends NavigationInjectedProps<{}> {}

export const WelcomeScreen: React.FunctionComponent<WelcomeScreenProps> = props => {
  const styles = useStyleSheet(themedStyles)

  const { welcomeAnim, clock, subtextAnim } = useMemoOne(
    () => ({
      welcomeAnim: new Value(0),
      clock: new Clock(),
      subtextAnim: new Value(0) as any,
      outAnim: new Value(1) as any,
    }),
    [],
  )
  const [showWelcome, setShowWelcome] = useState(false)

  useCode(() => {
    if (showWelcome) return set(subtextAnim, runTiming(clock, 0.5, 1, 200))
    return set(welcomeAnim, runTimingWithEndAction(clock, 0, 1, () => setShowWelcome(true)))
  }, [showWelcome, welcomeAnim, subtextAnim])

  const welcomeY: any = bInterpolate(welcomeAnim, 500, 1)
  const welcomeOpacity: any = bInterpolate(welcomeAnim, 0, 1)
  const insets = useSafeArea()

  const { toggle } = useThemes()

  return (
    <Screen style={styles.full}>
      <Screen style={styles.container} preset="scroll">
        <Animated.View
          style={{
            transform: [{ translateY: welcomeY }],
            opacity: welcomeOpacity,
          }}
        >
          <Image source={images.chef} style={styles.logo} />
          <Text tx="welcomeScreen.title" category="h1" />
        </Animated.View>
        <SizedBox h={4} />
        <Animated.View
          style={{
            transform: [{ scale: subtextAnim }],
            opacity: subtextAnim,
          }}
        >
          <Text category="p1" style={styles.subText}>
            welcomeScreen.subText
          </Text>
        </Animated.View>
      </Screen>

      <View style={[styles.footer, { paddingBottom: insets.top }]}>
        <Animated.View style={{ opacity: bInterpolate(welcomeAnim, -3, 1) }}>
          <Button
            onPress={() => {
              toggle()
            }}
            full
          >
            welcomeScreen.getStarted
          </Button>
        </Animated.View>
      </View>
    </Screen>
  )
}

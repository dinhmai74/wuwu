import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { NavigationStoreModel } from "../../navigation/navigation-store"
import { ThemeModel } from "../theme"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  navigationStore: types.optional(NavigationStoreModel, {}),
  themeStore: types.optional(ThemeModel, {}),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}

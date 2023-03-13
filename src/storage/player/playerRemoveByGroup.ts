import AsyncStorage from "@react-native-async-storage/async-storage";

import {PLAYER_COLLECTION} from '@storage/storageConfig'
import { playerGetByGroup } from "./playerGetByGroup";

export async function playerRemoveByGroup(player:string, group:string) {
  try {
    const storage = await playerGetByGroup(group)
    const filteredPlayers = storage.filter((item) => item.name !== player)
    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, JSON.stringify(filteredPlayers))

  } catch (error) {
    throw error
  }
}
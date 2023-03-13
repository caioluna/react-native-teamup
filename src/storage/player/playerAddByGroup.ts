import AsyncStorage from "@react-native-async-storage/async-storage";

import { AppError } from "@utils/AppError";
import { PLAYER_COLLECTION } from "@storage/storageConfig";

import { PlayerStorageDTO } from './PlayerStorageDTO'
import { playerGetByGroup } from "./playerGetByGroup";

export async function playerAddByGroup(player: PlayerStorageDTO, group: string ) {
  try {
    const storedPlayers = await playerGetByGroup(group)
    const playerExists = storedPlayers.filter(storedPlayer => storedPlayer.name === player.name)

    if (playerExists.length > 0) {
      throw new AppError('Esta pessoa já está adicionada a um time.')
    }

    const storage = JSON.stringify([...storedPlayers, player])
    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage)
    
  } catch (error) {
    throw error
  }
}
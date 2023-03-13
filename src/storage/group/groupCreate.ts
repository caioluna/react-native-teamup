import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/storageConfig";
import { AppError } from "@utils/AppError";
import { groupGetAll } from "./groupGetAll";

export async function groupCreate(newGroup: string) {
  try {
    const storedGroups = await groupGetAll();

    const groupExists = storedGroups.find((group) => group === newGroup);
    if (groupExists) {
      throw new AppError('Um grupo com este nome já está cadastrado!');
    }
    
    const storage = JSON.stringify([...storedGroups, newGroup])
    await AsyncStorage.setItem(GROUP_COLLECTION, storage)
  } catch (error) {
    throw error
  }
}
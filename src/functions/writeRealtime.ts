import { getDatabase, ref, set } from "firebase/database"

type Data = boolean | string | number | { [x: string]: unknown }

/**
 * Write data in Firebase Realtime Database
 * @param path
 * @param data
 */
export default async function writeRealtime(path: string, data: Data | Data[]) {
  const db = getDatabase()

  await set(ref(db, path), data)

  return
}

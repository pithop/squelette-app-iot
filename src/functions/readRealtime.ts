import { getDatabase, onValue, ref } from "firebase/database"

/**
 * Read data from Firebase Realtime Database
 * @param path Path of value in Firebase Realtime Database
 * @param action Action to execute when receiving data
 */
export default function readRealtime(
  path: string,
  action: (data: any) => void
) {
  const db = getDatabase()

  const reference = ref(db, path)

  onValue(reference, (snapshot) => {
    const data = snapshot.val()
    action(data)
  })
}

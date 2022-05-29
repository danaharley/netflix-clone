import { DocumentData } from "firebase/firestore"
import { atom } from "recoil"
import { Movie } from "../type"

export const modalState = atom({
  key: "modalState",
  default: false,
})

export const movieState = atom<Movie | DocumentData | null>({
  key: "movieState",
  default: null,
})

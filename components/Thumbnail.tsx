import React from "react"
import Image from "next/image"
import { useRecoilState } from "recoil"
import { modalState, movieState } from "../atoms/modalAtom"
import { Movie } from "../type"
import { CUSTOM_IMG_BASE_URL } from "../utils/requests"

interface Props {
  movie: Movie
}

function Thumbnail({ movie }: Props) {
  const [, setCurrentMovie] = useRecoilState(movieState)
  const [, setShowModal] = useRecoilState(modalState)

  return (
    <div
      className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105"
      onClick={() => {
        setCurrentMovie(movie)
        setShowModal(true)
      }}
    >
      <Image
        src={`${CUSTOM_IMG_BASE_URL}${
          movie.backdrop_path || movie.poster_path
        }`}
        layout="fill"
        objectFit="cover"
        className="rounded-sm md:rounded"
      />
    </div>
  )
}

export default Thumbnail

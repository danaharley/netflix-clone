import React, { useEffect } from "react"
import Image from "next/image"
import { Movie } from "../type"
import { IMG_BASE_URL } from "../utils/requests"
import { FaPlay } from "react-icons/fa"
import { InformationCircleIcon } from "@heroicons/react/solid"
import { modalState, movieState } from "../atoms/modalAtom"
import { useRecoilState } from "recoil"

interface Props {
  netflixOriginals: Movie[]
}

function Banner({ netflixOriginals }: Props) {
  const [movies, setMovies] = React.useState<Movie | null>(null)
  const [, setShowModal] = useRecoilState(modalState)
  const [, setCurrentMovie] = useRecoilState(movieState)

  useEffect(() => {
    setMovies(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    )
  }, [netflixOriginals])

  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
      <div className="absolute top-0 left-0 -z-10 h-[95vh] w-screen">
        <Image
          src={`${IMG_BASE_URL}${movies?.backdrop_path || movies?.poster_path}`}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <h1 className="text-2xl font-bold md:text-4xl lg:text-7xl">
        {movies?.name || movies?.title || movies?.original_name}
      </h1>
      <p className="max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
        {movies?.overview}
      </p>

      <div className="flex space-x-3">
        <button
          className="bannerButton bg-white text-black"
          onClick={() => {
            setCurrentMovie(movies)
            setShowModal(true)
          }}
        >
          <FaPlay className="h-4 w-4 text-black md:h-7 md:w-7" /> Play
        </button>
        <button className="bannerButton bg-[gray]/70">
          More Info <InformationCircleIcon className="h-5 w-5 md:h-8 md:w-8" />
        </button>
      </div>
    </div>
  )
}

export default Banner

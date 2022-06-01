import React, { useEffect, useState } from "react"
import { BASE_URL, API_KEY } from "../utils/requests"
import { useRecoilState } from "recoil"
import { modalState, movieState } from "../atoms/modalAtom"
import MuiModal from "@mui/material/Modal"
import ReactPlayer from "react-player/lazy"
import { Element, Genre } from "../type"
import {
  PlusIcon,
  ThumbUpIcon,
  XIcon,
  VolumeOffIcon,
  VolumeUpIcon,
} from "@heroicons/react/outline"
import { FaPlay, FaPause } from "react-icons/fa"

function Modal() {
  const [movie] = useRecoilState(movieState)
  const [trailer, setTrailer] = useState<string>("")
  const [genres, setGenres] = useState<Genre[]>([])
  const [showModal, setShowModal] = useRecoilState(modalState)
  const [playing, setPlaying] = useState(true)
  const [muted, setMuted] = useState(false)

  const fetchMovie = async () => {
    const data = await fetch(
      `${BASE_URL}/${movie?.media_type === "tv" ? "tv" : "movie"}/${
        movie?.id
      }?api_key=${API_KEY}&language=en-US&append_to_response=videos`
    ).then((response) => response.json())

    if (data?.videos) {
      const index = data.videos.results.findIndex(
        (element: Element) => element.type === "Trailer"
      )
      setTrailer(data.videos?.results[index]?.key)
    }

    if (data?.genres) {
      setGenres(data.genres)
    }
  }

  useEffect(() => {
    if (!movie) return

    fetchMovie()
  }, [movie])

  const handleClose = () => {
    setShowModal(false)
  }

  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
      className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
    >
      <>
        <button
          onClick={handleClose}
          className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
        >
          <XIcon className="h-6 w-6" />
        </button>

        <div className="group relative pt-[56.25%]">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width="100%"
            height="100%"
            style={{ position: "absolute", top: "0", left: "0" }}
            playing={playing}
            muted={muted}
            controls={true}
          />
          <div className="absolute bottom-9 left-0 flex w-full items-center justify-between px-3 sm:bottom-10 sm:px-7 md:px-10">
            <div className="flex space-x-2">
              <button
                className="hidden items-center gap-x-2 rounded bg-white px-3 text-xl font-bold text-black transition hover:bg-[#e6e6e6] group-hover:flex sm:px-5 md:px-8"
                onClick={() => setPlaying(!playing)}
              >
                {playing ? (
                  <>
                    <FaPause className="modalIcons" />
                    <span className="text-sm sm:text-base md:text-xl">
                      Pause
                    </span>
                  </>
                ) : (
                  <>
                    <FaPlay className="modalIcons" />
                    <span className="text-sm sm:text-base md:text-xl">
                      Play
                    </span>
                  </>
                )}
              </button>
              <button className="modalButton">
                <PlusIcon className="modalIcons" />
              </button>
              <button className="modalButton">
                <ThumbUpIcon className="modalIcons" />
              </button>
            </div>
            <button className="modalButton" onClick={() => setMuted(!muted)}>
              {muted ? (
                <VolumeOffIcon className="modalIcons" />
              ) : (
                <VolumeUpIcon className="modalIcons" />
              )}
            </button>
          </div>
        </div>
        <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
          <div className="space-y-6 text-lg">
            <div className="flex items-center space-x-2 text-sm">
              <p className="font-semibold text-green-400">
                {movie?.vote_average * 10}% Match
              </p>
              <p className="font-light">
                {movie?.release_date || movie?.first_air_date}
              </p>
              <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                HD
              </div>
            </div>
            <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
              <p className="w-full">{movie?.overview}</p>
              <div className="flex flex-col space-y-3 text-sm">
                <div>
                  <span className="text-[gray]">Genres: </span>
                  {genres.map((genre) => genre.name).join(", ")}
                </div>
                <div>
                  <span className="text-[gray]">Original Language: </span>
                  {movie?.original_language}
                </div>
                <div>
                  <span className="text-[gray]">Total votes: </span>
                  {movie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  )
}

export default Modal

import React from "react"
import Head from "next/head"
import Image from "next/image"
import { SubmitHandler, useForm } from "react-hook-form"
import useAuth from "../hooks/useAuth"

interface Inputs {
  email: string
  password: string
}

function Login() {
  const [login, setLogin] = React.useState<Boolean>(false)
  const { signUp, signIn } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    if (login) {
      await signIn(email, password)
    } else {
      await signUp(email, password)
    }
  }

  return (
    <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>Netflix</title>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <Image
        src="https://rb.gy/p2hphi"
        layout="fill"
        className="-z-10 !hidden opacity-50 sm:!inline"
        objectFit="cover"
      />
      <img
        src="https://rb.gy/ulxxee"
        alt="netflix-logo"
        className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
        width={150}
        height={150}
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
      >
        <h1 className="text-4xl font-semibold">Sign In</h1>
        <div className="space-y-4">
          <label htmlFor="email" className="inline-block w-full">
            <input
              type="text"
              id="email"
              placeholder="Email"
              className="input"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="p-1 text-[13px] font-light text-orange-500">
                This field is required
              </p>
            )}
          </label>
          <label htmlFor="password" className="inline-block w-full">
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="input"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="p-1 text-[13px] font-light text-orange-500">
                This field is required
              </p>
            )}
          </label>
        </div>
        <button
          type="submit"
          className="w-full rounded bg-[#e50914] py-3 font-semibold"
        >
          Sign In
        </button>
        <div className="text-[gray]">
          New to Netflix?
          <button className="ml-1 text-white hover:underline">
            Sign Up Now
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login

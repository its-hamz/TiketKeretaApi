"use client"

import { axiosIstance } from "@/helper/api"
import { StoreCookie } from "@/helper/clientCookie"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { toast, ToastContainer } from "react-toastify"

const LoginPage = () => {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault()
      const url = `/auth`
      const requestData = {
        username, password
      }

      // hit endpoint
      const response: any = await axiosIstance.post(url, requestData)

      if (response.data.success === false) {
        const message = response.data.message
        toast(
          message,
          {
            type: `warning`,
            containerId: `toastLogin`
          }
        )
      }
      else {
        const message = response.data.message
        const token = response.data.token
        const role = response.data.role


        // store token in cookie
        StoreCookie(`token`, token)


        toast(
          message, {
          type: `success`,
          containerId: `toastLogin`
        }
        )
        if (role === `ADMIN`) {
          // jika role=admin maka redirect ke halaman admin
          setTimeout(() =>
            router.replace(`/karyawan/kereta`), 1000
          )

        }
        else{
          setTimeout(() => 
            router.replace(`/customer/jadwal`), 1000
        )}
      }

    } catch (error) {
      console.log(error)
      toast(`Some Thing Wong`, { containerId: `toastLogin`, type: `error` })
    }
  }

  return (
    <div className=" w-dvw h-dvh flex justify-center items-center rounded-full">
      <ToastContainer containerId={`toastLogin`} />

      <form onSubmit={e => handleSubmit(e)} className="w-5/6 md:w-1/2 rounded">
        <div className=" border rounded">
          {/* header Login */}
          <div className=" w-full bg-blue-600 text-white p-3">
            <h1 className=" text-xl font-semibold">
              Login
            </h1>

          </div>
          {/* login body */}
          <div className=" w-full p-5">
            <div className=" mb-3">
              <span className=" text-sm text-blue-600">
                Username
              </span>
              <input type="text" id={`username`} value={username} onChange={e => setUsername(e.target.value)} required={true} className=" w-full p-2 border rounded-md" />
            </div>
            <div className=" mb-3">
              <span className=" text-sm text-blue-600">
                Password
              </span>
              <input type="password" id={`password`} value={password} onChange={e => setPassword(e.target.value)} className=" w-full p-2 border rounded-md" />

            </div>
            <button type="submit" className=" bg-green-600 hover:bg-green-500 text-white w-full px-4 py-2 rounded">
              Login
            </button>

          </div>

        </div>
      </form>
    </div>
  )
}
export default LoginPage
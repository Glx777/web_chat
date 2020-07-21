import { useEffect, useState } from "react"
import Cookies from "js-cookie"

export interface User {
  id: string
  username: string
}

export const useAuth = (): User | undefined => {
  const [user, setUser] = useState<User>()
  const token = Cookies.get("token")

  useEffect((): void => {
    const getUserAsync = async (): Promise<void> => {
      const response = await fetch("http://localhost:5000/auth/me", {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
      })

      const user = await response.json()

      setUser({
        id: user.id,
        username: user.username,
      })
    }

    if (token && !user) {
      getUserAsync()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return user
}

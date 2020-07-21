import React, { ReactElement, useEffect, useState } from "react"
import { useRouter } from "next/dist/client/router"

import { useAuth } from "../hooks/use-auth"
import { routes } from "../routes"

import { Chat } from "./ui/chat"

export const ChatPage = (): ReactElement | null => {
  const [isReady, setIsReady] = useState(true)
  const user = useAuth()
  const router = useRouter()

  useEffect((): void => {
    setTimeout((): void => {
      setIsReady(false)
    }, 1000)
  }, [])

  useEffect((): void => {
    if (!user && !isReady) {
      router.replace(routes.root)
    }
  }, [user, isReady])

  return user ? <Chat /> : null
}

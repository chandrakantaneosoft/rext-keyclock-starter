// ** React Imports
import { ReactNode, ReactElement, useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Hooks Import
import { useAuth } from 'src/hooks/useAuth'

interface GuestGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const GuestGuard = (props: GuestGuardProps) => {
  const { children, fallback } = props
  const auth = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) {
      return
    }

    // if (window.localStorage.getItem('userData')) {
    //   console.log("if guest guard");
    //   router.replace('/')
    // } else {
    //   console.log(router.route);
    //   console.log(children);
    //   console.log("else guest guard");
    // }

    // router.replace('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  })

  if (auth.loading || (!auth.loading && auth.user !== null)) {
    console.log("else guest guard 2");
    return fallback
  }

  return <>{children}</>
}

export default GuestGuard

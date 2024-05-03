// ** React Imports
import { ReactNode } from 'react'

// ** Next Imports
import Head from 'next/head'
import { Router } from 'next/router'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'


import Login from './keyClock';


// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'
import type { EmotionCache } from '@emotion/cache'

// ** Config Imports

import { defaultACLObj } from 'src/configs/acl'
import themeConfig from 'src/configs/themeConfig'

// ** Fake-DB Import
import 'src/@fake-db'

// ** Third Party Import
import { Toaster } from 'react-hot-toast'

// ** Component Imports
import UserLayout from 'src/layouts/UserLayout'
import AclGuard from 'src/@core/components/auth/AclGuard'
import ThemeComponent from 'src/@core/theme/ThemeComponent'
import AuthGuard from 'src/@core/components/auth/AuthGuard'
import GuestGuard from 'src/@core/components/auth/GuestGuard'

// ** Spinner Import
import Spinner from 'src/@core/components/spinner'

// ** Contexts
import { AuthProvider } from 'src/context/AuthContext'
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'

// ** Styled Components
import ReactHotToast from 'src/@core/styles/libs/react-hot-toast'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

// ** Prismjs Styles
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'

import 'src/iconify-bundle/icons-bundle-react'

// ** Global css styles
// import '../../styles/globals.css'
import { SessionProvider } from "next-auth/react";
import { getServerSession } from "next-auth";


// ** Extend App Props with Emotion
type ExtendedAppProps = AppProps & {
  Component: NextPage
  emotionCache: EmotionCache
}

type GuardProps = {
  authGuard: boolean
  guestGuard: boolean
  children: ReactNode
}

const clientSideEmotionCache = createEmotionCache();
const authOptions = {
  clientId: "marketing",
  clientSecret: "AQHMEYJ0d4F2e3awQr4sjBWgiVsOPTqW",
  nextAuthSecret: "c0hgPCGOetWq70ilmhXzhCDwyTt4nJJIczYyb6iPpik=",
  issuer: "http://localhost:8080/realms/ampercent",
};




const Home = (props) => {
  return <SessionProvider session={props.session}>Home Page</SessionProvider>
}

export default Home
export async function getServerSideProps(context: any,) {
  console.log("getServerSideProps");
  const { req } = context;
  const cookies = req.cookies;

  try {
    let userSession: any = await getServerSession(
      context.req,
      context.res,
      authOptions
    );
    if (!userSession.user.image) {
      userSession.user.image = null; // or provide a default image URL
    }
    console.log("user session");
    console.log(userSession);
    if (!userSession) {

      return {
        props: {
          session: null
        },
      };
    }
    return {
      props: {
        cookies,
        session: {
          ...userSession,
          error: false,
        },
        // userData: userValidation?.data,
      },
    };
    // const params = {
    //     url: "marketing/auth/validate",
    //     headers: {
    //         Authorization: `Bearer ${userSession?.accessToken}`,
    //     },
    // };
    // const userValidation = await postRequest(params);
    // if (userValidation?.data && userValidation?.data?.active) {
    //     return {
    //         props: {
    //             session: {
    //                 ...userSession,
    //                 error: false,
    //             },
    //             userData: userValidation?.data,
    //         },
    //     };
    // } else {
    //     return {
    //         props: {
    //             session: {},
    //             validationError: true,
    //             debugger: userSession?.accessToken,
    //         },
    //     };
    // }
  } catch (error) {
    console.log("coming on catch");
    return {
      props: {
        session: null,
        debugError: JSON.parse(JSON.stringify(error)),
      },
    };
  }
}




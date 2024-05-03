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
import '../../styles/globals.css'
import { SessionProvider } from "next-auth/react";
import { getServerSession } from "next-auth";
import { useSession } from 'next-auth/react';
import type { NextRequest } from "next/server";
import { redirect } from 'next/navigation';
import { GetServerSideProps } from 'next/types';
// import { cookies } from "next/headers";


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

// ** Pace Loader
if (themeConfig.routingLoader) {
    Router.events.on('routeChangeStart', () => {
        NProgress.start()
    })
    Router.events.on('routeChangeError', () => {
        NProgress.done()
    })
    Router.events.on('routeChangeComplete', () => {
        NProgress.done()
    })
}

const Guard = ({ children, authGuard, guestGuard }: GuardProps) => {
    // console.log(children, authGuard, guestGuard);
    // if (guestGuard) {
    //     // return <GuestGuard fallback={<Spinner />}>{children}</GuestGuard>
    //     return "enable keyclock";
    // } else if (!guestGuard && !authGuard) {
    //     return <>{children}</>
    // } else {
    //     return <AuthGuard fallback={<Spinner />}>{children}</AuthGuard>
    // }
    if (guestGuard) {
        return <><Login></Login></>;
        // return <GuestGuard fallback={<Spinner />}>{children}</GuestGuard>
    } else if (!guestGuard && !authGuard) {
        // return "auth ";
        return <>{children}</>
    } else {
        return <AuthGuard fallback={<Spinner />}>{children}</AuthGuard>
    }
}

// ** Configure JSS & ClassName
const App = (props: ExtendedAppProps) => {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
    console.log("props from _app");
    console.log(props);
    console.log("app sessions");
    console.log(props.pageProps.session);

    // Variables
    const contentHeightFixed = Component.contentHeightFixed ?? false
    const getLayout =
        Component.getLayout ?? (page => <UserLayout contentHeightFixed={contentHeightFixed}>{page}</UserLayout>)

    const setConfig = Component.setConfig ?? undefined

    // const authGuard = Component.authGuard ?? false;

    // const guestGuard = Component.guestGuard ?? true;
    const authGuard = props.pageProps.session?.user ? true : false;
    const guestGuard = props.pageProps.session?.user ? false : true;

    // let token =
    //     request.cookies.get("next-auth.session-token") ||
    //     request.cookies.get("__Secure-next-auth.session-token");

    // const cookies = parseCookies();
    // const token = cookies['next-auth.session-token'] || cookies['__Secure-next-auth.session-token'];
    // const cookieStore = cookies();
    // const token = cookieStore.get("next-auth.session-token") || cookieStore.get("__Secure-next-auth.session-token");


    // console.log(token);
    const aclAbilities = defaultACLObj;



    // const authGuard = true;
    // const guestGuard = false;
    // const aclAbilities = defaultACLObj;

    return (

        <CacheProvider value={emotionCache}>
            {/* <Head>
                <title>{`${themeConfig.templateName} - Material Design React Admin Template`}</title>
                <meta
                    name='description'
                    content={`${themeConfig.templateName} – Material Design React Admin Dashboard Template – is the most developer friendly & highly customizable Admin Dashboard Template based on MUI v5.`}
                />
                <meta name='keywords' content='Material Design, MUI, Admin Template, React Admin Template' />
                <meta name='viewport' content='initial-scale=1, width=device-width' />
            </Head> */}

            {/* <AuthProvider> */}

            <SettingsProvider {...(setConfig ? { pageSettings: setConfig() } : {})}>

                <SettingsConsumer>
                    {({ settings }) => {
                        return (
                            <SessionProvider session={pageProps.session}>
                                {/* <p>working</p>

                                <p>authGuard {authGuard ? 'authguard on' : 'auth guard off'}</p>
                                <p>guestGuard {guestGuard ? 'guestGuard on' : 'guestGuard off'}</p> */}
                                <ThemeComponent settings={settings}>

                                    {/* <Guard authGuard={authGuard} guestGuard={guestGuard}> */}
                                    {getLayout(<Component {...pageProps} />)}
                                    {/* </Guard> */}

                                    {/* <Guard authGuard={authGuard} guestGuard={guestGuard}>
                                        <AclGuard aclAbilities={aclAbilities} guestGuard={guestGuard} authGuard={authGuard}>
                                            {getLayout(<Component {...pageProps} />)}
                                        </AclGuard>
                                    </Guard> */}

                                    <ReactHotToast>
                                        <Toaster position={settings.toastPosition} toastOptions={{ className: 'react-hot-toast' }} />
                                    </ReactHotToast>
                                </ThemeComponent>
                            </SessionProvider>
                        )
                    }}
                </SettingsConsumer>
            </SettingsProvider>
            {/* </AuthProvider> */}


        </CacheProvider>

    )
}

export default App
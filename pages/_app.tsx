import type { AppProps } from "next/app"

import { CacheProvider } from "@emotion/react"
import { ThemeProvider, CssBaseline } from "@mui/material"

import createEmotionCache from "../utilities/createEmotionCache"
import lightTheme from "../styles/themes/lightTheme"
import "../styles/globals.css"

const clientSideEmotionCache = createEmotionCache();

type CustomAppProps = AppProps & { emotionCache: any }

export default function App({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps
}: CustomAppProps) {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  )
}

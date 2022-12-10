import type { AppProps } from "next/app"

import { CacheProvider } from "@emotion/react"
import { ThemeProvider, CssBaseline } from "@mui/material"

import createEmotionCache from "../utilities/createEmotionCache"
import theme from "../styles/themes/darkTheme"
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
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  )
}

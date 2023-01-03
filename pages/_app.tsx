import '../styles/globals.css'
import {ThemeProvider} from "@mui/system";
import {QueryClient} from "@tanstack/query-core";
import {QueryClientProvider} from "@tanstack/react-query";
import {theme}from "theme";
import type { AppProps } from 'next/app'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      keepPreviousData: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchIntervalInBackground: false,
      staleTime: 1000 * 60 * 2,
      cacheTime: 1000 * 60 * 2,
    },
  },
});
export default function App({ Component, pageProps }: AppProps) {
  return (
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
         <Component {...pageProps} />
        </QueryClientProvider>
      </ThemeProvider>
  )
}

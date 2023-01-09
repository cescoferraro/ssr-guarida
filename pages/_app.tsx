import "../styles/globals.css";
import "react-18-image-lightbox/style.css";
import { ThemeProvider } from "@mui/system";
import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { theme } from "theme";
import type { AppProps } from "next/app";
import Head from "next/head";

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
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Guarida | Pra você viver melhor</title>
      </Head>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

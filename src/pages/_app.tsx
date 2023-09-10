import { AppProps } from "next/app";
import "../styles/globals.css";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "../context/ThemeContext";
import MainLayout from "../components/Layout/Layout";

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools /> */}
        <ThemeProvider>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;

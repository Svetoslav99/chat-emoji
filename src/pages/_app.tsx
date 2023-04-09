import { type AppType } from "next/app";
import Head from "next/head";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import { api } from "y/utils/api";

import "y/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
         <Head>
        <title>Chirp</title>
        <meta name="description" content="Just a test project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster position="bottom-center"/>
      <Component {...pageProps} />
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);

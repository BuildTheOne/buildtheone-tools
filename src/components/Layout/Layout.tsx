import Head from "next/head";
import MainDrawer from "../Drawer/Drawer";
import { useTheme } from "@/src/context/ThemeContext";

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  const { dark } = useTheme();

  return (
    <>
      <Head>
        <title>Tools</title>
        <link rel="icon" href="/favicon.ico"></link>
        <meta name="keywords" content="password generator," />
        <meta name="description" content="Tools" />
      </Head>

      <main
        className={dark ? "dark" : ""}
        data-theme={dark ? "night" : "winter"}
      >
        <div className="flex text-black dark:text-white">
          <MainDrawer>
            <div className="flex flex-col w-full h-screen justify-between overflow-auto bg-base-100 p-4 text-base">
              {children}
            </div>
          </MainDrawer>
        </div>
      </main>
    </>
  );
};

export default MainLayout;

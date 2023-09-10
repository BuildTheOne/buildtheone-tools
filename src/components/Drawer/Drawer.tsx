import { useTheme } from "@/src/context/ThemeContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { MdDarkMode, MdLightMode, MdMenu } from "react-icons/md";

type Props = {
  children: React.ReactNode;
};

type NavItemsProps = {
  name: string;
  link: string;
  image?: string;
};

const MainDrawer = ({ children }: Props) => {
  const { dark, changeTheme } = useTheme();
  const router = useRouter();

  const navItems: NavItemsProps[] = [
    { name: "Password Generator", link: "/password-generator" },
    { name: "Randomizer", link: "/randomizer" },
    { name: "Calculator", link: "/calculator" },
    { name: "Statistics", link: "/statistics" },
    { name: "Converter", link: "/converter" },
    { name: "Currency", link: "/currency" },
  ];

  const darkButtonSize = "h-6 w-6";

  return (
    <div className="drawer lg:drawer-open">
      <input id="sidebar" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {children}
        <div className="fixed left-0 bottom-0 flex items-center justify-center p-2">
          <label htmlFor="sidebar" className="btn btn-neutral lg:hidden">
            <MdMenu className="h-6 w-6" />
          </label>
        </div>
      </div>
      <div className="drawer-side">
        <label htmlFor="sidebar" className="drawer-overlay"></label>
        <ul className="menu text-base p-4 min-h-full bg-base-100 lg:border-r border-black dark:border-white flex flex-col justify-between">
          <div className="">
            {navItems.map((item, i) => {
              return (
                <li key={i} className="pb-2">
                  <Link href={item.link}>
                    <div>{item.name}</div>
                  </Link>
                </li>
              );
            })}
          </div>
          <button
            className="btn btn-neutral rounded-lg"
            onClick={() => changeTheme()}
          >
            <div className="flex items-center justify-center">
              {dark ? (
                <MdDarkMode className={darkButtonSize} />
              ) : (
                <MdLightMode className={darkButtonSize} />
              )}
            </div>
          </button>
        </ul>
      </div>
    </div>
  );
};

export default MainDrawer;

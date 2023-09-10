import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

type ItemProps = {
  name: string;
  link: string;
  image?: string;
};

const Index: NextPage = () => {
  const items: ItemProps[] = [
    { name: "Password Generator", link: "/password-generator" },
    { name: "Randomizer", link: "/randomizer" },
    { name: "Calculator", link: "/calculator" },
    { name: "Statistics", link: "/statistics" },
    { name: "Converter", link: "/converter" },
    { name: "Currency", link: "/currency" },
  ];

  return (
    <>
      <Head>
        <title>Tools</title>
      </Head>

      <div className="main">
        <h1>Tools</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((item, i) => {
            return (
              <Link key={i} href={item.link}>
                <div className="card bg-neutral">
                  <div className="card-body">
                    <h2 className="card-title text-white">{item.name}</h2>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Index;

import Image from "next/image";
import { Expletus_Sans } from "next/font/google";
import Head from "next/head";
import Link from "next/link";
import { Tab } from "@headlessui/react";
import Masonry from "react-masonry-css";
import ocean1 from "/public/ocean-1.jpeg";
import ocean2 from "/public/ocean-2.jpeg";
import ocean3 from "/public/ocean-3.jpeg";
import ocean4 from "/public/ocean-4.jpeg";
import ocean5 from "/public/ocean-5.jpeg";

const inter = Expletus_Sans({
  subsets: ["latin"],
  variable: "--font-expletus-sans",
});
const tabs = [
  {
    key: "all",
    display: "All",
  },
  {
    key: "oceans",
    display: "Oceans",
  },
  {
    key: "forests",
    display: "Forests",
  },
];

const images = [];

export default function Home() {
  return (
    <div className="h-full bg-[url('/photography-bg.jpeg')] bg-top bg-cover overflow-auto ">
      <Head>
        <title>Short Notice</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="fixed w-full z-10 top-0 flex justify-between items-center h-[90px] px-10">
        <span className="uppercase font-medium text-lg">ShortNotice</span>
        <Link
          href="#"
          className="rounded-3xl bg-white text-stone-700 px-3 py-2 hover:bg-opacity-90"
        >
          Get in touch
        </Link>
      </header>
      <main className="pt-[110px]">
        <div className=" flex flex-col items-center h-full">
          <Tab.Group>
            <Tab.List className="flex items-center gap-12">
              {tabs.map((tab) => (
                <Tab key={tab.key} className="p-2">
                  {({ selected }) => (
                    <span
                      className={
                        selected ? "text-white text-lg" : "text-stone-600"
                      }
                    >
                      {tab.display.toUpperCase()}
                    </span>
                  )}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="h-full max-w-[1000px] w-full p-2 sm:p-4 my-6">
              <Tab.Panel className="">
                <Masonry
                  breakpointCols={3}
                  className="flex gap-4"
                  columnClassName=""
                >
                  <Image src={ocean1} alt="ocean1" className="my-4" />
                  <Image src={ocean2} alt="ocean2" className="my-4" />
                  <Image src={ocean3} alt="ocean3" className="my-4" />
                  <Image src={ocean4} alt="ocean4" className="my-4" />
                  <Image src={ocean5} alt="ocean5" className="my-4" />
                  {/* <img src="/ocean-1.jpeg" alt="ocean-1" className="my-4" />
                  <img src="/ocean-2.jpeg" alt="ocean-2" className="my-4" />
                  <img src="/ocean-3.jpeg" alt="ocean-3" className="my-4" />
                  <img src="/ocean-4.jpeg" alt="ocean-4" className="my-4" />
                  <img src="/ocean-5.jpeg" alt="ocean-5" className="my-4" /> */}
                </Masonry>
              </Tab.Panel>
              <Tab.Panel className="">Oceans</Tab.Panel>
              <Tab.Panel className="">Forests</Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </main>
      <footer className="h-[90px] flex justify-center items-center uppercase text-lg font-medium">
        ShortNotice
      </footer>
    </div>
  );
}

import Image from "next/image";
import { Expletus_Sans } from "next/font/google";
import Head from "next/head";
import Link from "next/link";
import { Tab } from "@headlessui/react";
import Masonry from "react-masonry-css";
import nodeFetch from "node-fetch";
import lqip from "lqip-modern";

// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

// import plugins if you need
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

import bgImg from "/public/photography-bg.jpeg";
/* import ocean1 from "/public/ocean-1.jpeg";
import ocean2 from "/public/ocean-2.jpeg";
import ocean3 from "/public/ocean-3.jpeg";
import ocean4 from "/public/ocean-4.jpeg";
import ocean5 from "/public/ocean-5.jpeg"; */
import { useRef } from "react";
import { useMemo } from "react";
import { LightGallery } from "lightgallery/lightgallery";
import LightGalleryComponent from "lightgallery/react";
import { GetStaticProps } from "next";
import { createApi } from "unsplash-js";
import { type } from "os";

/* type CreateApi = ReturnType<typeof createApi>;
type SearchPhotos = CreateApi["search"];
type GetPhotos = SearchPhotos["getPhotos"];
type PhotoResponse = Awaited<ReturnType<GetPhotos>>; */

type Photo = {
  src: string;
  thumb: string;
  width: number;
  height: number;
  alt: string;
  blurDataURL: string;
  likes: number;
};

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

type HomeProps = {
  oceans: Photo[];
  forests: Photo[];
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const unsplash = createApi({
    accessKey: process.env.UNSPLASH_ACCESS_KEY!,
    fetch: nodeFetch as unknown as typeof fetch,
  });

  /*  const oceans = await getImages(unsplash, "oceans");
  const forests = await getImages(unsplash, "forests"); */

  const [oceans, forests] = await Promise.all([
    getImages(unsplash, "oceans"),
    getImages(unsplash, "forests"),
  ]);
  /* const mappedOceans: Photo[]=oceans.map(photo => ({
  <src:ocean></src:ocean>
 })) */

  /* const images = [ocean1, ocean2, ocean3, ocean4, ocean5]; */
  return {
    props: {
      oceans,
      forests,
    },
    revalidate: 10,
  };
};

export default function Home({ oceans, forests }: HomeProps) {
  const allPhotos = useMemo(() => {
    const all = [...oceans, ...forests];
    return all.sort((a, b) => b.likes - a.likes);
  }, [oceans, forests]);
  return (
    <div className="h-full overflow-auto ">
      <Head>
        <title>Short Notice</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="fixed left-0 top-0 w-full h-full from-stone-900 z-10 bg-gradient-to-t"></div>
      <Image
        src={bgImg}
        alt="background-image z-0 "
        className="fixed left-0 top-0 "
        placeholder="blur"
      />

      <header className="fixed w-full z-30 top-0 flex justify-between items-center h-[90px] px-10">
        <span className="uppercase font-medium text-lg">ShortNotice</span>
        <Link
          href="#"
          className="rounded-3xl bg-white text-stone-700 px-3 py-2 hover:bg-opacity-90"
        >
          Get in touch
        </Link>
      </header>
      <main className="relative pt-[110px] z-20">
        <div className=" flex flex-col items-center h-full">
          <Tab.Group>
            <Tab.List className=" bg-black bg-opacity-30 hover:bg-black fixed flex items-center gap-12 z-30 rounded-3xl px-3 py-2">
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
            <Tab.Panels className="h-full max-w-[1000px] w-full p-2 sm:p-4 my-12">
              <Tab.Panel className="overflow-auto">
                <Gallery photos={allPhotos} />
              </Tab.Panel>
              <Tab.Panel className="">
                <Gallery photos={oceans} />
              </Tab.Panel>
              <Tab.Panel className="">
                <Gallery photos={forests} />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </main>
      <footer className="relative h-[90px] flex justify-center items-center uppercase text-lg font-medium z-20">
        ShortNotice
      </footer>
    </div>
  );
}

type GalleryProps = {
  photos: Photo[];
};

function Gallery({ photos }: GalleryProps) {
  const ligthboxRef = useRef<LightGallery | null>(null);
  return (
    <>
      <Masonry breakpointCols={3} className="flex gap-4" columnClassName="">
        {photos.map((photo, i) => (
          <div className="relative" key={photo.src}>
            <Image
              src={photo.src}
              width={photo.width}
              height={photo.height}
              alt={photo.alt}
              className="my-4"
              placeholder="blur"
              blurDataURL={photo.blurDataURL}
              /* onClick={() => {
                ligthboxRef.current?.openGallery(i);
              }} */
            />
            <div
              className="absolute w-full h-full inset-0 bg-transparent hover:bg-stone-900 hover:bg-opacity-10 cursor-pointer"
              onClick={() => {
                ligthboxRef.current?.openGallery(i);
              }}
            ></div>
          </div>
        ))}
      </Masonry>

      <LightGalleryComponent
        onInit={(ref) => {
          if (ref) {
            ligthboxRef.current = ref.instance;
          }
        }}
        speed={500}
        plugins={[lgThumbnail, lgZoom]}
        dynamic
        dynamicEl={photos.map((photo) => ({
          src: photo.src,
          thumb: photo.src,
        }))}
      />
    </>
  );
}

async function getImages(
  cli: ReturnType<typeof createApi>,
  query: string
): Promise<Photo[]> {
  /* const photos = await cli.search.getPhotos */
  const photos = await cli.photos.getRandom({
    query,
    count: 20,
  });

  /* const forests = await cli.search.getPhotos({
    query: "forests",
    perPage: 20,
  });
 */
  const mappedPhotos: Photo[] = [];
  if (photos.type === "success") {
    /* const photosArr = photos.response.results.map((photo, i) */
    const responseArr = Array.isArray(photos.response)
      ? photos.response
      : [photos.response];
    const photosArr = responseArr.map((photo, i) => ({
      src: photo.urls.full,
      thumb: photo.urls.thumb,
      width: photo.width,
      height: photo.height,
      alt: photo.alt_description ?? `ocean-img-${i}`,
      likes: photo.likes,
    }));
    const photoArrWithDataUrl: Photo[] = [];
    for (const photo of photosArr) {
      const blurDataURL = await getDataUrl(photo.src);
      photoArrWithDataUrl.push({ ...photo, blurDataURL });
    }
    mappedPhotos.push(...photoArrWithDataUrl);
  } else {
    console.error("Could not get ocean photos");
  }

  /* const mappedForests: Photo[] = [];
  if (forests.type === "success") {
    mappedForests.push(
      ...forests.response.results.map((forest, i) => ({
        src: forest.urls.full,
        thumb: forest.urls.thumb,
        width: forest.width,
        height: forest.height,
        alt: forest.alt_description ?? `forest-img-${i}`,
      }))
    );
  } else {
    console.error("Could not get forest photos");
  } */
  return mappedPhotos;
}

async function getDataUrl(url: string) {
  const imgData = await fetch(url);

  const arrayBufferData = await imgData.arrayBuffer();
  const lqipData = await lqip(Buffer.from(arrayBufferData));

  return lqipData.metadata.dataURIBase64;
}

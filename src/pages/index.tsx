import type { NextPage } from "next";
import Image from "next/future/image";
import { AutoAnimate } from "../../comonents/auto-animate";
import { appRouter } from "../server/router";
import { createContext } from "../server/router/context";
import { trpc } from "../utils/trpc";
import superjson from "superjson";
import { createSSGHelpers } from "@trpc/react/ssg";

const Home: NextPage = () => {
  const { data, isFetching } = trpc.useQuery(["getSlides"], {
    refetchInterval: 10000,
  });
  console.log("data", data);

  function humanizeAmount(microAmount: string) {
    const amount = Number(BigInt(microAmount ?? "0")) / 1_000_000;

    if (amount === 0) return "0";

    if (amount % 1_000_000_000 === 0) {
      return `${amount / 1000000000}B`;
    }

    if (amount % 1_000_000 === 0) {
      return `${amount / 1000000}M`;
    }

    if (amount % 1_000 === 0) {
      return `${amount / 1000}K`;
    }

    return amount.toLocaleString("en-US", {
      minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    });
  }

  // document.addEventListener("click", () => {
  //   document.documentElement.requestFullscreen().catch((e) => {
  //     console.log(e);
  //   });
  // });

  // function showImage(image, data, description, price) {
  //   document.getElementById("slideshow-image").src = image;
  //   document.getElementById("slideshow-qr").src =
  //     "https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=" +
  //     data.url;
  //   document.getElementById("collection-name").innerHTML = data.collection_name;
  //   document.getElementById(
  //     "collection-info"
  //   ).innerHTML = `#${data.token_id} of ${data.token_amount}`;
  //   document.getElementById("collection-description").innerHTML = description;
  //   if (price !== null)
  //     document.getElementById("forsale").innerHTML = `${humanizeAmount(
  //       price
  //     )} STARS`;
  //   else document.getElementById("forsale").innerHTML = ``;
  // }

  // async function fetchNewImage() {
  //   const { data } = await axios.get(
  //     `${BASE_URL}/api/slideshow?collection=${randomCollection()}`
  //   );
  //   return data;
  // }

  // // fetchNewImage() then set it as Nft, then refetch every 10 seconds
  // useEffect(() => {
  //   const interval = setInterval(async () => {
  //     const data = await fetchNewImage();
  //     setNft(data);
  //   }, 3000);
  //   return () => clearInterval(interval);
  // }, []);

  // console.log("nft", nft);

  // document.getElementById("slideshow-image").addEventListener("load", () => {
  //   document.getElementById("container").classList.remove("animate__fadeOut");
  //   document.getElementById("container").classList.add("animate__fadeIn");
  // });

  return (
    <>
      <AutoAnimate className="fixed flex flex-row inset-0 bg-black">
        {data && !isFetching && (
          <>
            <div className="absolute bottom-0 left-0 text-left text-white w-1/5 p-5 transition-all duration-1000">
              <div className="text-5xl font-semibold">
                {data?.collection?.name}
              </div>
              {data?.token?.id && (
                <div className="text-2xl">
                  {data?.token?.id} of {data.token_amount}
                </div>
              )}
              {data?.token?.price && (
                <div className="text-2xl">
                  {data?.token?.price && humanizeAmount(data?.token?.price)}
                  STARS
                </div>
              )}
            </div>
            <div className="relative h-full w-full max-w-[60%] mx-auto">
              <Image
                src={data?.image}
                fill={true}
                className="h-full w-auto object-contain mx-auto"
                alt={data?.token?.name}
              />
            </div>
            <div className="absolute top-0 right-0 text-right text-white w-1/5 p-5 text-2xl">
              {data?.token?.collection?.description}
            </div>
          </>
        )}
      </AutoAnimate>
    </>
  );
};

export default Home;

export const getStaticProps = async () => {
  const ssg = await createSSGHelpers({
    router: appRouter,
    ctx: {},
    transformer: superjson,
  });
  await ssg.fetchQuery("getSlides");

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 3600,
  };
};

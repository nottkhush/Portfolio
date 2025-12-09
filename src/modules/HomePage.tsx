import ScrollButton from "@/components/ScrollButton";
import { dmSerifSans, storyScript } from "@/lib/fonts";
import Image from "next/image";

export default function HomePage() {
  return (
    <section
      id="home"
      className="min-h-screen bg-[#f7f6f2] bg-[url('/pattern.svg')] bg-center bg-no-repeat bg-cover flex flex-col items-center pt-24 md:pt-28 md:snap-start"
    >
      <div className="flex flex-col items-center gap-6 px-4 w-full max-w-4xl flex-1 justify-center">
        <div className="shadow-xl rounded-xl overflow-hidden w-32 h-32 sm:w-40 sm:h-40 md:w-[190px] md:h-[190px]">
          <Image
            src="/photo.svg"
            alt="My Photo"
            width={300}
            height={300}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex items-center gap-2 bg-white rounded-md px-2 py-1 shadow-sm border border-black/5">
          <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-[#f9c6b3] to-[#fceae3] text-[#d45531] px-1 rounded-md">
            Hey!
          </span>
          <span className="text-xs sm:text-sm text-gray-500 font-semibold">
            I&apos;m{" "}
            <span className="font-semibold text-gray-800">Khushal Jain</span>
          </span>
        </div>

        <div className="flex flex-col items-center text-center w-full px-2 sm:px-4 gap-4 mt-2">
          <h1 className="font-extrabold text-3xl sm:text-4xl md:text-6xl leading-tight text-gray-900">
            <span
              className={`${dmSerifSans.className} font-light italic tracking-wide`}
            >
              I build{" "}
            </span>
            <span
              className={`${storyScript.className} font-light italic tracking-wide`}
            >
              full-stack
            </span>{" "}
            <span className={`${dmSerifSans.className} font-extrabold`}>
              stuff
            </span>
            <br />
            <span className={`${dmSerifSans.className} font-extrabold`}>
              that actually works!
            </span>
          </h1>

          <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl">
            Code, bugs, and late-night coffee keep it all running.
            <br />
            I turn complex problems into clean, working solutions.
          </p>
        </div>
      </div>

      <div className="w-full max-w-4xl px-4 mt-4 mb-8 flex justify-center">
        <ScrollButton href="#about" />
      </div>
    </section>
  );
}

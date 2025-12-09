import { dmSerifSans } from "@/lib/fonts";
import Image from "next/image";

export default function AboutPage() {
  return (
    <section
      id="about"
      className="
        bg-white 
        flex items-start md:items-center justify-center
        px-4 sm:px-6
        py-16 sm:py-20 md:py-24
        md:min-h-screen
        scroll-mt-24 md:scroll-mt-28
      "
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl w-full items-center">
        {/* IMAGE */}
        <div className="flex justify-center">
          <Image
            src="/aboutImg.svg"
            alt="About Image"
            width={500}
            height={500}
            className="
              object-contain rounded-2xl
              max-w-xs sm:max-w-sm md:max-w-md
            "
          />
        </div>

        {/* TEXT CONTENT */}
        <div className="px-0 sm:px-4 md:px-6">
          <h2
            className={`${dmSerifSans.className}
              text-3xl sm:text-4xl md:text-6xl lg:text-7xl
              font-bold mb-5 sm:mb-6
            `}
          >
            About Me
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 leading-relaxed">
            Hello! I&apos;m Khushal Jain, a passionate web developer with a knack
            for creating dynamic and user-friendly web applications. With a
            strong foundation in both front-end and back-end technologies, I
            enjoy bringing ideas to life in the digital world.
          </p>

          <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
            When I&apos;m not coding, you can find me exploring the latest tech
            trends, contributing to open-source projects, or indulging in my
            love for photography. Let&apos;s connect and create something amazing
            together!
          </p>
        </div>
      </div>
    </section>
  );
}

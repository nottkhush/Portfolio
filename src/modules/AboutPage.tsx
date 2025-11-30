import { dmSerifSans } from "@/lib/fonts";
import Image from "next/image";

export default function AboutPage() {
  return (
     <section id="about" className="h-full bg-white flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl items-center px-6">
        {/* IMAGE */}
        <div className="flex justify-center">
          <Image
            src="/aboutImg.svg"
            alt="About Image"
            width={500}
            height={500}
            className="object-contain rounded-2xl"
          />
        </div>

        {/* TEXT CONTENT */}
        <div className="px-6">
          <h2 className={`${dmSerifSans.className} text-7xl font-bold mb-15`}>About Me</h2>
          <p className="text-lg text-gray-700 mb-4">
            Hello! I&apos;m Khushal Jain, a passionate web developer with a knack for
            creating dynamic and user-friendly web applications. With a strong
            foundation in both front-end and back-end technologies, I enjoy
            bringing ideas to life in the digital world.
          </p>

          <p className="text-lg text-gray-700">
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

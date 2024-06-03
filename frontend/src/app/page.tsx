import Image from "next/image";

import LandingImage from "../../public/images/landing.png";
import AppStoreImage from "../../public/images/appDownload.png";
import HeroSection from "@/components/HeroSection.component";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <div className="flex flex-col gap-12 container mx-auto flex-1 py-10">
        <div className="bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
          <h1 className="text-5xl font-bold tracking-tight text-primary">
            Tuck into takaway today
          </h1>
          <span className="text-xl">Food is just one click away!</span>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          <Image
            src={LandingImage}
            alt="landing-image"
            width={1920}
            height={400}
            className="max-h-[600px] w-full object-cover"
          />
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <span className="font-bold text-3xl tracking-tighter">
              Order takaway even faster!
            </span>
            <span>
              Download MernEats App for faster ordering and personalized
              recommendations
            </span>
            <Image
              src={AppStoreImage}
              alt="landing-image"
              width={1920}
              height={400}
              className="max-h-[600px] w-full object-cover"
            />
          </div>
        </div>
      </div>
    </main>
  );
}

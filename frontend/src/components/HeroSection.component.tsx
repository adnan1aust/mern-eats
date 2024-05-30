import Image from "next/image";
import HeroImage from "../../public/images/hero.png";

const HeroSection = () => {
  return (
    <Image
      src={HeroImage}
      alt="hero-image"
      width={1920}
      height={600}
      className="max-h-[600px] w-full object-cover"
    />
  );
};

export default HeroSection;

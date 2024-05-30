import Image from "next/image";
import HeroImage from "../../public/images/hero.png";

const HeroSection = () => {
  return (
    <Image
      src={HeroImage}
      alt="hero-image"
      className="max-h-[600px] w-full object-cover"
      priority
    />
  );
};

export default HeroSection;

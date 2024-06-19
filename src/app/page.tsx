import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import SearchBar from "@/components/SearchBar";
import LottiePlayer from "@/components/LottiePlayer";

export default function Home() {
  return (
    <MaxWidthWrapper>
      <div className="flex items-center max-sm:mb-2">
        <LottiePlayer srcPath="/sun-animation.lottie" width={220} />
        <h1 className="text-3xl lg:text-nowrap">Weather Wonders</h1>
      </div>
      <SearchBar />
    </MaxWidthWrapper>
  );
}

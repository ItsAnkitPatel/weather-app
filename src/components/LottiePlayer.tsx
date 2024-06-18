import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const LottiePlayer = ({
  srcPath,
  width,
  height,
  speed
}: {
  srcPath: string;
  width?: number;
  height?: number;
  speed?:number
}) => (
  <DotLottieReact autoplay loop src={srcPath} style={{ width: width + "px", height: height + "px" }} speed={speed}/>
);

export default LottiePlayer;

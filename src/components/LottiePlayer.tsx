import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const LottiePlayer = ({
  srcPath,
  width,
  height,
  speed,
  className,
}: {
  srcPath: string;
  width?: number;
  height?: number;
  speed?: number;
  className?: string;
}) => (
  <DotLottieReact
    autoplay
    loop
    src={srcPath}
    style={{ width: width + "rem", height: height + "px" }}
    speed={speed}
    className={className}
  />
);

export default LottiePlayer;

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const MaxWidthWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto min-h-screen w-full max-w-screen-xl px-2.5 md:px-20 overflow-x-hidden",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;

import { TypeAnimation } from "react-type-animation";

type TypingAnimationProps = {
  title?: string;
  phrases: string[];
  className?: string;
};

const TypingAnimation = ({
  title = "Build Space",
  phrases,
  className = "",
}: TypingAnimationProps) => {
  return (
    <div
      className={`flex flex-col gap-5 px-4 text-center font-bold text-5xl md:text-6xl lg:text-7xl ${className}`}
    >
      <h1 className="text-primary">{title}</h1>
      <TypeAnimation
        sequence={phrases.flatMap((text) => [text, 1500])}
        wrapper="span"
        speed={50}
        repeat={Infinity}
        cursor={false}
      />
    </div>
  );
};

export default TypingAnimation;

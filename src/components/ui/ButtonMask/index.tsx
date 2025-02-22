import { CSSProperties, JSX } from "react";

const ButtonMask: React.FC<{
  children: JSX.Element;
  className?: string;
  style?: CSSProperties;
}> = ({ children, className, style }) => {
  return (
    <div
      className={
        "overflow-hidden flex justify-center rounded-full " + className
      }
      style={{ ...style}}
    >
      {children}
    </div>
  );
};

export default ButtonMask;

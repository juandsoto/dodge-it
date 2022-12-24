import { HTMLAttributes } from "react";

interface Props extends Omit<HTMLAttributes<HTMLButtonElement>, "title"> {
  title?: JSX.Element | string;
}

const Movement = ({ title, className, ...props }: Props) => {
  return (
    <button className={"text-transparent ".concat(className ?? "")} {...props}>
      {title}
    </button>
  );
};

export default Movement;

import Link from "next/link";

const Button = ({
  label,
  style,
  width,
  bgColor,
  onClick
}: {
  label: string | any;
  style?: string | any;
  width: any;
  bgColor: string;
  onClick: any;


}) => {
  return (
    <div
    onClick={onClick  === onClick ? onClick : ""}
       style={{width: width, background: bgColor}}
      className={`btn mb-4 px-2 h-[72.5%] pt-2 uppercase flex justify-center me-1 no-underline hover:text-white dark:hover:text-[#3265fc] ${
        style === "outline" ? "btn-outline-primary" : "btn-primary"
      }`}
    >
      {label}
    </div>
  );
};

export default Button;

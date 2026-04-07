export const ThemedText = ({
  className = "",
  type = "normal",
  children,
  ...rest
}) => {
  const baseClasses = "text-gray-700 mb-4";

  const typeClasses = {
    normal: "font-bold",
    h1: "text-3xl font-bold",
    h2: "text-2xl font-bold",
    link: "font-normal underline cursor-pointer hover:opacity-80",
  };

  return (
    <div
      className={[baseClasses, typeClasses[type], className].join(" ")}
      {...rest}
    >
      {children}
    </div>
  );
};

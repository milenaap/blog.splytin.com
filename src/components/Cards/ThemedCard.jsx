export const ThemedCard = ({ className = "", variant = "default", children }) => {
  const baseClasses = "mx-auto rounded-lg shadow-lg p-6";

  const variantClasses = {
    default: "bg-white",
    form: "max-w-4xl bg-white",
    info: "bg-white border border-gray-200",
    stats: "bg-gradient-to-r from-indigo-500 to-purple-500 text-white",
    muted: "bg-gray-100/40",
    dark: "bg-gray-800 text-white"
  };

  return (
    <div className={[baseClasses, variantClasses[variant], className].join(" ")}>
      {children}
    </div>
  );
};

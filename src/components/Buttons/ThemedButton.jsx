import classNames from "classnames";

export const ThemedButton = ({ children, type = "button", variant = "primary", onClick, className, disabled = false }) => {
  return (
    <button
      type={type}
      className={classNames(
        "py-2 px-4 w-full xl:w-32 xl:mr-3 rounded-md text-white font-semibold transition-all duration-200 cursor-pointer",
        {
          "bg-gray-400 cursor-not-allowed": disabled,
          "bg-primary hover:bg-primary-dark": !disabled && variant === "primary",
          "bg-danger hover:bg-danger-dark": !disabled && variant === "danger",
          "bg-secondary hover:bg-secondary-dark": !disabled && variant === "secondary",
          "bg-success hover:bg-success-dark": !disabled && variant === "success",
          "bg-info hover:bg-info-dark": !disabled && variant === "info",
          "bg-warning hover:bg-warning-dark": !disabled && variant === "warning",
        },
        className
      )}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

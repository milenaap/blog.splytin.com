export const getVariantTextClass = (variant = "neutral") => {
  return (
    {
      neutral: "text-neutral",
      special_price: "text-special-price",
      danger: "text-danger",
      warning: "text-warning",
      success: "text-success",
      info: "text-info",
      primary: "text-primary",
      secondary: "text-secondary",
    }[variant] || "text-neutral"
  );
};

export const getVariantBgClass = (variant = "neutral") => {
  return (
    {
      neutral: "bg-neutral",
      special_price: "bg-special-price",
      danger: "bg-danger",
      warning: "bg-warning",
      success: "bg-success",
      info: "bg-info",
      primary: "bg-primary",
      secondary: "bg-secondary",
    }[variant] || "bg-neutral"
  );
};

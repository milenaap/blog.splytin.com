import classNames from "classnames";
import { getVariantBgClass } from "../../helpers/helperVariantClass";

export const ThemedBadge = ({ text, variant = "gray", className = "" }) => {
  return (
    <span
      className={classNames(
        "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
        getVariantBgClass(variant),
        "text-white",
        className
      )}
    >
      {text}
    </span>
  );
};

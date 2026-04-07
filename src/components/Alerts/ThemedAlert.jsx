import classNames from "classnames";
import { getVariantBgClass, getVariantTextClass } from "../../helpers/helperVariantClass";

export const ThemedAlert = ({ text, variant = "info", icon = null, className = "" }) => {
  return (
    <div
      role="alert"
      className={classNames(
        "flex items-center gap-3 rounded-lg px-4 py-3 text-sm",
        getVariantBgClass(variant),
        getVariantTextClass(variant),
        className
      )}
    >
      {icon && <span className="shrink-0 text-white">{icon}</span>}
      <span className="text-white">{text}</span>
    </div>
  );
};

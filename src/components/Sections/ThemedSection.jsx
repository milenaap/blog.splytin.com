import classNames from "classnames";

export const ThemedSection = ({ title, subtitle, className, children }) => {
  return (
    <section className={classNames("section", className)}>
      <div className="section__container">
        {title && <h2 className="section__heading">{title}</h2>}
        {subtitle && <p className="section__subtitle">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
};

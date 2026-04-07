import { PreloaderSVG } from "./PreloaderSVG";
import "./PreloaderMain.css";

export const PreloaderMain = () => {
  return (
    <div className="preloader flex justify-center">
      <PreloaderSVG />
    </div>
  );
};

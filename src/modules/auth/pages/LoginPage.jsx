import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ImgLogo from "../../../assets/images/logo.svg";
import { ThemedEyeOffIcon } from "../../../components/Icons/ThemedEyeOffIcon";
import { ThemedEyeOnIcon } from "../../../components/Icons/ThemedEyeOnIcon";
import { useTranslation } from "react-i18next";
import { ThemedButton } from "../../../components/Buttons/ThemedButton";
import { startLoginWithEmailPassword } from "../../../store/auth/thunks";
import { Toast } from "../../../helpers/helperToast";
import { PreloaderButton } from "../../../components/Preloader/PreloaderButton";

export const LoginPage = () => {
  // Estados y hooks
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { status, errorMessage } = useSelector((state) => state.auth);

  // Mostrar toast si hay mensaje de error
  useEffect(() => {
    if (errorMessage) {
      Toast(`Error: ${errorMessage}`, "error");
    }
  }, [errorMessage]);

  // Manejar submit
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Los campos son requeridos");
      return;
    }
    try {
      dispatch(startLoginWithEmailPassword({ email, password }));
    } catch (error) {
      console.log(error);
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="container bg-navbar">
      <div className="block xl:grid grid-cols-2 gap-4">
        {/* Lado izquierdo con branding */}
        <div className="hidden xl:flex flex-col min-h-screen pl-24 animate__animated animate__bounceInLeft form-section">
          <div className="my-auto p-10">
            <img alt="Site - Office" src={ImgLogo} />
            <div className="-intro-x font-light text-4xl leading-tight mt-10 text-white">
              Sistema de Gestión Empresarial
            </div>
            <div className="-intro-x font-light text-2xl leading-tight text-white">
              ERP Edition
            </div>
          </div>
        </div>

        {/* Lado derecho con el formulario */}
        <div className="h-screen xl:h-auto flex xl:py-0 my-10 xl:my-0 bg-white">
          <div className="my-auto mx-auto xl:ml-20 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto animate__animated animate__bounceInRight">
            <form onSubmit={onSubmit}>
              <h2 className="intro-x text-primary text-2xl xl:text-3xl text-center xl:text-left">
                {t("login_page.title")}
              </h2>

              {/* Campo email */}
              <div className="intro-x mt-8">
                <input
                  type="email"
                  className="form-control w-full h-10 px-4 py-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline mb-3"
                  required
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                {/* Campo password con toggle de visibilidad */}
                <div className="relative">
                  <input
                    className="form-control w-full h-10 px-4 py-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center px-2">
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? (
                        <ThemedEyeOffIcon className="w-5 h-5" />
                      ) : (
                        <ThemedEyeOnIcon className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Checkbox recordar y enlace forgot */}
              <div className="intro-x flex text-slate-600 text-xs sm:text-sm mt-4">
                <div className="flex items-center mr-auto">
                  <input id="remember-me" type="checkbox" className="form-check-input border mr-2" />
                  <label className="cursor-pointer select-none" htmlFor="remember-me">
                    {t("login_page.remember")}
                  </label>
                </div>
                <a href="/reset">{t("login_page.forgot")}</a>
              </div>

              {/* Botón login */}
              <div className="intro-x mt-5 xl:mt-8 text-center xl:text-left">
                <ThemedButton
                  type="submit"
                  disabled={status !== "not-authenticated"}
                  className="w-32 h-12 flex items-center justify-center"
                >
                  {status === "checking" ? <PreloaderButton /> : t("login_page.btn_login")}
                </ThemedButton>
              </div>
            </form>

            {/* Footer términos */}
            <div className="intro-x mt-10 xl:mt-24 text-slate-600 text-center xl:text-left">
              {t("login_page.terms_txt1")}
              <a className="text-primary" href="#">
                {t("login_page.terms_txt2")}
              </a>{" "}
              {t("login_page.terms_txt3")}
              <a className="text-primary" href="#">
                {t("login_page.terms_txt1")}
              </a>
              .
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

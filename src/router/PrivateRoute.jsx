// router/PrivateRoute.jsx
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAllowedPathsByRoles } from '../helpers/helperAllowedPaths.js';

export const PrivateRoute = ({ isAuthenticated }) => {
  // hooks SIEMPRE arriba
  const location = useLocation();
  const { roles } = useSelector((state) => state.auth);

  // 1) auth
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  // 2) autorización por rol
  const allowedPaths = getAllowedPathsByRoles(roles);

  // full access si allowed contiene "/admin"
  const hasFullAccess = allowedPaths.has("/admin");

  // ¿la ruta actual empieza por alguna base permitida?
  const isAllowed =
    hasFullAccess || [...allowedPaths].some(base => location.pathname.startsWith(base));

  if (!isAllowed) {
    // opcional: log rápido
    // console.warn('Bloqueado por rol', { path: location.pathname, allowed: [...allowedPaths] });
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Outlet />;
};

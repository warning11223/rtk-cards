import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "common/hooks/useAppSelector";
import { selectIsAuthorized } from "features/auth/authSelectors";

export const PrivateRoutes = () => {
  const isAuthorized = useAppSelector(selectIsAuthorized);

  return (
    isAuthorized ? <Outlet /> : <Navigate to="/login" />
  );
};

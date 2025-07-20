import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { UserType } from "../../types/user";

type ProtectedRouteProps = {
  user_type: UserType;             
  allowedType: UserType;      
  children: ReactNode;      
};

const ProtectedRoute = ({ user_type, allowedType, children }: ProtectedRouteProps) => {

  if (user_type != allowedType || user_type === null ) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;

import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { UserTypeEnum } from "../../types/user";

type ProtectedRouteProps = {
  user_type: UserTypeEnum;             
  allowedType: UserTypeEnum;      
  children: ReactNode;      
};

const ProtectedRoute = ({ user_type, allowedType, children }: ProtectedRouteProps) => {

  if (user_type != allowedType || user_type === null ) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;

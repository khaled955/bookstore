import {  useSelector } from "react-redux";
import { ProtectedRouteProps, RootState } from "../../Interfaces/Interfaces";
import { Navigate } from "react-router-dom";
export default function ProtectedRoute({children}:ProtectedRouteProps) {
const {token} = useSelector(function(store:RootState){
  return store.userReducer
})









if (token) {
  return children;
} else {
  return <Navigate to="/" />;
}
}



    


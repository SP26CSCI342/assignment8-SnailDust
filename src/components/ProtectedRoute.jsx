import { Navigate, Outlet } from "react-router-dom";
import toast from "react-hot-toast";

// Assignment 7 — ProtectedRoute.
//
// A "layout route" in React Router. Wrap one or more routes inside it like:
//
//   <Route element={<ProtectedRoute />}>
//     <Route path="/profile" element={<Profile />} />
//   </Route>
//
// Routes nested under it render through the <Outlet /> below.
// If the user isn't logged in (no token in localStorage), we redirect
// to /login BEFORE the nested route ever renders — so they never see
// a flash of protected content.
function ProtectedRoute() {
  const token = localStorage.getItem("token");
  if(!token){
    return (
      <Navigate to="/login" replace />
    );
  }else{
    return (
      <Outlet />
    );
  }
}

export default ProtectedRoute;

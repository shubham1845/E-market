import { Navigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import UserContext from "../context/UserContext";

export default function Logout() {
  const { setUser, unsetUser } = useContext(UserContext);

  useEffect(() => {
    // Clear user data and localStorage
    unsetUser();

    // Reset user state
    setUser({
      id: null,
      email: null,
      firstName: null,
      lastName: null,
      mobileNo: null,
      isAdmin: null,
    });

    // Empty dependency array ensures this runs only once when the component is mounted
  }, [unsetUser, setUser]);

  // Redirect back to login
  return <Navigate to="/login" />;
}

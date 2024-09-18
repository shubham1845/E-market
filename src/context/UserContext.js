import React from "react";

// UserContainer is a container that contains data/values, and functions that will be provided to other components by UserProvider
const UserContext = React.createContext();

// UserProvider is a component that provides data/values or function  to other components
export const UserProvider = UserContext.Provider;

export default UserContext;

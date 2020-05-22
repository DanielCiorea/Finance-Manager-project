import Cookie from "js-cookie";

export const setUser = (user) => Cookie.set("user", user, { expires: 365 });
export const getUser = () => Cookie.get("user");

export const setToken = (token) => Cookie.set("token", token, { expires: 365 });
export const getToken = () => Cookie.get("token");

export const deleteUser = () => Cookie.remove("user");
export const deleteToken = () => Cookie.remove("token");

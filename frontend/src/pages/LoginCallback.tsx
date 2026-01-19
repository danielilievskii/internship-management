import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useAuthStore} from "@/store/authStore";
import {UserRole} from "@/types/internship";
import {KEYCLOAK_TOKEN_URL, KEYCLOAK_CLIENT_ID, KEYCLOAK_LOGIN_REDIRECT_URI} from "@/config/auth";

const LoginCallback = () => {
  const navigate = useNavigate();
  const {login} = useAuthStore();

  const getTokenFromCode = async (code: string) => {
    const response = await fetch(KEYCLOAK_TOKEN_URL, {
      method: "POST",
      headers: {"Content-Type": "application/x-www-form-urlencoded"},
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: KEYCLOAK_CLIENT_ID,
        redirect_uri: KEYCLOAK_LOGIN_REDIRECT_URI,
        code,
      }),
    });

    const data = await response.json();

    if (!data.access_token)
      throw new Error("Token exchange failed: " + JSON.stringify(data));

    return data.access_token;
  };

  const parseUserFromToken = (token: string) => {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const roles = payload.realm_access?.roles || [];

    const role =
      roles.includes("student") ? "Student" :
        roles.includes("company") ? "Company" :
          roles.includes("professor") ? "Coordinator" : "Admin";

    return {
      id: payload.sub,
      name: payload.name || payload.preferred_username,
      email: payload.email,
      role: role as UserRole,
    };
  };

  const handleLogin = async (code: string) => {
    const token = await getTokenFromCode(code);
    const user = parseUserFromToken(token);

    login(user);
    localStorage.setItem("auth-token", token);

    navigate(user.role === "Admin" ? "/all-internships" : "/instructions");
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) handleLogin(code);
  }, []);

  return <p>Се најавувате...</p>;
};

export default LoginCallback;

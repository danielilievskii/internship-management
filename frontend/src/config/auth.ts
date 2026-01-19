export const KEYCLOAK_URL = "http://localhost:8001";
export const KEYCLOAK_REALM = "finki-services";
export const KEYCLOAK_CLIENT_ID = "api-gateway";
export const KEYCLOAK_LOGIN_REDIRECT_URI = "http://localhost:3000/callback";

export const KEYCLOAK_AUTH_URL = `${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/auth`;
export const KEYCLOAK_TOKEN_URL = `${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/token`;
export const KEYCLOAK_LOGOUT_URL = `${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/logout`;
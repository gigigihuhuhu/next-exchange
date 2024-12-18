"use client";

import Keycloak from "keycloak-js";
import { createContext, useContext, useState, useEffect } from "react";

type User = {
  name: string;
  email: string;
};

interface AuthContextProps {
  authenticated: boolean | null;
  token: string | null;
  user: User | null;
  keycloak: Keycloak;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [authenticated, setAuth] = useState<boolean | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [keycloak] = useState<Keycloak>(
    new Keycloak({
      url: process.env.NEXT_PUBLIC_KEYCLOAK_URL || "",
      realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM || "",
      clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT || "",
    })
  );

  const init = async () => {
    return keycloak
      .init({
        onLoad: "check-sso",
        silentCheckSsoRedirectUri: `${location.origin}/silent-check-sso.html`,
      })
      .then((authenticated) => {
        console.debug("Keycloak initialized:", authenticated);
        setAuth(authenticated);
        setToken(keycloak.token || "");
        setUser({
          name:
            keycloak.idTokenParsed?.given_name ||
            keycloak.idTokenParsed?.preferred_username,
          email: keycloak.idTokenParsed?.email,
        });
      })
      .catch((error) => {
        console.error("Keycloak initialization failed:", error);
      });
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        user,
        token,
        keycloak,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

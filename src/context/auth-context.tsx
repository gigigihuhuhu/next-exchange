"use client";

import keycloak from "@/utils/keycloak";
import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  useEffect,
} from "react";

type User = {
  name: string;
  email: string;
};

interface AuthContextProps {
  authenticated: boolean | null;
  token: string | null;
  user: User | null;
  login: () => void;
  logout: () => void;
  register: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [authenticated, setAuth] = useState<boolean | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const isRun = useRef<boolean>(false);

  const init = async () => {
    if (isRun.current) return;
    isRun.current = true;
    keycloak
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
            keycloak.idTokenParsed?.name ||
            keycloak.idTokenParsed?.preferred_username,
          email: keycloak.idTokenParsed?.email,
        });
      })
      .catch((error) => {
        console.error("Keycloak initialization failed:", error);
      })
      .finally(() => {
        isRun.current = false;
      });
  };

  const login = useCallback(async () => {
    if (isRun.current) return;
    isRun.current = true;
    keycloak
      .login()
      .catch((error) => {
        console.error("Keycloak login failed:", error);
      })
      .finally(() => {
        isRun.current = false;
      });
  }, []);

  const logout = useCallback(async () => {
    if (isRun.current) return;
    isRun.current = true;
    keycloak
      .logout()
      .catch((error) => {
        console.error("Keycloak logout failed:", error);
      })
      .finally(() => {
        isRun.current = false;
      });
  }, []);

  const register = useCallback(async () => {
    if (isRun.current) return;
    isRun.current = true;
    keycloak
      .register()
      .catch((error) => {
        console.error("Keycloak register failed:", error);
      })
      .finally(() => {
        isRun.current = false;
      });
  }, []);

  useEffect(() => {
    init();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authenticated: authenticated,
        user,
        token,
        login,
        logout,
        register,
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

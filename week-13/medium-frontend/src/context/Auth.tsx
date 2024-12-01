import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  fullname: string;
  email: string;
  id: number;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
  login: (user: User, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
     console.log("hello from context")
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
  });

  const navigate = useNavigate();

  const login = (user: User, token: string) => {
    localStorage.setItem("token", token);
    setAuthState({
      user,
      token,
      isAuthenticated: true,
    });
  
  };

  const logout = () => {
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
    });
    localStorage.removeItem("token");
    navigate("/auth");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      navigate("/auth");
      return;
    }

    fetch("http://localhost:4000/api/v1/user/me", {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid token");
        }
        return response.json();
      })
      .then((data) => {
        setAuthState((prev) => {
            return {
              user:data,
              token:storedToken,
              isAuthenticated:true
            };
          });
      })
      .catch(() => {
        setAuthState((prev) => {
            return {
              user: null,
              token: null,
              isAuthenticated: false,
            };
          });
          
        localStorage.removeItem("token");
        navigate("/auth");
      });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};



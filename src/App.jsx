import React, { useState } from "react";
import {
  Outlet,
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import ErrorPage from "./error-page";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { TokenProvider } from "./useTokenStore";
import "./App.css";

export const TokenContext = React.createContext({});

function Root() {
  const { token, setToken } = useState("");

  return (
    <div>
      <TokenProvider>
        <TokenContext.Provider value={{ token, setToken }}>
          <Outlet />
        </TokenContext.Provider>
      </TokenProvider>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

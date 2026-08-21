import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./common/Layout";
import Dahsboard from "./pages/Dahsboard";
import Budget from "./pages/Budget";
import CreateBudget from "./pages/CreateBudget";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Dahsboard />,
        },
        {
          path: "/budget",
          element: <Budget />,
        },
        {
          path: "/create-budget",
          element: <CreateBudget />,
        },
        {
          path: "/signin",
          element: <Signin />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
      ],
    },
  ]);

  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;

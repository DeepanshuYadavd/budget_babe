import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./common/Layout";
import Dahsboard from "./pages/Dahsboard";
import Budget from "./pages/Budget";
import CreateBudget from "./pages/CreateBudget";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";

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
      <RouterProvider router={router} />
    </>
  );
}

export default App;

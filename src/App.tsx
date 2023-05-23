import React from "react";

import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ShowData from "./components/ShowData";
import ExpenseTracker from "./components/ExpenseTracker";

function App() {
  const routers = createBrowserRouter([
    {
      path: "/",
      element: <ExpenseTracker onClose={() => {}} />,
    },
    { path: "/home", element: <ShowData /> },
  ]);

  return <RouterProvider router={routers}></RouterProvider>;
}

export default App;

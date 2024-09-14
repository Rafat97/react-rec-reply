import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import * as rrweb from "rrweb";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Recording from "./module/Recording.jsx";
import { Outlet, Link } from "react-router-dom";
import Root from "./root.jsx";
import RecordingPlay from "./module/RecordingPlay.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <>Error</>,
    children: [
      {
        path: "/",
        element: <Recording />,
      },
      {
        path: "/rec",
        element: <RecordingPlay />,
      },
    ],
  },
]);
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Recording />,
//   },
//   {
//     path: "/play",
//     element: <Recording />,
//   },
// ]);

// rrweb.record({
//   recordCanvas: true,
//   emit(event, isCheckout) {
//     // store the event in any way you like
//     console.log("rrweb", event, isCheckout);
//   },
// });

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Loading from "../components/common/loading/Loading";
import RouteError from "../pages/RouteError";
const Home = lazy(() => import("../pages/Home"));
const Policies = lazy(() => import("../pages/Policies"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Main = lazy(() => import("../layouts/Main"));

export const router = createBrowserRouter(
  [
    {
      path: `/`,
      element: (
        <Suspense fallback={<Loading />}>
          <Main />
        </Suspense>
      ),
      errorElement: <RouteError />,
      children: [
        {
          path: "/",
          element: <Home></Home>,
        },
        {
          path: "policies",
          element: <Policies />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL.replace(/\/$/, "") }
);

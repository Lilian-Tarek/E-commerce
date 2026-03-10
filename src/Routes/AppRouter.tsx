import React, { Suspense } from 'react'
import { lazy } from 'react';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
const MainLayout = lazy(() => import("@layout/MainLayout"));
const ProfileLayout = lazy(() => import("@layout/ProfileLayout"));
import SandyLoading from '../Assets/SandyLoading.json'
const Home = lazy(() => import("@pages/Home"));
const About = lazy(() => import("@pages/About"));
const Register = lazy(() => import("@pages/Register"));
const Categories = lazy(() => import("@pages/Categories"));
const  Products= lazy(() => import("@pages/Products"));
const Login = lazy(() => import("@pages/Login"));
const Orders = lazy(() => import("@pages/Orders"));
import Error from '@pages/Error';
const  Cart= lazy(() => import("@pages/Cart"));
const WishListPage = lazy(() => import("@pages/WishListPage"));
const ProfilePage = lazy(() => import("@pages/Profile"));
import Lottie from "lottie-react"; 
import SuspenseHandler from '@components/feedback/SuspenseHandler';
import ProtectedRoute from '@components/auth/ProtectedRoute';
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <SuspenseHandler>
        <MainLayout />
      </SuspenseHandler>
    ),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: (
          <SuspenseHandler>
            <Home />
          </SuspenseHandler>
        )
      },
      {
        path: "/categories",
        element: (
          <SuspenseHandler>
            <Categories />
          </SuspenseHandler>
        )
      },
      {
        path: "categories/products/:prefix",
        element: (
          <SuspenseHandler>
            <Products />
          </SuspenseHandler>
        ),
        loader: ({ params }) => {
          if (
            typeof params.prefix !== "string" ||
            !/^[a-z]+$/i.test(params.prefix)
          ) {
            throw new Response("Bad Request", {
              statusText: "Category not found",
              status: 400
            });
          }
          return true;
        }
      },
      {
        path: "/about",
        element: (
          <SuspenseHandler>
            <About />
          </SuspenseHandler>
        )
      },
      {
        path: "/login",
        element: (
          <SuspenseHandler>
            <Login />
          </SuspenseHandler>
        )
      },
      {
        path: "/register",
        element: (
          <SuspenseHandler>
            <Register />
          </SuspenseHandler>
        )
      },
      {
        path: "/cart",
        element: (
          <SuspenseHandler>
            <Cart />
          </SuspenseHandler>
        )
      },
      {
        path: "/wishlist",
        element: (
          <ProtectedRoute>
            <SuspenseHandler>
              <WishListPage />
            </SuspenseHandler>
          </ProtectedRoute>
        )
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <SuspenseHandler>
              <ProfileLayout />
            </SuspenseHandler>
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: (
              <SuspenseHandler>
                <ProfilePage />
              </SuspenseHandler>
            )
          },
          {
            path:"orders",
            element: (
              <SuspenseHandler>
                <Orders />
              </SuspenseHandler>
            )
          }
        ]
      }
    ]
  }
]);
const AppRouter = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default AppRouter

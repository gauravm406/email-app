import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { APP_ENDPOINTS } from "../constants/AppEndpoints";
import RootLayout from "../layouts/RootLayout/RootLayout";
import EmailBody from "../pages/EmailBody/EmailBody";
import { EmailsProvider } from "../providers/EmailsProvider";

const wrapProviders = (children: React.ReactNode): JSX.Element => {
  return <EmailsProvider>{children}</EmailsProvider>;
};

const router = createBrowserRouter([
  {
    path: APP_ENDPOINTS.ROOT,
    element: wrapProviders(<RootLayout />),
    children: [
      {
        path: `${APP_ENDPOINTS.EMAIL_BODY}/:emailId`,
        element: <EmailBody />,
      },
    ],
  },
]);

export const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

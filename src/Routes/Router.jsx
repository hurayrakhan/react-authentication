import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Login from "../Pages/Login/LoginPage";
import HomePage from "../Pages/Home/HomePage";
import { PrivateRoute } from "./PrivateRouter";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        children: [
            {
                index: true,
                element: <PrivateRoute><HomePage></HomePage></PrivateRoute>
            }
        ]
    },
    {
        path: '/login',
        element: <Login></Login>
    }
])

export default router



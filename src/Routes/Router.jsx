import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Login from "../Pages/Login/LoginPage";
import HomePage from "../Pages/Home/HomePage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        children: [
            {
                path: '/',
                element: <HomePage></HomePage>
            }
        ]
    },
    {
        path: '/login',
        element: <Login></Login>
    }
])

export default router



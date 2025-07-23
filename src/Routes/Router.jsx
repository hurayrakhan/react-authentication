import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Login from "../Pages/Login/LoginPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>
    },
    {
        path: '/login',
        element: <Login></Login>
    }
])

export default router



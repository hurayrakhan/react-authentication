import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>
    }
])

export default router



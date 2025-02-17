import { createBrowserRouter } from "react-router"
import App from "../layout/App"
import HomePage from "../../features/home/HomePage";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetailedPage from "../../features/activities/details/ActivityDetailedPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '', element: <HomePage /> },
            { path: 'activities', element: <ActivityDashboard /> },
            { path: 'activities/:id', element: <ActivityDetailedPage /> },
            { path: 'createActivity', element: <ActivityForm key="create" /> },
            { path: 'manage/:id', element: <ActivityForm key="manage" /> }
        ]
    }, 
]);

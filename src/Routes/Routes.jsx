import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Root from '../Layout/Root'
import Assignment from '../Pages/Assignment/Assignment'
import PendingAssignments from '../Pages/PendingAssignments/PendingAssignments'
import CreateAssignment from '../Pages/CreateAssignment/CreateAssignment'
import MyAttemptedAssignment from '../Pages/MyAttemptedAssignment/MyAttemptedAssignment'
import Login from '../Pages/Login/Login'
import Register from '../Pages/Register/Register'

const Routes = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: '/assignments',
                element: <Assignment />
            },
            {
                path: "/pending-assignments",
                element: <PendingAssignments />
            },
            {
                path: "/create-assignment",
                element: <CreateAssignment />
            },
            {
                path: "/attempted-assignments",
                element: <MyAttemptedAssignment />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            }
        ]
    }
])
export default Routes
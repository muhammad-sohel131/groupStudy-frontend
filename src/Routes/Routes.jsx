import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Root from '../Layout/Root'
import Assignment from '../Pages/Assignment/Assignment'
import PendingAssignments from '../Pages/PendingAssignments/PendingAssignments'
import CreateAssignment from '../Pages/CreateAssignment/CreateAssignment'
import MyAttemptedAssignment from '../Pages/MyAttemptedAssignment/MyAttemptedAssignment'
import Login from '../Pages/Login/Login'
import Register from '../Pages/Register/Register'
import PrivateRoute from './PrivateRoute'
import AssignmentDetails from '../Pages/AssignmentDetails/AssignmentDetails'
import UpdateAssignment from '../Pages/UpdateAssignment/UpdateAssignment'

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
                path: '/assignments/:id',
                element: <PrivateRoute><AssignmentDetails /></PrivateRoute>
            },
            {
                path: '/update-assignment/:id',
                element: <PrivateRoute><UpdateAssignment /></PrivateRoute>
            },
            {
                path: "/pending-assignments",
                element: <PrivateRoute><PendingAssignments /></PrivateRoute>
            },
            {
                path: "/create-assignment",
                element: <PrivateRoute><CreateAssignment /></PrivateRoute>
            },
            {
                path: "/attempted-assignments",
                element: <PrivateRoute><MyAttemptedAssignment /></PrivateRoute>
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
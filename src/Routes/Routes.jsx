import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Root from '../Layout/Root'
import Assignment from '../Pages/Assignment/Assignment'
import PendingAssignments from '../Pages/PendingAssignments/PendingAssignments'
import CreateAssignment from '../Pages/CreateAssignment/CreateAssignment'
import MyAttemptedAssignment from '../Pages/MyAttemptedAssignment/MyAttemptedAssignment'

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
            }
        ]
    }
])
export default Routes
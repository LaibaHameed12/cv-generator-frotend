import ProtectedRoute from '@/components/common/ProtectedRoute'
import ResumeDashboard from '@/components/Dashboard/ResumeDashBoard'
import React from 'react'

const dashboard = () => {
    return (
        <ProtectedRoute authRequired={true}>
            <ResumeDashboard />
        </ProtectedRoute>
    )
}

export default dashboard
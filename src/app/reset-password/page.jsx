import ProtectedRoute from '@/components/common/ProtectedRoute'
import ResetPasswordForm from '@/components/Forms/ResetPassForm'
import React from 'react'

const ResetPassword = () => {
    return (
        <ProtectedRoute authRequired={false}>
            <ResetPasswordForm />
        </ProtectedRoute>
    )
}

export default ResetPassword
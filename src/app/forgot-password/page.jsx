import ProtectedRoute from '@/components/common/ProtectedRoute'
import ForgotPasswordForm from '@/components/Forms/ForgotPassForm'
import React from 'react'

const ForgotPassword = () => {
    return (
        <ProtectedRoute authRequired={false}>
            <ForgotPasswordForm />
        </ProtectedRoute>
    )
}

export default ForgotPassword
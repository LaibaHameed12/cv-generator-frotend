import ProtectedRoute from '@/components/common/ProtectedRoute'
import LoginForm from '@/components/Forms/LoginForm'
import React from 'react'

const Login = () => {
    return (
        <ProtectedRoute authRequired={false}>
            <LoginForm />
        </ProtectedRoute>
    )
}

export default Login
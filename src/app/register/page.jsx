import ProtectedRoute from '@/components/common/ProtectedRoute'
import RegisterForm from '@/components/Forms/RegisterForm'
import React from 'react'

const Register = () => {
  return (
    <ProtectedRoute authRequired={false}>
        <RegisterForm/>
    </ProtectedRoute>
  )
}

export default Register
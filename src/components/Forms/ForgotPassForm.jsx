'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import { useForgotPasswordMutation } from '@/redux/slices/auth/authApi';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

const schema = yup.object().shape({
    email: yup.string().email('Invalid email address').required('Email is required'),
});

export default function ForgotPasswordForm() {
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
    const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

    const onSubmit = async (data) => {
        try {
            await forgotPassword({ email: data.email }).unwrap();
            toast.success('Password reset link has been sent to your email');
        } catch (err) {
            console.error(err);
            toast.error(err?.data?.message || 'Failed to send reset email');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
            <div className="w-full max-w-md p-8 border border-gray-700 rounded" onSubmit={handleSubmit(onSubmit)}>
                <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>

                <p className="text-center text-gray-400 mb-6 text-sm">
                    Enter your email address and we'll send you a link to reset your password.
                </p>

                <div className="mb-4">
                    <label className="block mb-2">Email Address</label>
                    <input
                        type="email"
                        {...register('email')}
                        placeholder='johnDoe@example.com'
                        className="w-full p-2 border border-gray-600 bg-gray-800 text-white rounded focus:border-blue-500 focus:outline-none mt-1"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                <button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 mt-4 rounded cursor-pointer flex items-center justify-center transition-colors"
                    disabled={isLoading}
                    type="submit"
                    onClick={handleSubmit(onSubmit)}
                >
                    {isLoading ? <Loader2 className='animate-spin' /> : "Send Reset Link"}
                </button>

                <p className="mt-4 text-center">
                    Remember your password? <Link href="/login" className="underline cursor-pointer text-blue-400 hover:text-blue-300">Back to Login</Link>
                </p>

                <p className="mt-2 text-center">
                    Don't have an account? <Link href="/register" className="underline cursor-pointer text-blue-400 hover:text-blue-300">Sign up</Link>
                </p>
            </div>
        </div>
    );
}
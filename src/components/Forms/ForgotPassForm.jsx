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
    const router = useRouter();
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
        <div className="min-h-screen flex items-center justify-center bg-white text-black">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md p-8 border border-black/10 rounded">
                <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>

                <p className="text-center text-gray-600 mb-6 text-sm">
                    Enter your email address and we'll send you a link to reset your password.
                </p>

                <div className="mb-4">
                    <label>Email Address</label>
                    <input
                        type="email"
                        {...register('email')}
                        placeholder='johnDoe@example.com'
                        className="w-full p-2 border border-black/20 rounded mt-1"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                <button
                    className="w-full bg-black text-white py-2 mt-4 rounded cursor-pointer flex items-center justify-center"
                    disabled={isLoading}
                    type="submit"
                >
                    {isLoading ? <Loader2 className='animate-spin' /> : "Send Reset Link"}
                </button>

                <p className="mt-4 text-center">
                    Remember your password? <Link href="/login" className="underline cursor-pointer">Back to Login</Link>
                </p>

                <p className="mt-2 text-center">
                    Don't have an account? <Link href="/register" className="underline cursor-pointer">Sign up</Link>
                </p>
            </form>
        </div>
    );
}
'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter, useSearchParams } from 'next/navigation';
import { useResetPasswordMutation } from '@/redux/slices/auth/authApi';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const schema = yup.object().shape({
    password: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .matches(
            /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}\[\]:;"'<>,.?/\\|`~])/,
            "Password must include at least one uppercase letter, one number, and one special character"
        )
        .required("Password is required"),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
});

export default function ResetPasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
    const [resetPassword, { isLoading }] = useResetPasswordMutation();

    const onSubmit = async (data) => {
        try {
            await resetPassword({ token, newPassword: data.password }).unwrap();
            toast.success('Password reset successfully');
            router.push('/login');
        } catch (err) {
            console.error(err);
            toast.error(err?.data?.message || 'Password reset failed');
        }
    };

    if (!token) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white text-black">
                <div className="w-full max-w-md p-8 border border-black/10 rounded text-center">
                    <h2 className="text-2xl font-bold mb-4">Invalid Reset Link</h2>
                    <p className="text-gray-600 mb-4">This password reset link is invalid or has expired.</p>
                    <button
                        onClick={() => router.push('/forgot-password')}
                        className="underline"
                    >
                        Request a new reset link
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-white text-black">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md p-8 border border-black/10 rounded">
                <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>

                <div className="mb-4">
                    <label>New Password</label>
                    <input
                        type="password"
                        {...register('password')}
                        placeholder='Enter new password'
                        className="w-full p-2 border border-black/20 rounded mt-1"
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>

                <div className="mb-4">
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        {...register('confirmPassword')}
                        placeholder='Confirm new password'
                        className="w-full p-2 border border-black/20 rounded mt-1"
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                </div>

                <button className="w-full bg-black text-white py-2 mt-4 rounded cursor-pointer flex items-center justify-center" disabled={isLoading} type="submit">
                    {isLoading ? <Loader2 className='animate-spin' /> : "Reset Password"}
                </button>

                <p className="mt-4 text-center">
                    Remember your password? <button
                        type="button"
                        onClick={() => router.push('/login')}
                        className="underline cursor-pointer"
                    >
                        Back to Login
                    </button>
                </p>
            </form>
        </div>
    );
}
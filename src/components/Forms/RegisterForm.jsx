'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRegisterMutation } from '@/redux/slices/auth/authApi';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const schema = yup.object().shape({
    name: yup
        .string()
        .required("Name is required"),

    email: yup
        .string()
        .email("Invalid email")
        .required("Email is required")
        .lowercase(),

    password: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .matches(
            /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}\[\]:;"'<>,.?/\\|`~])/,
            "Password must include at least one uppercase letter, one number, and one special character"
        )
        .required("Password is required"),
});

export default function RegisterForm() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
    const [registerUser, { isLoading }] = useRegisterMutation();

    const onSubmit = async (data) => {
        try {
            await registerUser({
                fullName: data.name,
                email: data.email,
                password: data.password,
            }).unwrap();
            toast.success('Registration successful! Please check your email to verify your account.');
            router.push(`/verify?email=${encodeURIComponent(data.email)}`);
        } catch (err) {
            console.error(err);
            toast.error(err?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
            <div className="w-full max-w-md p-8 border border-gray-700 rounded" onSubmit={handleSubmit(onSubmit)}>
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

                <div className="mb-4">
                    <label className="block mb-2">Name</label>
                    <input
                        placeholder='john Doe'
                        {...register('name')}
                        className="w-full p-2 border border-gray-600 bg-gray-800 text-white rounded focus:border-blue-500 focus:outline-none mt-1"
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>

                <div className="mb-4">
                    <label className="block mb-2">Email</label>
                    <input
                        placeholder='johnDoe@example.com'
                        {...register('email')}
                        className="w-full p-2 border border-gray-600 bg-gray-800 text-white rounded focus:border-blue-500 focus:outline-none mt-1"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                <div className="mb-4">
                    <label className="block mb-2">Password</label>
                    <input
                        placeholder='Enter Password'
                        type="password"
                        {...register('password')}
                        className="w-full p-2 border border-gray-600 bg-gray-800 text-white rounded focus:border-blue-500 focus:outline-none mt-1"
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>

                <button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 mt-4 rounded cursor-pointer flex items-center justify-center transition-colors"
                    type="submit"
                    disabled={isLoading}
                    onClick={handleSubmit(onSubmit)}
                >
                    {isLoading ? <Loader2 className='animate-spin' /> : "Register"}
                </button>

                <p className="my-4 text-center">
                    Already have an account? <Link href="/login" className="underline text-blue-400 hover:text-blue-300">Login</Link>
                </p>

                <button
                    type="button"
                    className="w-full cursor-pointer bg-gray-800 border-2 border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white py-3 mt-4 rounded-lg flex items-center justify-center gap-3 transition-all duration-200 hover:shadow-lg font-medium"
                    onClick={() => {
                        window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
                    }}
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Continue with Google
                </button>
            </div>
        </div>
    );
}
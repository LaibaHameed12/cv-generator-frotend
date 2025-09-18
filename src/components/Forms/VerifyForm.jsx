'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter, useSearchParams } from 'next/navigation';
import { useResendOtpMutation, useVerifyOtpMutation } from '@/redux/slices/auth/authApi';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const schema = yup.object().shape({
    code: yup.string().length(6, 'Verification code must be 6 digits').required('Code is required'),
});

export default function VerifyForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get('email');
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
    const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
    const [resendOtp] = useResendOtpMutation();

    const onSubmit = async (data) => {
        try {
            await verifyOtp({ email, otp: data.code }).unwrap();
            toast.success('Account verified successfully');
            router.push('/login');
        } catch (err) {
            console.error(err);
            toast.error(err?.data?.message || 'Verification failed');
        }
    };

    const handleResend = async () => {
        try {
            await resendOtp({ email }).unwrap();
            toast.success('OTP resent');
        } catch (err) {
            console.error(err);
            toast.error(err?.data?.message || 'Failed to resend OTP');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
            <div className="w-full max-w-md p-8 border border-gray-700 rounded" onSubmit={handleSubmit(onSubmit)}>
                <h2 className="text-2xl font-bold mb-6 text-center">Verify Account</h2>

                <div className="mb-4">
                    <label className="block mb-2">Verification Code</label>
                    <input
                        {...register('code')}
                        placeholder='Enter 6 digit code'
                        className="w-full p-2 border border-gray-600 bg-gray-800 text-white rounded focus:border-blue-500 focus:outline-none mt-1"
                    />
                    {errors.code && <p className="text-red-500 text-sm">{errors.code.message}</p>}
                </div>

                <button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 mt-4 rounded cursor-pointer flex items-center justify-center transition-colors"
                    disabled={isLoading}
                    type="submit"
                    onClick={handleSubmit(onSubmit)}
                >
                    {isLoading ? <Loader2 className='animate-spin' /> : "Verify"}
                </button>

                <p className="mt-4 text-center flex items-center justify-center gap-2">
                    Didn't receive code? <button
                        type="button"
                        onClick={handleResend}
                        className="cursor-pointer underline ml-1 text-blue-400 hover:text-blue-300"
                    >
                        Resend
                    </button>
                </p>
            </div>
        </div>
    );
}
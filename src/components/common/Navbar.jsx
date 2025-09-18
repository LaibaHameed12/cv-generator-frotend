import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { isLoggedIn, getUser, logout } from '@/redux/slices/auth/authSlice';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const authenticated = useSelector(isLoggedIn);
    const user = useSelector(getUser);

    const handleLogout = () => {
        dispatch(logout());
        router.push('/login');
    };

    return (
        <div className="">
            <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-gray-900 text-white">
                <div className="flex items-center space-x-4">
                    <Link href={'/'} className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold text-sm">
                            Rx
                        </div>
                        <h1 className="text-2xl font-bold">Resumes</h1>
                    </Link>
                </div>

                <div className="flex items-center space-x-4">
                    {authenticated ? (
                        <>
                            <span className="font-medium">Hey, {user?.fullName || 'User'}</span>
                            <button
                                onClick={handleLogout}
                                className="cursor-pointer bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link
                            href="/login"
                            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;

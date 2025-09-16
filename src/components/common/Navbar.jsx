import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    return (
        <div className=''>
            <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-gray-900 text-white">
                <div className="flex items-center space-x-4">
                    <Link href={'/'} className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold text-sm">
                            Rx
                        </div>
                        <h1 className="text-2xl font-bold">Resumes</h1>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar
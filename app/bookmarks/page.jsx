"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

const BookmarkManagerPage = () => {
    const [bookmarkedEmployees, setBookmarkedEmployees] = useState([]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const bookmarks = JSON.parse(localStorage.getItem('bookmarkedEmployees') || '[]');
            setBookmarkedEmployees(bookmarks);
        }
    }, []);

    const handleRemoveBookmark = (employeeId) => {
        if (typeof window === 'undefined') return;

        const updatedBookmarks = bookmarkedEmployees.filter(emp => emp.id !== employeeId);
        setBookmarkedEmployees(updatedBookmarks);
        localStorage.setItem('bookmarkedEmployees', JSON.stringify(updatedBookmarks));
        toast.success('Employee removed from bookmarks!');
    };

    const handlePromoteAction = (employeeName) => {
        toast.success(`Promote action triggered for ${employeeName}!`);
    };

    const handleAssignProjectAction = (employeeName) => {
        toast.success(`Assign to Project action triggered for ${employeeName}!`);
    };

    return (
        <section className="container mx-auto p-4 max-w-4xl mt-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
            <Link href="/" className="inline-flex items-center text-blue-600 hover:underline mb-6 dark:text-blue-400">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                Back to Dashboard
            </Link>

            <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
                Bookmarked Employees
            </h1>

            {bookmarkedEmployees.length === 0 ? (
                <p className="text-center text-gray-600 dark:text-gray-400 py-8">
                    You haven't bookmarked any employees yet.
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {bookmarkedEmployees.map(employee => (
                        <div key={employee.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-700 shadow-sm">
                            <div className="flex items-center gap-4 mb-3">
                                {employee.image && (
                                    <img
                                        src={employee.image}
                                        alt={`${employee.firstName} ${employee.lastName}`}
                                        className="w-16 h-16 rounded-full object-cover border-2 border-blue-400"
                                    />
                                )}
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        {employee.firstName} {employee.lastName}
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-400">{employee.company?.department || 'N/A'}</p>
                                </div>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">Email: {employee.email}</p>

                            <div className="flex flex-wrap gap-2">
                                <Link
                                    href={`/employee/${employee.id}`}
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    View Profile
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveBookmark(employee.id)}
                                    className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-400"
                                >
                                    Remove
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handlePromoteAction(employee.firstName)}
                                    className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-4 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                >
                                    Promote
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleAssignProjectAction(employee.firstName)}
                                    className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-4 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                >
                                    Assign to Project
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default BookmarkManagerPage;
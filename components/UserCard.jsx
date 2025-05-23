"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from 'react-hot-toast';

const UserCard = ({ user }) => {
    const displayRating = Math.floor((user.id % 5) + 1);

    const [isBookmarked, setIsBookmarked] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') { 
            const bookmarks = JSON.parse(localStorage.getItem('bookmarkedEmployees') || '[]');
            setIsBookmarked(bookmarks.some(bUser => bUser.id === user.id));
        }
    }, [user.id]);

    const handleBookmarkToggle = () => {
        if (typeof window === 'undefined') return;

        let bookmarks = JSON.parse(localStorage.getItem('bookmarkedEmployees') || '[]');
        if (isBookmarked) {
            bookmarks = bookmarks.filter(bUser => bUser.id !== user.id);
            toast.success(`${user.firstName} removed from bookmarks!`);
        } else {
            bookmarks.push({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                image: user.image,
                department: user.company?.department,
            });
            toast.success(`${user.firstName} added to bookmarks!`);
        }
        localStorage.setItem('bookmarkedEmployees', JSON.stringify(bookmarks));
        setIsBookmarked(!isBookmarked);
    };

    const handlePromote = () => {
        toast.success(`Promote action triggered for ${user.firstName}!`);
    };

    return (
        <div className="border border-gray-200 rounded-lg shadow-md p-6 bg-white dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center gap-4 mb-4">
                {user.image && (
                    <img
                        src={user.image}
                        alt={`${user.firstName} ${user.lastName}`}
                        className="w-16 h-16 rounded-full object-cover border-2 border-blue-400"
                    />
                )}
                <div className="flex-1">
                    <div className="text-xl font-bold text-gray-900 dark:text-white">
                        {user.firstName} {user.lastName}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">@{user.username}</div>
                </div>
            </div>

            <div className="space-y-1 text-gray-700 dark:text-gray-300">
                <div>Email: {user.email}</div>
                <div>Age: {user.age}</div>
                <div>
                    Department: {user.company?.department || 'N/A'}
                </div>
                <div>
                    Rating:
                    <span className="text-yellow-400 text-lg ml-2">
                        {'⭐'.repeat(displayRating)}
                    </span>
                </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
                <Link
                    href={`/employee/${user.id}`}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    View
                </Link>
                <button
                    type="button"
                    onClick={handleBookmarkToggle}
                    className={`font-medium rounded-lg text-sm px-4 py-2 ${
                        isBookmarked
                            ? 'bg-red-500 text-white hover:bg-red-600'
                            : 'text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700'
                    } focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700`}
                >
                    {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                </button>
                <button
                    type="button"
                    onClick={handlePromote}
                    className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-4 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                >
                    Promote
                </button>
            </div>
        </div>
    );
};

export default UserCard;
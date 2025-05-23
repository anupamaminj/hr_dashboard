"use client";

import { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import UserCard from './UserCard';
import MultiSelectDropdown from './MultiSelectDropdown';
import UserTabs from './UserTabs';


const UserCardList = ({ data }) => {
    if (data.length === 0) {
        return <p className="text-center text-gray-500 dark:text-gray-400 mt-8">No users found matching your criteria.</p>;
    }
    return (
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.map((user) => (
                <UserCard
                    key={user.id}
                    user={user}
                />
            ))}
        </div>
    );
};

const Feed = () => {
    const [ allusers, setallusers ] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedDepartments, setSelectedDepartments] = useState([]);
    const [selectedRatings, setSelectedRatings] = useState([]);
    const [showUserTabs, setShowUserTabs] = useState(false);
    
    const INITIAL_DISPLAY_LIMIT = 3;

    const departmentOptions = useMemo(() => {
        const departments = new Set();
        allusers.forEach(user => {
            if (user.company && user.company.department) {
                departments.add(user.company.department);
            }
        });
        return Array.from(departments).sort().map(dept => ({value: dept, label:dept}));
    }, [allusers]);

    const ratingOptions = useMemo(() => {
        return [
            { value: 1, label: '⭐' },
            { value: 2, label: '⭐⭐' },
            { value: 3, label: '⭐⭐⭐' },
            { value: 4, label: '⭐⭐⭐⭐' },
            { value: 5, label: '⭐⭐⭐⭐⭐' },
        ];
    }, []);

    const filterUsers = useCallback(() => {
        let results = [...allusers];


        if (searchText) {
            const lowercasedSearchText = searchText.toLowerCase();
            results = results.filter(user =>
                user.firstName.toLowerCase().includes(lowercasedSearchText) ||
                user.lastName.toLowerCase().includes(lowercasedSearchText) ||
                user.email.toLowerCase().includes(lowercasedSearchText) ||
                user.company?.department?.toLowerCase().includes(lowercasedSearchText)
            );
        }

        if (selectedDepartments.length > 0) {
            results = results.filter(user =>
                selectedDepartments.includes(user.company?.department)
            );
        }

        if (selectedRatings.length > 0) {
            results = results.filter(user => {
                const stableRating = Math.floor((user.id % 5) + 1);
                return selectedRatings.includes(stableRating);
            });
        }

        setFilteredUsers(results);
    }, [allusers, searchText, selectedDepartments, selectedRatings, INITIAL_DISPLAY_LIMIT]);


   useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("https://dummyjson.com/users?limit=20");
                if (!response.ok) {
                    throw new Error('HTTP error! status: ${response.status}');
                }
                const data = await response.json();
                const users = data.users;
                setallusers(users);
            } catch (error) {
                console.error("Failed to fetch users:", error);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        clearTimeout(searchTimeout);
        const timeoutId = setTimeout(() => {
            filterUsers();
        }, 300);
        setSearchTimeout(timeoutId);

        return () => clearTimeout(timeoutId);
    }, [searchText, selectedDepartments, selectedRatings, filterUsers]);
    
    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleDepartmentChange = (selectedOptions) => {
        setSelectedDepartments(selectedOptions);
    };

    const handleRatingChange = (selectedOptions) => {
        setSelectedRatings(selectedOptions.map(Number));
    };

    return (
        <section className="feed flex flex-col items-center p-4">
            <div className="w-full max-w-4xl border border-gray-300 dark:border-gray-700 rounded-lg p-6 mb-8 bg-white dark:bg-gray-800 shadow-md">
                <div className="mb-6">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search by name, email, or department..."
                            value={searchText}
                            onChange={handleSearchChange}
                            className="block w-full p-3 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pl-10"
                        />
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-1/2">
                        <MultiSelectDropdown
                            options={departmentOptions}
                            selectedOptions={selectedDepartments}
                            onChange={handleDepartmentChange}
                            placeholder="Filter by Department"
                            className="w-full"
                        />
                        <MultiSelectDropdown
                            options={ratingOptions}
                            selectedOptions={selectedRatings}
                            onChange={handleRatingChange}
                            placeholder="Filter by Rating"
                            className="w-full"
                        />
                    </div>
                    <div className="flex gap-4 flex-wrap justify-center sm:justify-end w-full sm:w-auto">
                        <Link
                            href="/bookmarks"
                            className="flex-shrink-0 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                        >
                            Bookmark Manager
                        </Link>
                        <Link
                            href="/analytics"
                            className="flex-shrink-0 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                        >
                            Analytics Dashboard
                        </Link>

                        <button
                            onClick={() => setShowUserTabs(!showUserTabs)}
                            className="flex-shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                        >
                            {showUserTabs ? 'Hide Tabs' : 'Show More Info'}
                        </button>
                    </div>
                </div>
                {showUserTabs && <UserTabs />}
            </div>

            <UserCardList data={filteredUsers} />
        </section>
    );
}

export default Feed;
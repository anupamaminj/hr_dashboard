"use client";

import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const getConsistentRating = (id) => {
    return Math.floor(id % 5) + 1;
};

const getRatingBadgeColor = (rating) => {
    if (rating === 5) return 'bg-green-500 text-white';
    if (rating === 4) return 'bg-blue-500 text-white';
    if (rating === 3) return 'bg-yellow-500 text-white';
    if (rating === 2) return 'bg-orange-500 text-white';
    if (rating === 1) return 'bg-red-500 text-white';
    return 'bg-gray-400 text-white';
};

const mockBios = [
    "A dedicated and highly motivated team player with a strong passion for innovation and continuous improvement. Always seeking new challenges to contribute to team success.",
    "Experienced professional known for excellent problem-solving skills and a methodical approach to complex tasks. Consistently delivers high-quality results under pressure.",
    "Enthusiastic and creative individual with a keen eye for detail. Thrives in collaborative environments and is committed to fostering positive working relationships.",
    "Strategic thinker with a proven track record of optimizing workflows and enhancing efficiency. Possesses strong analytical capabilities and leadership potential.",
    "A versatile and adaptable individual, eager to learn new technologies and methodologies. Believes in open communication and proactive engagement in all projects."
];


const generatePerformanceHistory = (userId) => {
    const history = [];
    const numEntries = Math.floor((userId * 3 + 5) % 4) + 2;

    for (let i = 0; i < numEntries; i++) {
        const year = 2025 - i;
        const quarter = Math.floor(Math.random() * 4) + 1;
        const areas = ["Achieved targets", "Improved efficiency", "Collaborated well", "Developed new skills", "Exceeded expectations"];
        const randomArea = areas[Math.floor(Math.random() * areas.length)];
        const comments = [
            "Consistently met and exceeded quarterly goals.",
            "Showed initiative in resolving critical issues.",
            "Effective communication and teamwork.",
            "Identified and implemented process improvements.",
            "Areas for development include public speaking.",
            "Strong contribution to team projects.",
            "Demonstrated exceptional problem-solving abilities."
        ];
        const randomComment = comments[Math.floor(Math.random() * comments.length)];
        const rating = getConsistentRating(userId + i * 10);

        history.push({
            id: i,
            period: `Q${quarter} ${year}`,
            summary: `${randomArea}. ${randomComment}`,
            rating: rating,
        });
    }
    return history;
};


const EmployeeDetailPage = () => {
    const params = useParams();
    const employeeId = params.id;

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const performanceHistory = useMemo(() => generatePerformanceHistory(employeeId), [employeeId]);
    const userBio = useMemo(() => mockBios[Math.floor((employeeId * 17) % mockBios.length)], [employeeId]);
    const userRating = useMemo(() => getConsistentRating(employeeId), [employeeId]);


    useEffect(() => {
        if (!employeeId) return;

        const fetchUser = async () => {
            try {
                const response = await fetch(`https://dummyjson.com/users/${employeeId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setUser(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [employeeId]);

    if (loading) return <p className="text-center mt-8 text-gray-600 dark:text-gray-400">Loading employee details...</p>;
    if (error) return <p className="text-center mt-8 text-red-500">Error: {error}</p>;
    if (!user) return <p className="text-center mt-8 text-gray-600 dark:text-gray-400">Employee not found.</p>;

    return (
        <section className="container mx-auto p-4 max-w-4xl mt-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
            <Link href="/" className="inline-flex items-center text-blue-600 hover:underline mb-6 dark:text-blue-400">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                Back to Dashboard
            </Link>

            <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
                {user.firstName} {user.lastName}'s Detailed Profile
            </h1>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8 p-6 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md">
                {user.image && (
                    <img
                        src={user.image}
                        alt={`${user.firstName} ${user.lastName}`}
                        className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 dark:border-blue-400 flex-shrink-0"
                    />
                )}
                <div className="flex-1 text-center md:text-left">
                    <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">{user.firstName} {user.lastName}</h2>
                    <p className="text-lg text-gray-700 dark:text-gray-300"><span className="font-semibold">Email:</span> {user.email}</p>
                    <p className="text-lg text-gray-700 dark:text-gray-300"><span className="font-semibold">Phone:</span> {user.phone}</p>
                    <p className="text-lg text-gray-700 dark:text-gray-300"><span className="font-semibold">Department:</span> {user.company?.department || 'N/A'}</p>
                    <p className="text-lg text-gray-700 dark:text-gray-300"><span className="font-semibold">Title:</span> {user.company?.title || 'N/A'}</p>
                    <p className="text-lg text-gray-700 dark:text-gray-300"><span className="font-semibold">Address:</span> {user.address?.address}, {user.address?.city}, {user.address?.state}</p>
                    <p className="mt-4 text-gray-800 dark:text-gray-200 italic">"{userBio}"</p> 
                </div>
            </div>

            <div className="mb-8 p-6 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md text-center">
                <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">Current Performance Rating</h2>
                <div className="flex justify-center items-center gap-4">
                    <span className="text-yellow-400 text-4xl">
                        {'⭐'.repeat(userRating)}
                        {'☆'.repeat(5 - userRating)}
                    </span>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getRatingBadgeColor(userRating)}`}>
                        {userRating} Star Rating
                    </span>
                </div>
            </div>

            <div className="mb-8 p-6 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Past Performance History</h2>
                {performanceHistory.length > 0 ? (
                    <div className="space-y-4">
                        {performanceHistory.map((entry, index) => (
                            <div key={index} className="border border-gray-200 dark:border-gray-600 p-4 rounded-lg bg-white dark:bg-gray-800">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">{entry.period}</h3>
                                <p className="text-gray-700 dark:text-gray-300">{entry.summary}</p>
                                <div className="flex items-center mt-2">
                                    <span className="text-yellow-400 text-xl mr-2">
                                        {'⭐'.repeat(entry.rating)}
                                        {'☆'.repeat(5 - entry.rating)}
                                    </span>
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${getRatingBadgeColor(entry.rating)}`}>
                                        Rating: {entry.rating}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600 dark:text-gray-400">No past performance history available.</p>
                )}
            </div>
        </section>
    );
};

export default EmployeeDetailPage;
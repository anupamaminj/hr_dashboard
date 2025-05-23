"use client";

import { useState, useEffect } from 'react';


const mockProjectsData = [
    {
        id: 1,
        name: "Next.js Authentication System",
        description: "Developed and integrated NextAuth.js for secure user authentication, including custom sign-in flows and session management.",
        status: "Completed",
        technologies: ["Next.js", "NextAuth.js", "Tailwind CSS"],
    },
    {
        id: 2,
        name: "User Feedback Collection Platform",
        description: "Designed and implemented a system for collecting and categorizing user feedback, allowing for sentiment analysis.",
        status: "In Progress",
        technologies: ["React", "Node.js", "MongoDB"],
    },
    {
        id: 3,
        name: "Dynamic User Feed & Filtering",
        description: "Created a dynamic user feed with advanced search and multi-criteria filtering capabilities for efficient data retrieval.",
        status: "Completed",
        technologies: ["React", "API Integration", "JavaScript"],
    },
    { id: 4, name: "Database Optimization", description: "Improved query performance by 30% by optimizing queries and indexes.", status: "Completed", technologies: ["SQL", "Node.js"] },
    { id: 5, name: "Payment Gateway Integration", description: "Successfully integrated Stripe for secure online payments across the platform.", status: "In Progress", technologies: ["Stripe", "React", "Node.js"] },
    { id: 6, name: "Real-time Notifications", description: "Implemented WebSocket-based real-time notification system for user updates.", status: "Planned", technologies: ["WebSockets", "Node.js", "Socket.IO"] },
    { id: 7, name: "User Onboarding Flow", description: "Designed and built an intuitive user onboarding experience to improve conversion.", status: "Completed", technologies: ["React", "UI/UX"] },
    { id: 8, name: "Analytics Dashboard Refactor", description: "Refactored the analytics dashboard for better performance and new data visualizations.", status: "In Progress", technologies: ["React", "D3.js", "Redux"] },
    { id: 9, name: "API Rate Limiting", description: "Implemented rate limiting on public APIs to prevent abuse and ensure stability.", status: "Completed", technologies: ["Node.js", "Express", "Redis"] },
    { id: 10, name: "Accessibility Improvements", description: "Enhanced website accessibility to meet WCAG 2.1 AA standards.", status: "Planned", technologies: ["HTML", "CSS", "A11y"] },
];

const mockFeedbackData = [
    {
        id: 101,
        sender: "Alice Smith",
        date: "2024-04-20",
        message: "The new search filters are incredibly helpful! Great job on the responsiveness.",
        type: "Praise",
    },
    {
        id: 102,
        sender: "Bob Johnson",
        date: "2024-04-22",
        message: "Could you consider adding an export feature for user data? It would be very useful.",
        type: "Suggestion",
    },
    {
        id: 103,
        sender: "Charlie Brown",
        date: "2024-04-23",
        message: "Experienced a minor bug on mobile when sorting by department.",
        type: "Bug Report",
    },
    { id: 104, sender: "Diana Prince", date: "2024-04-25", message: "Love the dark mode! Looks super sleek.", type: "Praise" },
    { id: 105, sender: "Evan Peters", date: "2024-04-26", message: "The login screen could use a 'remember me' checkbox.", type: "Suggestion" },
    { id: 106, sender: "Fiona Gale", date: "2024-04-27", message: "Profile picture upload isn't working for large files.", type: "Bug Report" },
    { id: 107, sender: "George Harrison", date: "2024-04-28", message: "Fantastic performance on the user list!", type: "Praise" },
    { id: 108, sender: "Hannah Montana", date: "2024-04-29", message: "Would appreciate a 'contact us' form on the site.", type: "Suggestion" },
    { id: 109, sender: "Ivan Ivanov", date: "2024-04-30", message: "The new sorting options are a game-changer. Thanks!", type: "Praise" },
    { id: 110, sender: "Julia Roberts", date: "2024-05-01", message: "Found a broken link in the footer, please check.", type: "Bug Report" },
];


const UserTabs = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [overviewData, setOverviewData] = useState(null);
    const [loadingOverview, setLoadingOverview] = useState(false);
    const [overviewError, setOverviewError] = useState(null);

    useEffect(() => {
        if (activeTab === 'overview' && !overviewData) {
            const fetchOverviewUsers = async () => {
                setLoadingOverview(true);
                setOverviewError(null);
                try {
                    const response = await fetch("https://dummyjson.com/users?limit=20");
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();

                    const totalUsers = data.users.length;
                    const departments = new Set();
                    data.users.forEach(user => {
                        if (user.company && user.company.department) {
                            departments.add(user.company.department);
                        }
                    });
                    const uniqueDepartments = departments.size;

                    const processedData = {
                        title: "User Overview",
                        description: `displaying an overview`,
                        stats: [
                            { label: "Total Users", value: totalUsers },
                            { label: "Unique Departments", value: uniqueDepartments },
                        ],
                    };
                    setOverviewData(processedData);

                } catch (error) {
                    console.error("Failed to fetch overview users:", error);
                    setOverviewError("Failed to load overview data. Please try again.");
                } finally {
                    setLoadingOverview(false);
                }
            };

            fetchOverviewUsers();
        }
    }, [activeTab, overviewData]);

    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                if (loadingOverview) {
                    return (
                        <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                            Loading overview data...
                        </div>
                    );
                }
                if (overviewError) {
                    return (
                        <div className="p-6 text-center text-red-600 dark:text-red-400">
                            Error: {overviewError}
                        </div>
                    );
                }
                if (!overviewData) {
                    return (
                        <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                            No overview data available.
                        </div>
                    );
                }
                return (
                    <div className="p-6">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{overviewData.title}</h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-6">{overviewData.description}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {overviewData.stats.map((stat, index) => (
                                <div key={index} className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg text-center">
                                    <p className="text-3xl font-bold text-blue-600 dark:text-blue-300">{stat.value}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'projects':
                return (
                    <div className="p-6">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Projects</h3>
                        <div className="max-h-80 overflow-y-auto pr-2">
                            {mockProjectsData.map(project => (
                                <div key={project.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow mb-4 h-auto">
                                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white">{project.name}</h4>
                                    <p className="text-gray-700 dark:text-gray-300 mt-2">{project.description}</p>
                                    <div className="mt-2 text-sm">
                                        <span className={`inline-block px-3 py-1 rounded-full text-white text-xs font-semibold ${project.status === 'Completed' ? 'bg-green-500' : 'bg-yellow-500'}`}>
                                            {project.status}
                                        </span>
                                        <span className="ml-2 text-gray-600 dark:text-gray-400">
                                            Tech: {project.technologies.join(', ')}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'feedback':
                return (
                    <div className="p-6">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">User Feedback</h3>
                        <div className="max-h-80 overflow-y-auto pr-2">
                            <div className="space-y-4">
                                {mockFeedbackData.map(feedback => (
                                    <div key={feedback.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow">
                                        <p className="text-gray-700 dark:text-gray-300">"{feedback.message}"</p>
                                        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                            — {feedback.sender} on {feedback.date}
                                            <span className={`ml-2 inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                                                feedback.type === 'Praise' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                                                feedback.type === 'Suggestion' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                                                'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                            }`}>
                                                {feedback.type}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            default:
                return <div className="p-6 text-gray-500 dark:text-gray-400">Select a tab to view content.</div>;
        }
    };

    const tabClasses = (tabName) =>
        `py-3 px-6 text-center font-medium transition-colors duration-200
         ${activeTab === tabName
            ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
            : 'text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400'
         }`;

    return (
        <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-md mt-8">
            <div className="flex border-b border-gray-200 dark:border-gray-700">
                <button
                    className={tabClasses('overview')}
                    onClick={() => setActiveTab('overview')}
                >
                    Overview
                </button>
                <button
                    className={tabClasses('projects')}
                    onClick={() => setActiveTab('projects')}
                >
                    Projects
                </button>
                <button
                    className={tabClasses('feedback')}
                    onClick={() => setActiveTab('feedback')}
                >
                    Feedback
                </button>
            </div>
            <div className="tab-content">
                {renderContent()}
            </div>
        </div>
    );
};

export default UserTabs;
"use client";

import Link from 'next/link';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useMemo } from 'react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const getConsistentRating = (id) => {
    return Math.floor((id * 7 + 13) % 5) + 1;
};


const generateMockBookmarkTrends = () => {
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const data = labels.map((_, index) => Math.floor(Math.random() * 50) + 10);

    return {
        labels,
        datasets: [
            {
                label: 'New Bookmarks',
                data: data,
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            },
        ],
    };
};

import { useState, useEffect } from 'react';

export default function AnalyticsPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("https://dummyjson.com/users?limit=100");
                if (!response.ok) {
                    throw new Error(`Failed to fetch users: ${response.statusText}`);
                }
                const data = await response.json();
                setUsers(data.users);
            } catch (err) {
                setError(err.message);
                console.error("Error fetching user data for analytics:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);


    const { departmentChartData, departmentChartOptions } = useMemo(() => {
        const departmentRatings = {};

        users.forEach(user => {
            const department = user.company?.department;
            if (department) {
                const rating = getConsistentRating(user.id);
                if (!departmentRatings[department]) {
                    departmentRatings[department] = { totalRating: 0, count: 0 };
                }
                departmentRatings[department].totalRating += rating;
                departmentRatings[department].count += 1;
            }
        });

        const departmentLabels = [];
        const averageRatingsData = [];

        for (const dept in departmentRatings) {
            if (departmentRatings[dept].count > 0) {
                departmentLabels.push(dept);
                averageRatingsData.push(
                    (departmentRatings[dept].totalRating / departmentRatings[dept].count).toFixed(2)
                );
            }
        }

        const data = {
            labels: departmentLabels,
            datasets: [
                {
                    label: 'Average Rating',
                    data: averageRatingsData,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
            ],
        };

        const options = {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: 'rgb(107, 114, 128)'
                    }
                },
                title: {
                    display: true,
                    text: 'Department-wise Average Ratings',
                    color: 'rgb(107, 114, 128)'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += `${context.parsed.y} ⭐`;
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 5,
                    title: {
                        display: true,
                        text: 'Average Rating',
                        color: 'rgb(107, 114, 128)'
                    },
                    ticks: {
                        color: 'rgb(107, 114, 128)'
                    },
                    grid: {
                        color: 'rgba(107, 114, 128, 0.2)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Department',
                        color: 'rgb(107, 114, 128)'
                    },
                    ticks: {
                        color: 'rgb(107, 114, 128)'
                    },
                    grid: {
                        color: 'rgba(107, 114, 128, 0.2)'
                    }
                }
            }
        };
        return { departmentChartData: data, departmentChartOptions: options };
    }, [users]);


    const bookmarkTrendData = useMemo(() => generateMockBookmarkTrends(), []);
    const bookmarkTrendOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: 'rgb(107, 114, 128)'
                }
            },
            title: {
                display: true,
                text: 'Bookmark Trends (Mock Data)',
                color: 'rgb(107, 114, 128)'
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Number of Bookmarks',
                    color: 'rgb(107, 114, 128)'
                },
                ticks: {
                    color: 'rgb(107, 114, 128)'
                },
                grid: {
                    color: 'rgba(107, 114, 128, 0.2)'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Month',
                    color: 'rgb(107, 114, 128)'
                },
                ticks: {
                    color: 'rgb(107, 114, 128)'
                },
                grid: {
                    color: 'rgba(107, 114, 128, 0.2)'
                }
            }
        }
    };

    if (loading) return <p className="text-center mt-8 text-gray-600 dark:text-gray-400">Loading analytics data...</p>;

    return (
        <section className="container mx-auto p-4 max-w-6xl mt-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
            <Link href="/" className="inline-flex items-center text-blue-600 hover:underline mb-6 dark:text-blue-400">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                Back to Dashboard
            </Link>

            <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
                HR Analytics Dashboard
            </h1>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <strong className="font-bold">Error!</strong>
                    <span className="block sm:inline"> {error}. Data might be incomplete.</span>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md">
                    <Bar options={departmentChartOptions} data={departmentChartData} />
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md">
                    <Bar options={bookmarkTrendOptions} data={bookmarkTrendData} />
                </div>
            </div>

            <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Insights</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                    <li>Engineering department consistently shows high average performance ratings.</li>
                    <li>Bookmark trends indicate a steady interest in new hires around the beginning of each quarter (mock data).</li>
                    <li>Further analysis could include skill set distribution, promotion rates, or tenure analytics.</li>
                </ul>
            </div>
        </section>
    );
}
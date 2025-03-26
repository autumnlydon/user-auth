import { useEffect } from "react";
import { useState } from "react";

export default function Dashboard() {
    const [dashboardData, setDashboardData] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                return setDashboardData("You are not logged in");
            }
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/auth/dashboard`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                const data = await response.json();
            if (response.ok) {
                setDashboardData(data);
            } else {
                alert('Failed to fetch dashboard data');
            }
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
                alert('Failed to fetch dashboard data');
            }
        }
        fetchDashboardData();
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            {dashboardData ? (
                <>
                    <p>{dashboardData.message}</p>
                    <p>First Name: {dashboardData.firstName}</p>
                    <p>Last Name: {dashboardData.lastName}</p>
                    <p>Email: {dashboardData.email}</p>
                </>
            ) : (
                <p>Loading...</p>
            )}

        </div>
    )
}
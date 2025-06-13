// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosInstance';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const res = await axios.get('http://localhost:3000/api/admin/stats');
      setStats(res.data);
    };
    fetchStats();
  }, []);

  if (!stats) return <p>Loading...</p>;

  const data = [
    { name: 'Total Users', value: stats.totalUsers },
    { name: 'Active Users', value: stats.activeUsers },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📊 Admin Dashboard</h1>
      <BarChart width={400} height={250} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#60a5fa" />
      </BarChart>

      <h2 className="text-xl mt-6 mb-2">Recent Registrations:</h2>
      <ul className="list-disc pl-5">
        {stats.recentUsers.map((user) => (
          <li key={user._id}>
            {user.name} – {new Date(user.createdAt).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;

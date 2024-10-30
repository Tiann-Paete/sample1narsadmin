import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SessionActivity = () => {
  const [sessionHistory, setSessionHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSessionHistory = async () => {
      try {
        const response = await fetch('/api/session-history');
        if (!response.ok) {
          throw new Error('Failed to fetch session history');
        }
        const data = await response.json();
        setSessionHistory(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching session history:', error);
        setError('Failed to load session history. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchSessionHistory();
  }, []);

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return 'N/A';
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    };
    return new Date(dateTimeString).toLocaleString('en-US', options);
  };

  const calculateSessionDuration = (login, logout) => {
    if (!login) return 'N/A';
    const start = new Date(login);
    const end = logout ? new Date(logout) : new Date();
    const durationMs = end - start;
    const hours = Math.floor(durationMs / 3600000);
    const minutes = Math.floor((durationMs % 3600000) / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const SessionStatusIndicator = ({ isActive }) => (
    <span className={`inline-block w-3 h-3 rounded-full mr-2 ${isActive ? 'bg-green-500' : 'bg-red-500'}`}></span>
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow rounded-lg p-6"
    >
      <h2 className="text-2xl text-neutral-900 font-bold mb-4">Session Logs</h2>
      <div className="overflow-x-auto">
        <div className="max-h-[400px] overflow-y-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Full Name
                </th>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Username
                </th>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Login Time
                </th>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Logout Time
                </th>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Session Duration
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {sessionHistory.map((session, index) => (
                <tr key={session.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="px-6 py-4 text-black whitespace-no-wrap border-b border-gray-200">
                    {session.full_name}
                  </td>
                  <td className="px-6 py-4 text-black whitespace-no-wrap border-b border-gray-200">
                    {session.username}
                  </td>
                  <td className="px-6 py-4 text-black whitespace-no-wrap border-b border-gray-200">
                    {formatDateTime(session.login_time)}
                  </td>
                  <td className="px-6 py-4 text-black whitespace-no-wrap border-b border-gray-200">
                    {formatDateTime(session.logout_time)}
                  </td>
                  <td className="px-6 py-4 text-black whitespace-no-wrap border-b border-gray-200">
                    <div className="flex items-center">
                      <SessionStatusIndicator isActive={!session.logout_time} />
                      <span>
                        {!session.logout_time ? 'Active' : calculateSessionDuration(session.login_time, session.logout_time)}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default SessionActivity;
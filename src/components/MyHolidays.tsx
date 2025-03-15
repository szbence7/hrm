'use client';

import React from 'react';

const MyHolidays = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">My Holidays</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Pending Leave Requests</h2>
          {/* Pending leave requests content will go here */}
          <p className="text-gray-600 dark:text-gray-300">Your pending leave requests will be displayed here.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Upcoming Holidays</h2>
          {/* Upcoming holidays content will go here */}
          <p className="text-gray-600 dark:text-gray-300">Your upcoming holidays will be displayed here.</p>
        </div>
      </div>
    </div>
  );
};

export default MyHolidays; 
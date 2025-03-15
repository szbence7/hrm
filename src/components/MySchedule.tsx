'use client';

import React from 'react';

const MySchedule = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold dark:text-white">My Schedule</h1>
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        {/* Schedule content will go here */}
        <p className="text-gray-600 dark:text-gray-300">Your schedule information will be displayed here.</p>
      </div>
    </div>
  );
};

export default MySchedule; 
'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

// Verify the day of week for March 13, 2024
const march13 = new Date('2024-03-13');
console.log('March 13 is:', march13.toLocaleDateString('en-US', { weekday: 'long' }));

// Dummy data for demonstration
const employeeSchedule = {
  '2024-03-12': {
    location: 'Main Office',
    floor: '2nd Floor',
    desk: 'Desk 201',
    workingHours: '9:00 - 17:00',
  },
  '2024-03-13': {
    location: 'Main Office',
    floor: '3rd Floor',
    desk: 'Desk 304',
    workingHours: '9:00 - 17:00',
  },
  '2024-03-14': {
    location: 'Home Office',
    workingHours: '9:00 - 17:00',
  },
  '2024-03-15': {
    location: 'No schedule',
    workingHours: 'N/A',
  },
  '2024-03-20': {
    location: 'Main Office',
    floor: '3rd Floor',
    desk: 'Desk 304',
    workingHours: '9:00 - 17:00',
  },
  '2024-03-21': {
    location: 'Main Office',
    floor: '3rd Floor',
    desk: 'Desk 304',
    workingHours: '9:00 - 17:00',
  },
  '2024-03-22': {
    location: 'Home Office',
    workingHours: '9:00 - 17:00',
  },
  '2024-03-23': {
    location: 'Main Office',
    floor: '2nd Floor',
    desk: 'Desk 205',
    workingHours: '9:00 - 17:00',
  },
};

const upcomingHolidays = [
  {
    id: 1,
    name: 'Summer Vacation',
    startDate: '2024-07-15',
    endDate: '2024-07-25',
    status: 'approved',
    type: 'requested',
  },
  {
    id: 2,
    name: 'Easter Holiday',
    date: '2024-04-01',
    type: 'public',
  },
  {
    id: 3,
    name: 'Christmas Break',
    startDate: '2024-12-24',
    endDate: '2024-12-26',
    status: 'pending',
    type: 'requested',
  },
];

const pendingLeaveRequests = [
  {
    id: 1,
    type: 'Vacation',
    startDate: '2024-04-10',
    endDate: '2024-04-15',
    requestedOn: '2024-03-01',
    status: 'pending'
  },
  {
    id: 2,
    type: 'Sick Leave',
    startDate: '2024-03-20',
    endDate: '2024-03-22',
    requestedOn: '2024-03-12',
    status: 'pending'
  }
];

export default function EmployeeDashboard() {
  const [selectedDate, setSelectedDate] = useState(() => {
    // Initialize with March 13, 2024
    const today = new Date('2024-03-13');
    today.setHours(0, 0, 0, 0);
    return today;
  });
  
  const baseDate = new Date('2024-03-13');
  baseDate.setHours(0, 0, 0, 0);

  const formatDateKey = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  // Add a date formatting helper function
  const formatDate = (dateString: string, options: Intl.DateTimeFormatOptions) => {
    const date = new Date(dateString);
    // Use en-GB for consistent date formatting
    return date.toLocaleDateString('en-GB', options);
  };

  const getDateLabel = (date: Date) => {
    const selectedDay = new Date(date);
    const today = new Date(baseDate);
    
    // Reset hours to ensure proper date comparison
    selectedDay.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    
    const diffTime = selectedDay.getTime() - today.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays === -1) return 'Yesterday';
    
    return selectedDay.toLocaleDateString('en-GB', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    setSelectedDate(newDate);
  };

  const scheduleForDate = employeeSchedule[formatDateKey(selectedDate)] || {
    location: 'No schedule',
    workingHours: 'N/A',
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Schedule Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Schedule</h2>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigateDate('prev')}
              className="p-2 rounded-full hover:bg-gray-100"
              aria-label="Previous day"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <span className="text-lg font-medium">
              {getDateLabel(selectedDate)}
            </span>
            <button
              onClick={() => navigateDate('next')}
              className="p-2 rounded-full hover:bg-gray-100"
              aria-label="Next day"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {scheduleForDate.location}
              </h3>
              {scheduleForDate.floor && scheduleForDate.desk && (
                <p className="text-gray-500 mt-1">
                  {scheduleForDate.floor} • {scheduleForDate.desk}
                </p>
              )}
              <p className="text-sm text-gray-500 mt-2">
                Working hours: {scheduleForDate.workingHours}
              </p>
            </div>
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${
              scheduleForDate.location === 'Home Office' 
                ? 'bg-blue-100 text-blue-800'
                : scheduleForDate.location === 'No schedule'
                ? 'bg-gray-100 text-gray-800'
                : 'bg-green-100 text-green-800'
            }`}>
              {scheduleForDate.location === 'Home Office' 
                ? 'Remote'
                : scheduleForDate.location === 'No schedule'
                ? 'No Schedule'
                : 'In Office'}
            </span>
          </div>
        </div>
      </section>

      {/* Pending Leave Requests Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Pending Leave Requests</h2>
        <div className="space-y-4">
          {pendingLeaveRequests.map((request) => (
            <div
              key={request.id}
              className="bg-white rounded-xl border border-gray-200 p-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {request.type}
                  </h3>
                  <p className="text-gray-500 mt-1">
                    {formatDate(request.startDate, {
                      month: 'long',
                      day: 'numeric',
                    })} - {formatDate(request.endDate, {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Requested on: {formatDate(request.requestedOn, {
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                <span className="px-3 py-1 text-sm font-medium rounded-full bg-yellow-100 text-yellow-800">
                  Pending
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Holidays Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Upcoming Holidays</h2>
        <div className="space-y-4">
          {upcomingHolidays.map((holiday) => (
            <div
              key={holiday.id}
              className="bg-white rounded-xl border border-gray-200 p-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {holiday.name}
                  </h3>
                  <p className="text-gray-500 mt-1">
                    {holiday.type === 'public' ? (
                      formatDate(holiday.date, {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })
                    ) : (
                      <>
                        {formatDate(holiday.startDate, {
                          month: 'long',
                          day: 'numeric',
                        })} - {formatDate(holiday.endDate, {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </>
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {holiday.type === 'requested' && (
                    <span
                      className={`px-3 py-1 text-sm font-medium rounded-full ${
                        holiday.status === 'approved'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {holiday.status === 'approved' ? 'Approved' : 'Pending'}
                    </span>
                  )}
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full ${
                      holiday.type === 'public'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}
                  >
                    {holiday.type === 'public' ? 'Public Holiday' : 'Requested Leave'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
} 
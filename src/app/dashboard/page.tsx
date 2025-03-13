'use client';

import { CalendarDaysIcon, UserPlusIcon, GiftIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const metrics = [
  { label: 'Total Employees', value: '156' },
  { label: 'Pending Leave Requests', value: '8' },
  { label: 'Upcoming Birthdays', value: '3' },
  { label: 'New Hires', value: '4' },
];

const pendingLeaveRequests = [
  {
    id: 1,
    employeeName: 'John Doe',
    type: 'Vacation',
    startDate: '2024-04-10',
    endDate: '2024-04-15',
    requestedOn: '2024-03-01',
    department: 'Engineering'
  },
  {
    id: 2,
    employeeName: 'Sarah Smith',
    type: 'Sick Leave',
    startDate: '2024-03-20',
    endDate: '2024-03-22',
    requestedOn: '2024-03-12',
    department: 'Marketing'
  }
];

const upcomingHolidays = [
  {
    id: 1,
    name: 'Easter Holiday',
    date: '2024-04-01',
    type: 'public'
  },
  {
    id: 2,
    name: 'Labor Day',
    date: '2024-05-01',
    type: 'public'
  }
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold dark:text-white">Dashboard</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Welcome back! Here's an overview of your organization.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <UserGroupIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm text-gray-500 dark:text-gray-400">Total Employees</h3>
              <p className="text-2xl font-semibold mt-1 dark:text-white">198</p>
            </div>
          </div>
          <p className="text-sm text-green-600 dark:text-green-400 mt-4">+2 new this month</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <UserPlusIcon className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm text-gray-500 dark:text-gray-400">New Hires</h3>
              <p className="text-2xl font-semibold mt-1 dark:text-white">4</p>
            </div>
          </div>
          <p className="text-sm text-orange-600 dark:text-orange-400 mt-4">3 in onboarding</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-pink-100 dark:bg-pink-900 rounded-lg">
              <GiftIcon className="w-6 h-6 text-pink-600 dark:text-pink-400" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm text-gray-500 dark:text-gray-400">Upcoming Birthdays</h3>
              <p className="text-2xl font-semibold mt-1 dark:text-white">3</p>
            </div>
          </div>
          <p className="text-sm text-pink-600 dark:text-pink-400 mt-4">Next one in 2 days</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <CalendarDaysIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm text-gray-500 dark:text-gray-400">Leave Requests</h3>
              <p className="text-2xl font-semibold mt-1 dark:text-white">8</p>
            </div>
          </div>
          <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-4">5 pending approval</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4 dark:text-white">Holiday Requests</h2>
            <div className="space-y-4">
              {pendingLeaveRequests.map((request) => (
                <div key={request.id} className="flex items-start justify-between border-b border-gray-200 dark:border-gray-700 pb-4">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{request.employeeName}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {request.type} • {request.department}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {request.startDate} - {request.endDate}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 text-sm bg-green-100 text-green-600 rounded-md hover:bg-green-200 dark:bg-green-900 dark:text-green-400">
                      Approve
                    </button>
                    <button className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded-md hover:bg-red-200 dark:bg-red-900 dark:text-red-400">
                      Decline
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4 dark:text-white">Today's Schedule</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-900 dark:text-white">Morning Shift</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">8:00 AM - 4:00 PM</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">45 employees</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-900 dark:text-white">Afternoon Shift</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">4:00 PM - 12:00 AM</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">32 employees</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-900 dark:text-white">Remote Work</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Flexible Hours</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">28 employees</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-900 dark:text-white">On Leave</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Approved Absence</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">12 employees</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
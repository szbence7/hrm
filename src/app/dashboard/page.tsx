'use client';

import { CalendarDaysIcon, ChartBarIcon, ClockIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const metrics = [
  { label: 'Total Employees', value: '156' },
  { label: 'Pending Leave Requests', value: '8' },
  { label: 'Upcoming Holidays', value: '3' },
  { label: 'Remote Today', value: '45' },
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
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <ClockIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm text-gray-500 dark:text-gray-400">Average Attendance</h3>
              <p className="text-2xl font-semibold mt-1 dark:text-white">95%</p>
            </div>
          </div>
          <p className="text-sm text-green-600 dark:text-green-400 mt-4">+1.2% from last month</p>
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

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <ChartBarIcon className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm text-gray-500 dark:text-gray-400">Performance</h3>
              <p className="text-2xl font-semibold mt-1 dark:text-white">85%</p>
            </div>
          </div>
          <p className="text-sm text-green-600 dark:text-green-400 mt-4">+2.5% from last quarter</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4 dark:text-white">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <p className="ml-3 text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium text-gray-900 dark:text-white">Sarah Chen</span> submitted a leave request
                </p>
                <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">2h ago</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p className="ml-3 text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium text-gray-900 dark:text-white">Alex Kim</span> completed performance review
                </p>
                <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">4h ago</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <p className="ml-3 text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium text-gray-900 dark:text-white">Maria Garcia</span> joined the team
                </p>
                <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">1d ago</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4 dark:text-white">Upcoming Events</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 text-center">
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">15</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">MAR</p>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Team Building Event</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">2:00 PM - 5:00 PM</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 text-center">
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">22</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">MAR</p>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Quarterly Review</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">10:00 AM - 12:00 PM</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 text-center">
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">28</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">MAR</p>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Training Workshop</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">1:00 PM - 4:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
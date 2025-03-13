'use client';

import * as Tabs from '@radix-ui/react-tabs';
import * as Select from '@radix-ui/react-select';

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold dark:text-white">Reports</h1>
        <div className="flex gap-4">
          <Select.Root defaultValue="thisMonth">
            <Select.Trigger className="inline-flex items-center justify-between rounded-lg px-4 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none min-w-[150px] text-gray-900 dark:text-white">
              <Select.Value />
            </Select.Trigger>
            <Select.Portal>
              <Select.Content className="overflow-hidden bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg">
                <Select.Viewport>
                  <Select.Item
                    value="thisMonth"
                    className="px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer outline-none text-gray-900 dark:text-white"
                  >
                    <Select.ItemText>This Month</Select.ItemText>
                  </Select.Item>
                  <Select.Item
                    value="lastMonth"
                    className="px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer outline-none text-gray-900 dark:text-white"
                  >
                    <Select.ItemText>Last Month</Select.ItemText>
                  </Select.Item>
                  <Select.Item
                    value="thisQuarter"
                    className="px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer outline-none text-gray-900 dark:text-white"
                  >
                    <Select.ItemText>This Quarter</Select.ItemText>
                  </Select.Item>
                  <Select.Item
                    value="thisYear"
                    className="px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer outline-none text-gray-900 dark:text-white"
                  >
                    <Select.ItemText>This Year</Select.ItemText>
                  </Select.Item>
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Export Report
          </button>
        </div>
      </div>

      <Tabs.Root defaultValue="attendance" className="mt-8">
        <Tabs.List className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
          <Tabs.Trigger
            value="attendance"
            className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400"
          >
            Attendance
          </Tabs.Trigger>
          <Tabs.Trigger
            value="performance"
            className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400"
          >
            Performance
          </Tabs.Trigger>
          <Tabs.Trigger
            value="leave"
            className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400"
          >
            Leave Management
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="attendance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-sm text-gray-500 dark:text-gray-400">Present Today</h3>
              <p className="text-2xl font-semibold mt-2 dark:text-white">145</p>
              <p className="text-sm text-green-600 dark:text-green-400 mt-1">+2.5% from yesterday</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-sm text-gray-500 dark:text-gray-400">Remote Today</h3>
              <p className="text-2xl font-semibold mt-2 dark:text-white">45</p>
              <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">+5% from yesterday</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-sm text-gray-500 dark:text-gray-400">On Leave</h3>
              <p className="text-2xl font-semibold mt-2 dark:text-white">8</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">No change from yesterday</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-sm text-gray-500 dark:text-gray-400">Late Today</h3>
              <p className="text-2xl font-semibold mt-2 dark:text-white">3</p>
              <p className="text-sm text-red-600 dark:text-red-400 mt-1">+2 from yesterday</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4 dark:text-white">Attendance Overview</h3>
              {/* Add your attendance chart/table here */}
            </div>
          </div>
        </Tabs.Content>

        <Tabs.Content value="performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-sm text-gray-500 dark:text-gray-400">Average Performance</h3>
              <p className="text-2xl font-semibold mt-2 dark:text-white">85%</p>
              <p className="text-sm text-green-600 dark:text-green-400 mt-1">+3% from last month</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-sm text-gray-500 dark:text-gray-400">Top Performers</h3>
              <p className="text-2xl font-semibold mt-2 dark:text-white">12</p>
              <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">Above 90%</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-sm text-gray-500 dark:text-gray-400">Needs Improvement</h3>
              <p className="text-2xl font-semibold mt-2 dark:text-white">5</p>
              <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-1">Below 70%</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-sm text-gray-500 dark:text-gray-400">Reviews Due</h3>
              <p className="text-2xl font-semibold mt-2 dark:text-white">8</p>
              <p className="text-sm text-red-600 dark:text-red-400 mt-1">This week</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4 dark:text-white">Performance Trends</h3>
              {/* Add your performance chart here */}
            </div>
          </div>
        </Tabs.Content>

        <Tabs.Content value="leave" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-sm text-gray-500 dark:text-gray-400">Total Leave Days</h3>
              <p className="text-2xl font-semibold mt-2 dark:text-white">450</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">This month</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-sm text-gray-500 dark:text-gray-400">Pending Requests</h3>
              <p className="text-2xl font-semibold mt-2 dark:text-white">8</p>
              <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-1">Needs review</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-sm text-gray-500 dark:text-gray-400">Approved Leaves</h3>
              <p className="text-2xl font-semibold mt-2 dark:text-white">32</p>
              <p className="text-sm text-green-600 dark:text-green-400 mt-1">This month</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-sm text-gray-500 dark:text-gray-400">Rejected Leaves</h3>
              <p className="text-2xl font-semibold mt-2 dark:text-white">3</p>
              <p className="text-sm text-red-600 dark:text-red-400 mt-1">This month</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4 dark:text-white">Leave Distribution</h3>
              {/* Add your leave distribution chart here */}
            </div>
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
} 
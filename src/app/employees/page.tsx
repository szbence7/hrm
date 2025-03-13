'use client';

import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function EmployeesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold dark:text-white">Employees</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Manage your organization's employees</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <PlusIcon className="w-5 h-5 mr-2" />
          Add Employee
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="p-6">
          <div className="flex items-center mb-6">
            <div className="relative flex-1 max-w-md">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search employees..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              />
            </div>
            <div className="ml-4 flex items-center space-x-2">
              <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400">
                <option value="all">All Departments</option>
                <option value="engineering">Engineering</option>
                <option value="marketing">Marketing</option>
                <option value="sales">Sales</option>
                <option value="hr">HR</option>
              </select>
              <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400">
                <option value="active">Active</option>
                <option value="onLeave">On Leave</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="pb-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Employee</th>
                  <th className="pb-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Department</th>
                  <th className="pb-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Position</th>
                  <th className="pb-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Status</th>
                  <th className="pb-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="py-4">
                    <div className="flex items-center">
                      <img
                        src="https://ui-avatars.com/api/?name=Sarah+Chen"
                        alt="Sarah Chen"
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Sarah Chen</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">sarah.chen@company.com</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="text-sm text-gray-900 dark:text-white">Engineering</span>
                  </td>
                  <td className="py-4">
                    <span className="text-sm text-gray-900 dark:text-white">Senior Developer</span>
                  </td>
                  <td className="py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                      Active
                    </span>
                  </td>
                  <td className="py-4">
                    <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                      View Details
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="py-4">
                    <div className="flex items-center">
                      <img
                        src="https://ui-avatars.com/api/?name=Alex+Kim"
                        alt="Alex Kim"
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Alex Kim</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">alex.kim@company.com</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="text-sm text-gray-900 dark:text-white">Marketing</span>
                  </td>
                  <td className="py-4">
                    <span className="text-sm text-gray-900 dark:text-white">Marketing Manager</span>
                  </td>
                  <td className="py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                      On Leave
                    </span>
                  </td>
                  <td className="py-4">
                    <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                      View Details
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="py-4">
                    <div className="flex items-center">
                      <img
                        src="https://ui-avatars.com/api/?name=Maria+Garcia"
                        alt="Maria Garcia"
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Maria Garcia</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">maria.garcia@company.com</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="text-sm text-gray-900 dark:text-white">Sales</span>
                  </td>
                  <td className="py-4">
                    <span className="text-sm text-gray-900 dark:text-white">Sales Representative</span>
                  </td>
                  <td className="py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                      Inactive
                    </span>
                  </td>
                  <td className="py-4">
                    <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                      View Details
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Showing <span className="font-medium">1</span> to <span className="font-medium">3</span> of{' '}
              <span className="font-medium">12</span> results
            </p>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                Previous
              </button>
              <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm hover:bg-gray-50 dark:hover:bg-gray-600">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
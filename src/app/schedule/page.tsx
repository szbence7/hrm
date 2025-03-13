'use client';

import * as Tabs from '@radix-ui/react-tabs';
import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const timeSlots = Array.from({ length: 9 }, (_, i) => `${i + 9}:00`); // 9 AM to 5 PM

const shifts = [
  {
    id: 1,
    employee: 'John Doe',
    day: 'Monday',
    startTime: '9:00',
    endTime: '11:00',
    department: 'Engineering',
  },
  {
    id: 2,
    employee: 'Sarah Smith',
    day: 'Monday',
    startTime: '13:00',
    endTime: '15:00',
    department: 'Marketing',
  },
  // Add more shifts as needed
];

const getShiftHeight = (startTime: string, endTime: string) => {
  const start = parseInt(startTime.split(':')[0]);
  const end = parseInt(endTime.split(':')[0]);
  return (end - start) * 100; // height in pixels
};

const getShiftPosition = (startTime: string) => {
  const start = parseInt(startTime.split(':')[0]);
  return (start - 9) * 100; // position from top in pixels
};

export default function SchedulePage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Schedule</h1>
        <button
          onClick={() => setIsDialogOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Shift
        </button>
      </div>

      <Tabs.Root defaultValue="weekly" className="mt-8">
        <Tabs.List className="flex border-b border-gray-200 mb-4">
          <Tabs.Trigger
            value="weekly"
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:text-blue-600"
          >
            Weekly View
          </Tabs.Trigger>
          <Tabs.Trigger
            value="departments"
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:text-blue-600"
          >
            By Department
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="weekly" className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
            <div className="min-w-[800px]">
              <div className="grid grid-cols-8 border-b">
                <div className="p-4 font-medium text-gray-500 border-r">Time</div>
                {weekDays.map((day) => (
                  <div key={day} className="p-4 font-medium text-gray-500 border-r">
                    {day}
                  </div>
                ))}
              </div>
              <div className="divide-y">
                {timeSlots.map((time) => (
                  <div key={time} className="grid grid-cols-8">
                    <div className="p-4 text-sm text-gray-500 border-r">{time}</div>
                    {weekDays.map((day) => (
                      <div key={`${day}-${time}`} className="p-4 border-r relative h-[100px]">
                        {shifts
                          .filter(
                            (shift) =>
                              shift.day === day && shift.startTime === time
                          )
                          .map((shift) => (
                            <div
                              key={shift.id}
                              className="absolute left-2 right-2 bg-blue-50 border border-blue-200 rounded p-2"
                              style={{
                                height: `${getShiftHeight(shift.startTime, shift.endTime)}px`,
                                top: `${getShiftPosition(shift.startTime)}px`,
                              }}
                            >
                              <p className="font-medium">{shift.employee}</p>
                              <p className="text-gray-500">{shift.department}</p>
                              <p className="text-sm text-gray-500">
                                {shift.startTime} - {shift.endTime}
                              </p>
                            </div>
                          ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Tabs.Content>

        <Tabs.Content value="departments" className="space-y-4">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Department Schedules</h3>
            <div className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Engineering</h4>
                <div className="space-y-2">
                  {shifts
                    .filter((shift) => shift.department === 'Engineering')
                    .map((shift) => (
                      <div
                        key={shift.id}
                        className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{shift.employee}</p>
                          <p className="text-sm text-gray-500">
                            {shift.day} ({shift.startTime} - {shift.endTime})
                          </p>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800">
                          Edit
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </Tabs.Content>
      </Tabs.Root>

      <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-full max-w-md">
            <Dialog.Title className="text-lg font-semibold mb-4">
              Add New Shift
            </Dialog.Title>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Employee
                </label>
                <select className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2">
                  <option>John Doe</option>
                  <option>Sarah Smith</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Day
                </label>
                <select className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2">
                  {weekDays.map((day) => (
                    <option key={day}>{day}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Start Time
                  </label>
                  <input
                    type="time"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    End Time
                  </label>
                  <input
                    type="time"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setIsDialogOpen(false)}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Shift
                </button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
} 
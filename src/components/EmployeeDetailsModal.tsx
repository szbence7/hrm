'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface ExtraLeave {
  type: string;
  days: number;
}

interface EmployeeDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: {
    name: string;
    email: string;
    department: string;
    position: string;
    birthDate: string;
    status: string;
  };
}

export default function EmployeeDetailsModal({
  isOpen,
  onClose,
  employee,
}: EmployeeDetailsModalProps) {
  const [extraLeaves, setExtraLeaves] = useState<ExtraLeave[]>([]);
  const [newLeaveType, setNewLeaveType] = useState("");
  const [newLeaveDays, setNewLeaveDays] = useState("");

  const calculateBaseVacationDays = (birthDate: string) => {
    const age = new Date().getFullYear() - new Date(birthDate).getFullYear();
    // Basic vacation calculation logic (can be adjusted based on company policy)
    if (age >= 45) return 30;
    if (age >= 35) return 27;
    return 25;
  };

  const handleAddExtraLeave = () => {
    if (newLeaveType && newLeaveDays) {
      setExtraLeaves([
        ...extraLeaves,
        { type: newLeaveType, days: parseInt(newLeaveDays) },
      ]);
      setNewLeaveType("");
      setNewLeaveDays("");
    }
  };

  const totalVacationDays =
    calculateBaseVacationDays(employee.birthDate) +
    extraLeaves.reduce((sum, leave) => sum + leave.days, 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Employee Details</DialogTitle>
        </DialogHeader>
        
        <div className="mt-6 space-y-8">
          {/* Profile Section */}
          <div className="flex items-start space-x-6">
            <div className="flex-shrink-0">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  employee.name
                )}&size=128`}
                alt={employee.name}
                className="w-32 h-32 rounded-full"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold">{employee.name}</h3>
              <p className="text-gray-500 dark:text-gray-400">{employee.email}</p>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Department</p>
                  <p className="font-medium">{employee.department}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Position</p>
                  <p className="font-medium">{employee.position}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Birth Date</p>
                  <p className="font-medium">{new Date(employee.birthDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                  <p className="font-medium">{employee.status}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Vacation Section */}
          <div className="border-t pt-6">
            <h4 className="text-lg font-semibold mb-4">Vacation Information</h4>
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">Base Vacation Days</p>
                <p className="text-2xl font-semibold">
                  {calculateBaseVacationDays(employee.birthDate)} days
                </p>
              </div>

              {/* Extra Leaves Section */}
              <div className="space-y-4">
                <h5 className="font-medium">Extra Leaves</h5>
                <div className="flex gap-4">
                  <select
                    value={newLeaveType}
                    onChange={(e) => setNewLeaveType(e.target.value)}
                    className="flex-1 px-3 py-2 border rounded-lg"
                  >
                    <option value="">Select leave type...</option>
                    <option value="Maternity">Maternity Leave</option>
                    <option value="Paternity">Paternity Leave</option>
                    <option value="Study">Study Leave</option>
                    <option value="Other">Other</option>
                  </select>
                  <input
                    type="number"
                    value={newLeaveDays}
                    onChange={(e) => setNewLeaveDays(e.target.value)}
                    placeholder="Days"
                    className="w-24 px-3 py-2 border rounded-lg"
                  />
                  <button
                    onClick={handleAddExtraLeave}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <PlusIcon className="w-5 h-5" />
                  </button>
                </div>

                {extraLeaves.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {extraLeaves.map((leave, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center bg-gray-50 dark:bg-gray-800 p-3 rounded-lg"
                      >
                        <span>{leave.type}</span>
                        <span className="font-medium">{leave.days} days</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <p className="text-sm text-blue-600 dark:text-blue-400">Total Vacation Days</p>
                <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
                  {totalVacationDays} days
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 
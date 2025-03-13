'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PlusIcon, PencilIcon, XMarkIcon, CheckIcon } from "@heroicons/react/24/outline";
import { calculateBaseVacationDays, calculateAge } from "@/lib/vacationCalculator";
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

const LEAVE_TYPES = [
  { value: "maternity", label: "Maternity Leave" },
  { value: "paternity", label: "Paternity Leave" },
  { value: "study", label: "Study Leave" },
  { value: "other", label: "Other" },
] as const;

const DEPARTMENTS = ["Engineering", "Marketing", "Sales", "HR", "Finance", "Operations"] as const;
const STATUSES = ["Active", "On Leave", "Inactive"] as const;

export default function EmployeeDetailsModal({
  isOpen,
  onClose,
  employee: initialEmployee,
}: EmployeeDetailsModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [employee, setEmployee] = useState(initialEmployee);
  const [editedEmployee, setEditedEmployee] = useState(initialEmployee);
  const [extraLeaves, setExtraLeaves] = useState<ExtraLeave[]>([]);
  const [newLeaveType, setNewLeaveType] = useState<string>("");
  const [newLeaveDays, setNewLeaveDays] = useState<string>("");

  const handleStartEdit = () => {
    setIsEditing(true);
    setEditedEmployee(employee);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedEmployee(employee);
  };

  const handleSaveEdit = () => {
    setEmployee(editedEmployee);
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof typeof employee, value: string) => {
    setEditedEmployee(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddExtraLeave = () => {
    if (newLeaveType && newLeaveDays) {
      const selectedLeaveType = LEAVE_TYPES.find(type => type.value === newLeaveType);
      if (selectedLeaveType) {
        setExtraLeaves([
          ...extraLeaves,
          { type: selectedLeaveType.label, days: parseInt(newLeaveDays) },
        ]);
        setNewLeaveType("");
        setNewLeaveDays("");
      }
    }
  };

  const handleDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Csak pozitív számokat engedünk meg
    if (value === "" || parseInt(value) > 0) {
      setNewLeaveDays(value);
    }
  };

  const baseVacationDays = calculateBaseVacationDays(employee.birthDate);
  const extraVacationDays = extraLeaves.reduce((sum, leave) => sum + leave.days, 0);
  const totalVacationDays = baseVacationDays + extraVacationDays;
  const age = calculateAge(employee.birthDate);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle>Employee Details</DialogTitle>
            <div className="space-x-2">
              {!isEditing ? (
                <button
                  onClick={handleStartEdit}
                  className="inline-flex items-center px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                >
                  <PencilIcon className="w-4 h-4 mr-1" />
                  Edit
                </button>
              ) : (
                <>
                  <button
                    onClick={handleCancelEdit}
                    className="inline-flex items-center px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                  >
                    <XMarkIcon className="w-4 h-4 mr-1" />
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    className="inline-flex items-center px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <CheckIcon className="w-4 h-4 mr-1" />
                    Save
                  </button>
                </>
              )}
            </div>
          </div>
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
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-500 dark:text-gray-400">Name</label>
                    <input
                      type="text"
                      value={editedEmployee.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="mt-1 w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 dark:text-gray-400">Email</label>
                    <input
                      type="email"
                      value={editedEmployee.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="mt-1 w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-500 dark:text-gray-400">Department</label>
                      <select
                        value={editedEmployee.department}
                        onChange={(e) => handleInputChange('department', e.target.value)}
                        className="mt-1 w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        {DEPARTMENTS.map((dept) => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500 dark:text-gray-400">Position</label>
                      <input
                        type="text"
                        value={editedEmployee.position}
                        onChange={(e) => handleInputChange('position', e.target.value)}
                        className="mt-1 w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500 dark:text-gray-400">Birth Date</label>
                      <input
                        type="date"
                        value={editedEmployee.birthDate}
                        onChange={(e) => handleInputChange('birthDate', e.target.value)}
                        className="mt-1 w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500 dark:text-gray-400">Status</label>
                      <select
                        value={editedEmployee.status}
                        onChange={(e) => handleInputChange('status', e.target.value)}
                        className="mt-1 w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        {STATUSES.map((status) => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              ) : (
                <>
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
                      <p className="font-medium">
                        {new Date(employee.birthDate).toLocaleDateString()} ({age} years old)
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                      <p className="font-medium">{employee.status}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Vacation Section */}
          <div className="border-t pt-6">
            <h4 className="text-lg font-semibold mb-4">Vacation Information</h4>
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">Base Vacation Days (by age)</p>
                <p className="text-2xl font-semibold">
                  {baseVacationDays} days
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Includes {baseVacationDays - 20} extra days based on age ({age} years)
                </p>
              </div>

              {/* Extra Leaves Section */}
              <div className="space-y-4">
                <h5 className="font-medium">Extra Leaves</h5>
                <div className="flex gap-4">
                  <select
                    value={newLeaveType}
                    onChange={(e) => setNewLeaveType(e.target.value)}
                    className="flex-1 px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">Select leave type...</option>
                    {LEAVE_TYPES.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    value={newLeaveDays}
                    onChange={handleDaysChange}
                    placeholder="Days"
                    className="w-24 px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    min="1"
                  />
                  <button
                    onClick={handleAddExtraLeave}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    disabled={!newLeaveType || !newLeaveDays}
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
                {extraVacationDays > 0 && (
                  <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                    ({baseVacationDays} base + {extraVacationDays} extra)
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 
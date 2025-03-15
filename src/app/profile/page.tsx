'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { User } from 'lucide-react';

interface UserProfile {
  first_name: string;
  last_name: string;
  email: string;
  date_of_birth: string;
  gender: string;
  contact_number: string;
  emergency_contact: string;
  address: string;
  department: string;
  position: string;
  hire_date: string;
  employment_status: string;
  salary_information: {
    base_salary: number;
    currency: string;
    payment_interval: string;
  };
}

export default function ProfilePage() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/profile');
        if (!response.ok) throw new Error('Failed to fetch profile');
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchProfile();
    }
  }, [session]);

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  if (!profile) {
    return <div className="p-8">Error loading profile</div>;
  }

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center mb-8">
        <div className="relative w-32 h-32 mb-4">
          <div className="w-full h-full rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-3xl font-bold text-gray-600 dark:text-gray-300">
            {getInitials(profile.first_name, profile.last_name)}
          </div>
        </div>
        <h1 className="text-3xl font-bold">{profile.first_name} {profile.last_name}</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">{profile.position}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-500 dark:text-gray-400">Full Name</label>
              <p className="font-medium">{profile.first_name} {profile.last_name}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500 dark:text-gray-400">Email</label>
              <p className="font-medium">{profile.email}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500 dark:text-gray-400">Date of Birth</label>
              <p className="font-medium">{new Date(profile.date_of_birth).toLocaleDateString()}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500 dark:text-gray-400">Gender</label>
              <p className="font-medium">{profile.gender}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-500 dark:text-gray-400">Phone Number</label>
              <p className="font-medium">{profile.contact_number}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500 dark:text-gray-400">Emergency Contact</label>
              <p className="font-medium">{profile.emergency_contact || 'Not provided'}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500 dark:text-gray-400">Address</label>
              <p className="font-medium">{profile.address || 'Not provided'}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Employment Details</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-500 dark:text-gray-400">Department</label>
              <p className="font-medium">{profile.department}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500 dark:text-gray-400">Position</label>
              <p className="font-medium">{profile.position}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500 dark:text-gray-400">Hire Date</label>
              <p className="font-medium">{new Date(profile.hire_date).toLocaleDateString()}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500 dark:text-gray-400">Employment Status</label>
              <p className="font-medium">{profile.employment_status}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Salary Information</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-500 dark:text-gray-400">Base Salary</label>
              <p className="font-medium">
                {profile.salary_information.base_salary.toLocaleString()} {profile.salary_information.currency}
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-500 dark:text-gray-400">Payment Interval</label>
              <p className="font-medium">{profile.salary_information.payment_interval}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
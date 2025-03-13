'use client';

import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigationItems = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Employees', href: '/employees' },
  { name: 'Schedule', href: '/schedule' },
  { name: 'Holidays', href: '/holidays' },
  { name: 'Reports', href: '/reports' },
  { name: 'Settings', href: '/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Navbar */}
      <div className="fixed top-0 left-64 right-0 h-16 bg-gray-900 dark:bg-gray-950 z-10">
        <div className="h-full px-6 flex items-center justify-end">
          <div className="flex items-center gap-4">
            <button className="text-gray-300 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                <span className="text-white text-sm">JD</span>
              </div>
              <span className="text-gray-300">John Doe</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <aside className="w-64 h-screen bg-gray-900 dark:bg-gray-950 text-white fixed left-0 top-0">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-8">HRM System</h1>
          <NavigationMenu.Root className="relative">
            <NavigationMenu.List className="flex flex-col gap-2">
              {navigationItems.map((item) => (
                <NavigationMenu.Item key={item.href}>
                  <Link
                    href={item.href}
                    className={`block px-4 py-2 rounded-lg transition-colors ${
                      pathname === item.href
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-800 dark:hover:bg-gray-900'
                    }`}
                  >
                    {item.name}
                  </Link>
                </NavigationMenu.Item>
              ))}
            </NavigationMenu.List>
          </NavigationMenu.Root>
        </div>
      </aside>
    </>
  );
} 
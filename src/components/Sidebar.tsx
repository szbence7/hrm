'use client';

import { useState, createContext, useContext } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Palmtree, 
  BarChart3, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const navigationItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Employees', href: '/employees', icon: Users },
  { name: 'Schedule', href: '/schedule', icon: Calendar },
  { name: 'Holidays', href: '/holidays', icon: Palmtree },
  { name: 'Reports', href: '/reports', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
];

type SidebarContextType = {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
};

export const SidebarContext = createContext<SidebarContextType | null>(null);

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed }}>
      {children}
    </SidebarContext.Provider>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const { isCollapsed, setIsCollapsed } = useSidebar();

  return (
    <>
      {/* Navbar */}
      <div className={`fixed top-0 ${isCollapsed ? 'left-20' : 'left-64'} right-0 h-16 bg-gray-900 dark:bg-gray-950 z-10 transition-all duration-300`}>
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
      <aside className={`${isCollapsed ? 'w-20' : 'w-64'} h-screen bg-gray-900 dark:bg-gray-950 text-white fixed left-0 top-0 transition-all duration-300`}>
        <div className={`${isCollapsed ? 'px-2' : 'px-6'} py-6 h-full flex flex-col transition-all duration-300`}>
          <h1 className={`text-2xl font-bold mb-8 overflow-hidden whitespace-nowrap ${isCollapsed ? 'text-center text-lg' : ''}`}>
            {isCollapsed ? 'HRM' : 'HRM System'}
          </h1>
          <NavigationMenu.Root className="relative flex-grow">
            <NavigationMenu.List className="flex flex-col gap-2">
              {navigationItems.map((item) => (
                <NavigationMenu.Item key={item.href}>
                  <Link
                    href={item.href}
                    className={`group flex items-center ${isCollapsed ? 'px-2' : 'px-4'} py-2 rounded-lg transition-colors ${
                      pathname === item.href
                        ? 'bg-blue-600'
                        : 'hover:bg-gray-800 dark:hover:bg-gray-900'
                    } ${isCollapsed ? 'justify-center' : ''}`}
                  >
                    <item.icon 
                      className={`w-5 h-5 ${isCollapsed ? '' : 'mr-3'} ${
                        pathname === item.href 
                          ? 'text-white' 
                          : 'text-gray-400 group-hover:text-white'
                      }`}
                    />
                    <span className={`${
                      pathname === item.href 
                        ? 'text-white' 
                        : 'text-gray-400 group-hover:text-white'
                    } ${isCollapsed ? 'hidden' : 'block'}`}>
                      {item.name}
                    </span>
                  </Link>
                </NavigationMenu.Item>
              ))}
            </NavigationMenu.List>
          </NavigationMenu.Root>
          
          {/* Toggle Button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`mt-4 flex items-center justify-center w-full ${isCollapsed ? 'px-2' : 'px-4'} py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors`}
          >
            {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            <span className={`ml-2 ${isCollapsed ? 'hidden' : 'block'}`}>
              {isCollapsed ? 'Expand' : 'Collapse'}
            </span>
          </button>
        </div>
      </aside>
    </>
  );
} 
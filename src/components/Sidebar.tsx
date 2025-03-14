'use client';

import { useState, createContext, useContext, useEffect } from 'react';
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
  ChevronRight,
  User
} from 'lucide-react';

const navigationItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Employees', href: '/employees', icon: Users },
  { name: 'Schedule', href: '/schedule', icon: Calendar },
  { name: 'Holidays', href: '/holidays', icon: Palmtree },
  { name: 'My Schedule', href: '/myschedule', icon: Calendar },
  { name: 'My Holidays', href: '/myholidays', icon: Palmtree },
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

  useEffect(() => {
    // Kezdeti ellenőrzés
    const checkWidth = () => {
      if (window.innerWidth < 768) { // 768px a tipikus tablet/mobil breakpoint
        setIsCollapsed(true);
      }
    };

    // Ellenőrizzük a kezdeti betöltéskor
    checkWidth();

    // Figyeljük az ablak átméretezését
    window.addEventListener('resize', checkWidth);

    // Cleanup
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

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
      <div className="fixed top-0 left-0 right-0 h-16 bg-gray-900 dark:bg-gray-950 z-20">
        <div className="h-full px-6 flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-bold text-white">HRM System</h1>
          <div className="flex items-center gap-2 md:gap-4">
            <button className="text-gray-300 hover:text-white">
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                <span className="text-white text-sm">JD</span>
              </div>
              <span className="text-gray-300 hidden md:inline">John Doe</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <aside className={`fixed bg-gray-900 dark:bg-gray-950 text-white transition-all duration-300 overflow-y-auto
        md:left-0 md:top-16 md:bottom-0 ${isCollapsed ? 'md:w-20' : 'md:w-64'}
        left-0 right-0 bottom-0 md:h-auto h-20 z-10`}>
        <div className={`h-full flex ${isCollapsed ? 'md:px-2' : 'md:px-4 md:px-6'} transition-all duration-300
          md:flex-col md:py-4 md:py-6
          px-2 py-1 flex-row items-center justify-around md:items-stretch`}>
          <NavigationMenu.Root className="relative flex-grow">
            <NavigationMenu.List className="flex md:flex-col gap-1 md:gap-2 justify-around md:justify-start">
              {navigationItems.map((item) => (
                <NavigationMenu.Item key={item.href} className="flex flex-col items-center md:block">
                  <Link
                    href={item.href}
                    className={`group flex flex-col md:flex-row items-center 
                      ${isCollapsed ? 'md:px-2' : 'md:px-3 md:px-4'} 
                      px-2 py-1 md:py-2 rounded-lg transition-colors 
                      ${pathname === item.href
                        ? 'bg-blue-600'
                        : 'hover:bg-gray-800 dark:hover:bg-gray-900'
                      } ${isCollapsed ? 'md:justify-center' : ''}`}
                  >
                    <item.icon 
                      className={`w-5 h-5 ${
                        isCollapsed ? '' : 'md:mr-3'
                      } ${pathname === item.href 
                          ? 'text-white' 
                          : 'text-gray-400 group-hover:text-white'
                      }`}
                    />
                    <span className={`${
                      pathname === item.href 
                        ? 'text-white' 
                        : 'text-gray-400 group-hover:text-white'
                      } ${isCollapsed ? 'md:hidden' : 'md:block'} 
                      text-xs md:text-base mt-1 md:mt-0`}>
                      {item.name}
                    </span>
                  </Link>
                </NavigationMenu.Item>
              ))}
            </NavigationMenu.List>
          </NavigationMenu.Root>
          
          {/* Toggle Button - Only visible on desktop */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`mt-4 hidden md:flex items-center justify-center w-full 
              ${isCollapsed ? 'px-2' : 'px-3 md:px-4'} 
              py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors`}
          >
            {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            <span className={`ml-2 ${isCollapsed ? 'hidden' : 'block'} text-sm md:text-base`}>
              {isCollapsed ? 'Expand' : 'Collapse'}
            </span>
          </button>
        </div>
      </aside>
    </>
  );
} 
'use client';

import { useSidebar } from "./Sidebar";

export default function MainContent({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar();
  
  return (
    <div className={`${isCollapsed ? 'md:ml-20' : 'md:ml-64'} transition-all duration-300 pt-16 min-h-screen dark:bg-gray-950
      w-full md:w-auto pb-24 md:pb-6 relative z-0`}>
      <main className="p-4 md:p-6 overflow-x-auto max-w-screen-xl mx-auto">
        {children}
      </main>
    </div>
  );
} 
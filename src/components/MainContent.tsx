'use client';

import { useSidebar } from "./Sidebar";

export default function MainContent({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar();
  
  return (
    <div className={`${isCollapsed ? 'ml-20' : 'ml-64'} transition-all duration-300 pt-16 min-h-screen dark:bg-gray-950 w-[calc(100vw-theme(spacing.20))] md:w-auto`}>
      <main className="p-4 md:p-6 overflow-x-auto">
        {children}
      </main>
    </div>
  );
} 
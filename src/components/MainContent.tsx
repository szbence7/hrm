'use client';

import { useSidebar } from "./Sidebar";

export default function MainContent({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar();
  
  return (
    <div className={`${isCollapsed ? 'ml-20' : 'ml-64'} transition-all duration-300 pt-16 min-h-screen dark:bg-gray-950`}>
      <main className="p-6">
        {children}
      </main>
    </div>
  );
} 
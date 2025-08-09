import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title, subtitle }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-surface-primary flex">
      {/* Sidebar - Fixed to the left */}
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />

      {/* Main Content Area */}
      <div
        className={cn(
          "flex-1 flex flex-col transition-all duration-300 ease-in-out",
          sidebarCollapsed ? "ml-20" : "ml-64"
        )}
      >
        {/* Header - Inside main content */}
        <Header
          title={title}
          subtitle={subtitle}
          onToggleSidebar={toggleSidebar}
        />

        {/* Main Content */}
        <main className="flex-1 pt-16 pb-16">
          <div className="p-6 font-body min-h-full">{children}</div>
        </main>

        {/* Footer - Fixed at bottom */}
        <footer className="bg-surface-card border-t border-gray-200 py-4 shadow-soft">
          <div className="px-6 text-center text-sm text-text-secondary font-body">
            © 2025 StudentPro - Sistema de Predição de Performance Estudantil.
            Todos os direitos reservados.
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;

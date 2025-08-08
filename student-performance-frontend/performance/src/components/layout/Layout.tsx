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
    <div className="min-h-screen bg-gray-50">
      <Header title={title} subtitle={subtitle} />
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />

      <main
        className={cn(
          "pt-16 transition-all duration-300 ease-in-out",
          sidebarCollapsed ? "ml-20" : "ml-64"
        )}
      >
        <div className="p-6">{children}</div>
      </main>

      {/* Footer */}
      <footer
        className={cn(
          "bg-white border-t border-gray-100 py-4 transition-all duration-300 ease-in-out",
          sidebarCollapsed ? "ml-20" : "ml-64"
        )}
      >
        <div className="px-6 text-center text-sm text-gray-400">
          © 2025 StudentPro - Sistema de Gerenciamento e Predição de
          Performance Estudantil. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
};

export default Layout;

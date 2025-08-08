import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  BarChart3,
  Settings,
  UserPlus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

const menuItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    label: "Turmas",
    icon: GraduationCap,
    href: "/",
  },
  {
    label: "Estudantes",
    icon: Users,
    href: "/estudantes",
  },
  {
    label: "Adicionar Aluno",
    icon: UserPlus,
    href: "/cadastrar-aluno",
  },
  {
    label: "Relatórios",
    icon: BarChart3,
    href: "/relatorios",
  },
];

const Sidebar: React.FC<SidebarProps> = ({ collapsed = false, onToggle }) => {
  const location = useLocation();

  return (
    <aside
      className={cn(
        "fixed left-0 top-16 bottom-0 z-40 bg-brand-primary transition-all duration-300 ease-in-out",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex flex-col h-full">
        {/* Toggle Button */}
        <div className="flex justify-end p-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="text-white hover:bg-brand-secondary"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Logo Section */}
        <div className="px-6 py-4 border-b border-brand-secondary/20">
          {!collapsed ? (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-brand-primary font-bold text-lg">SP</span>
              </div>
              <div>
                <h2 className="font-heading font-bold text-white text-lg">
                  StudentPro
                </h2>
                <p className="text-blue-200 text-sm">ML Education</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-brand-primary font-bold text-lg">SP</span>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-3 py-6 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center px-3 py-3 rounded-lg transition-all duration-200 group",
                  isActive
                    ? "bg-brand-secondary text-white shadow-lg"
                    : "text-blue-100 hover:bg-brand-secondary/50 hover:text-white",
                  collapsed ? "justify-center" : "justify-start"
                )}
              >
                <Icon className={cn("h-5 w-5", collapsed ? "" : "mr-3")} />
                {!collapsed && (
                  <span className="font-body font-medium">{item.label}</span>
                )}
                {collapsed && (
                  <div className="absolute left-16 bg-gray-900 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Settings at Bottom */}
        <div className="px-3 py-4 border-t border-brand-secondary/20">
          <Link
            to="/configuracoes"
            className={cn(
              "flex items-center px-3 py-3 rounded-lg transition-all duration-200 text-blue-100 hover:bg-brand-secondary/50 hover:text-white group",
              collapsed ? "justify-center" : "justify-start"
            )}
          >
            <Settings className={cn("h-5 w-5", collapsed ? "" : "mr-3")} />
            {!collapsed && (
              <span className="font-body font-medium">Configurações</span>
            )}
            {collapsed && (
              <div className="absolute left-16 bg-gray-900 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                Configurações
              </div>
            )}
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

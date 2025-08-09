import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  UserPlus,
  GraduationCap,
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
    label: "Turmas",
    icon: Home,
    href: "/",
    description: "Gerenciar turmas e estudantes",
  },
  {
    label: "Adicionar Estudante",
    icon: UserPlus,
    href: "/cadastrar-aluno",
    description: "Cadastrar novo estudante",
  },
];

const Sidebar: React.FC<SidebarProps> = ({ collapsed = false, onToggle }) => {
  const location = useLocation();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 bottom-0 z-50 bg-surface-card border-r border-gray-200 transition-all duration-300 ease-in-out shadow-medium",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <div className="px-4 py-6 border-b border-gray-100">
          {!collapsed ? (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-jade-500 rounded-xl flex items-center justify-center shadow-soft">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="font-heading font-bold text-text-primary text-lg">
                  StudentPro
                </h2>
                <p className="text-text-secondary text-sm font-body">
                  ML Education System
                </p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-10 h-10 bg-jade-500 rounded-xl flex items-center justify-center shadow-soft">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
            </div>
          )}
        </div>

        {/* Toggle Button */}
        <div className="flex justify-end p-3 border-b border-gray-100">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="text-text-secondary hover:bg-gray-100 hover:text-text-body"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
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
                  "flex items-center px-4 py-3 rounded-lg transition-all duration-200 group relative font-body",
                  isActive
                    ? "bg-jade-50 text-jade-700 border-l-4 border-jade-500 shadow-soft"
                    : "text-text-body hover:bg-gray-50 hover:text-jade-600",
                  collapsed ? "justify-center" : "justify-start"
                )}
              >
                <Icon className={cn("h-5 w-5", collapsed ? "" : "mr-3")} />
                {!collapsed && (
                  <div>
                    <span className="font-medium">{item.label}</span>
                    <p className="text-xs text-text-secondary mt-0.5">
                      {item.description}
                    </p>
                  </div>
                )}
                {collapsed && (
                  <div className="absolute left-full ml-2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 shadow-strong">
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs text-gray-300">
                      {item.description}
                    </div>
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* System Info at Bottom */}
        <div className="px-4 py-4 border-t border-gray-100">
          {!collapsed ? (
            <div className="text-center">
              <p className="text-xs text-text-secondary font-body">
                Versão 1.0.0
              </p>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-2 h-2 bg-jade-500 rounded-full"></div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

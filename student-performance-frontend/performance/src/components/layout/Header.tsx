import React from "react";
import { User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  title: string;
  subtitle?: string;
  onToggleSidebar?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  onToggleSidebar,
}) => {
  return (
    <header className=" z-40 h-16 bg-surface-card border-b border-gray-200 shadow-soft">
      <div className="flex items-center justify-between h-full px-6">
        {/* Left Section - Page Title and Menu Toggle */}
        <div className="flex items-center space-x-4">
          {onToggleSidebar && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleSidebar}
              className="text-text-secondary hover:bg-gray-100 hover:text-text-body md:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <div>
            <h1 className="font-heading font-semibold text-h3 text-text-primary">
              {title}
            </h1>
            {subtitle && (
              <p className="text-body-sm text-text-secondary font-body">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Right Section - User Profile and Actions */}
        <div className="flex items-center space-x-4">
          {/* User Profile */}

          {/* Profile Picture */}
          <div className="w-8 h-8 bg-jade-500 rounded-full flex items-center justify-center ring-2 ring-jade-100">
            <User className="h-4 w-4 text-white" />
          </div>
          {/* User Name */}
          <div className="text-left hidden sm:block">
            <p className="font-body font-medium text-text-body text-sm">
              Prof. João Silva
            </p>
            <p className="font-body text-text-secondary text-xs">
              Administrador
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

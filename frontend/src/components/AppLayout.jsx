
import { useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown, Link as LinkIcon, LogOut, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { useToast } from "@/components/ui/use-toast";

const AppLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const { toast } = useToast();
  const [userName] = useState("John Doe");

  const handleLogout = () => {
    // This is where you would handle logout
    // toast({
    //   title: "Logged out",
    //   description: "You've been logged out successfully.",
    // });
    navigate("/login");
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top navigation bar */}
      <header className="border-b bg-white">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <div className="mr-4 flex">
            <Link to="/dashboard" className="flex items-center">
              <span className="text-xl font-bold text-brand-700">SnapURL</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 mx-6">
            <Link
              to="/dashboard"
              className={`text-sm font-medium transition-colors ${
                isActive("/dashboard")
                  ? "text-brand-800"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/links"
              className={`text-sm font-medium transition-colors ${
                isActive("/links")
                  ? "text-brand-800"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              My Links
            </Link>
            <Link
              to="/analytics"
              className={`text-sm font-medium transition-colors ${
                isActive("/analytics")
                  ? "text-brand-800"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              Analytics
            </Link>
          </nav>
          <div className="ml-auto flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-medium">
                    {userName.charAt(0)}
                  </div>
                  <span className="text-sm hidden sm:block">{userName}</span>
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="flex items-center gap-2 cursor-pointer">
                    <Settings size={16} />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 cursor-pointer">
                  <LogOut size={16} />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t py-4">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 SnapURL. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                Terms
              </Link>
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
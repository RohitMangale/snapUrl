import { useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown, LogOut, Settings } from "lucide-react";
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
    // toast({
    //   title: "Logged out",
    //   description: "You've been logged out successfully.",
    // });
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  const NavLink = ({ to, label }) => (
    <Link
      to={to}
      className={`text-sm font-medium transition-colors ${
        isActive(to)
          ? "text-brand-800"
          : "text-muted-foreground hover:text-primary"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">


      <main className="flex-1">
        <Outlet />
      </main>

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
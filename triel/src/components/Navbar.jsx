import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/redux/slices/authSlice'; // adjust the path as needed

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, LogOut, Settings } from 'lucide-react';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector((state) => state.auth.user);
  const userName = user?.email  || 'User'; // fallback

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const NavLink = ({ to, label }) => (
    <Link
      to={to}
      className="text-sm font-medium text-muted-foreground hover:text-foreground"
    >
      {label}
    </Link>
  );

  return (
    <header className="border-b bg-white">
      <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
        <Link to="/" className="mr-4 flex items-center">
          <span className="text-xl font-bold text-brand-700">SnapURL</span>
        </Link>

        {user ? (
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 mx-6">
            <NavLink to="/dashboard" label="Dashboard" />
            <NavLink to="/links" label="My Links" />
            <NavLink to="/analytics" label="Analytics" />
          </nav>
        ) : (
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/features" label="Features" />
            <NavLink to="/pricing" label="Pricing" />
          </nav>
        )}

        <div className="ml-auto flex items-center space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-medium">
                    {userName.charAt(0).toUpperCase()}
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
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <NavLink to="/login" label="Log in" />
              <Link to="/signup">
                <Button className="bg-brand-600 hover:bg-brand-700">Sign up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

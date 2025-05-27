import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "@/api/axios";
import { loginStart,loginFailure,loginSuccess } from "../redux/slices/authSlice"; // adjust import if needed

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(loginStart());
try {
  const response = await axios.post('/auth/login', { email, password });
  dispatch(loginSuccess(response.data));
   toast.success('Login Successful');
  navigate('/dashboard');
} catch (error) {
  dispatch(loginFailure(error.response?.data?.message || 'Login failed'));
  toast.error(error.response?.data?.message || 'Login failed');
}
     finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-secondary/50 to-background">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="text-3xl font-bold text-brand-700">
            SnapURL
          </Link>
          <p className="text-muted-foreground mt-2">Shorten. Share. Track.</p>
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Enter your email to sign in to your account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="hello@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-brand-600 hover:text-brand-700"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full bg-brand-600 hover:bg-brand-700"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
              <div className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-brand-600 hover:text-brand-700 font-medium underline-offset-4 hover:underline"
                >
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;

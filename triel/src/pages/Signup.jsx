import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import axios from "@/api/axios";
import { toast } from "react-toastify";
import { signupStart, signupSuccess, signupFailure } from "@/redux/slices/authSlice";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signupStart());

    try {
      const res = await axios.post('/auth/signup', { email, password });
      dispatch(signupSuccess(res.data));
      toast.success("Account created! You've successfully signed up!");
      navigate("/login");
    } catch (err) {
      dispatch(signupFailure(err.response?.data?.error || "Signup failed"));
      toast.error(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-secondary/50 to-background">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to='/' className="text-3xl font-bold text-brand-700">SnapURL</Link>
          <p className="text-muted-foreground mt-2">Shorten. Share. Track.</p>
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Create an account</CardTitle>
            <CardDescription>Enter your details to create your account</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 ">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="hello@example.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2 ">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full bg-brand-600 hover:bg-brand-700" disabled={loading}>
                {loading ? 'Creating account...' : 'Create account'}
              </Button>
              <div className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-brand-600 hover:text-brand-700 font-medium underline-offset-4 hover:underline">
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Signup;

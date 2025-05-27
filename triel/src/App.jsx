
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AppLayout from "./components/AppLayout";
import { ToastContainer } from "react-toastify";
// import NotFound from "./pages/NotFound";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ToastContainer position="top-right" autoClose={3000} />

      <Sonner />
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<AppLayout />}>

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/links" element={<Dashboard />} /> {/* We'll implement this later */}
            <Route path="/analytics" element={<Dashboard />} /> {/* We'll implement this later */}
            <Route path="/settings" element={<Dashboard />} /> {/* We'll implement this later */}
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
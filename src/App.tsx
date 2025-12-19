import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import FarmerPage from "./pages/FarmerPage";
import MiddlemanPage from "./pages/MiddlemanPage";
import RetailerPage from "./pages/RetailerPage";
import ConsumerPage from "./pages/ConsumerPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/farmer" element={<FarmerPage />} />
          <Route path="/middleman" element={<MiddlemanPage />} />
          <Route path="/retailer" element={<RetailerPage />} />
          <Route path="/consumer" element={<ConsumerPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

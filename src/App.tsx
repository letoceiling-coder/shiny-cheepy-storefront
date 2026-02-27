import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { AdminLayout } from "./admin/components/AdminLayout";
import DashboardPage from "./admin/pages/DashboardPage";
import ParserPage from "./admin/pages/ParserPage";
import ProductsPage from "./admin/pages/ProductsPage";
import CategoriesPage from "./admin/pages/CategoriesPage";
import AiPage from "./admin/pages/AiPage";
import SchedulerPage from "./admin/pages/SchedulerPage";
import ExcludedPage from "./admin/pages/ExcludedPage";
import LogsPage from "./admin/pages/LogsPage";
import RolesPage from "./admin/pages/RolesPage";
import SettingsPage from "./admin/pages/SettingsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />

          {/* Admin routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="parser" element={<ParserPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="categories" element={<CategoriesPage />} />
            <Route path="ai" element={<AiPage />} />
            <Route path="scheduler" element={<SchedulerPage />} />
            <Route path="excluded" element={<ExcludedPage />} />
            <Route path="logs" element={<LogsPage />} />
            <Route path="roles" element={<RolesPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

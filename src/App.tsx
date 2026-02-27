import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/AuthPage";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import FavoritesPage from "./pages/FavoritesPage";
import CartPage from "./pages/CartPage";
import AccountLayout from "./pages/account/AccountLayout";
import PersonalDataPage from "./pages/account/PersonalDataPage";
import OrdersPage from "./pages/account/OrdersPage";
import PaymentMethodsPage from "./pages/account/PaymentMethodsPage";
import BalancePage from "./pages/account/BalancePage";
import CouponsPage from "./pages/account/CouponsPage";
import ReceiptsPage from "./pages/account/ReceiptsPage";
import ReferralPage from "./pages/account/ReferralPage";
import ChangePasswordPage from "./pages/account/ChangePasswordPage";
import { AdminLayout } from "./admin/components/AdminLayout";
import DashboardPage from "./admin/pages/DashboardPage";
import ParserPage from "./admin/pages/ParserPage";
import ProductsPage from "./admin/pages/ProductsPage";
import ProductDetailPage from "./admin/pages/ProductDetailPage";
import CategoriesPage from "./admin/pages/CategoriesPage";
import BrandsPage from "./admin/pages/BrandsPage";
import FiltersPage from "./admin/pages/FiltersPage";
import AiPage from "./admin/pages/AiPage";
import SchedulerPage from "./admin/pages/SchedulerPage";
import ExcludedPage from "./admin/pages/ExcludedPage";
import LogsPage from "./admin/pages/LogsPage";
import RolesPage from "./admin/pages/RolesPage";
import SettingsPage from "./admin/pages/SettingsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <FavoritesProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/category/:slug" element={<CategoryPage />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/cart" element={<CartPage />} />

                {/* Account routes */}
                <Route path="/account" element={<AccountLayout />}>
                  <Route index element={<PersonalDataPage />} />
                  <Route path="orders" element={<OrdersPage />} />
                  <Route path="payment" element={<PaymentMethodsPage />} />
                  <Route path="balance" element={<BalancePage />} />
                  <Route path="favorites" element={<FavoritesPage />} />
                  <Route path="coupons" element={<CouponsPage />} />
                  <Route path="receipts" element={<ReceiptsPage />} />
                  <Route path="referral" element={<ReferralPage />} />
                  <Route path="password" element={<ChangePasswordPage />} />
                </Route>

                {/* Admin routes */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<DashboardPage />} />
                  <Route path="parser" element={<ParserPage />} />
                  <Route path="products" element={<ProductsPage />} />
                  <Route path="products/:id" element={<ProductDetailPage />} />
                  <Route path="categories" element={<CategoriesPage />} />
                  <Route path="brands" element={<BrandsPage />} />
                  <Route path="filters" element={<FiltersPage />} />
                  <Route path="ai" element={<AiPage />} />
                  <Route path="scheduler" element={<SchedulerPage />} />
                  <Route path="excluded" element={<ExcludedPage />} />
                  <Route path="logs" element={<LogsPage />} />
                  <Route path="roles" element={<RolesPage />} />
                  <Route path="settings" element={<SettingsPage />} />
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </FavoritesProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

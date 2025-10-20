import { Toaster } from "@/components/ui/toaster.tsx";
import { Toaster as Sonner } from "@/components/ui/sonner.tsx";
import { TooltipProvider } from "@/components/ui/tooltip.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore.ts";
import Layout from "@/components/layout/Layout.tsx";
import ProtectedRoute from "@/components/ProtectedRoute.tsx";
import Login from "@/pages/Login.tsx";
import AllInternships from "@/pages/AllInternships.tsx";
import StudentInternships from "@/pages/StudentInternships.tsx";
import InternshipDetail from "@/pages/InternshipDetail.tsx";
import InternshipJournal from "@/pages/InternshipJournal.tsx";
import Instructions from "@/pages/Instructions.tsx";
import Advertisements from "@/pages/Advertisements.tsx";
import Candidates from "@/pages/Candidates.tsx";
import Interns from "@/pages/Interns.tsx";
import NotFound from "./pages/NotFound.tsx";
import MyApplications from "@/pages/MyApplications.tsx";
import {useEffect} from "react";
import CoordinatorStatistics from "@/pages/CoordinatorStatistics.tsx";

const queryClient = new QueryClient();

const App = () => {
  const { isAuthenticated, user, logout } = useAuthStore();

  useEffect(() => {

    const token = localStorage.getItem("auth-token")

    if(token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const exp = payload.exp

      const expMilliseconds = exp * 1000
      const isExpired = Date.now() > expMilliseconds;

      if(isExpired) {
        localStorage.removeItem("auth-token")
        logout()
      }
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={
              isAuthenticated ? <Navigate to={user?.role === 'Admin' ? '/all-internships' : '/instructions'} replace /> : <Login />
            } />
            
            <Route path="/" element={
              <Navigate to={isAuthenticated ? '/instructions' : '/login'} replace />
            } />

            <Route path="/instructions" element={
              <ProtectedRoute>
                <Layout>
                  <Instructions />
                </Layout>
              </ProtectedRoute>
            } />

            <Route path="/internships" element={
              <ProtectedRoute allowedRoles={['Student']}>
                <Layout>
                  <StudentInternships />
                </Layout>
              </ProtectedRoute>
            } />

            <Route path="/all-internships" element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <Layout>
                  <AllInternships />
                </Layout>
              </ProtectedRoute>
            } />

            <Route path="/advertisements" element={
              <ProtectedRoute allowedRoles={['Student', 'Company', 'Coordinator', 'Admin']}>
                <Layout>
                  <Advertisements />
                </Layout>
              </ProtectedRoute>
            } />

            <Route path="/my-applications" element={
              <ProtectedRoute allowedRoles={['Student']}>
                <Layout>
                  <MyApplications />
                </Layout>
              </ProtectedRoute>
            } />

            {/* Internship detail routes */}
            <Route path="/internship/:id" element={
              <ProtectedRoute allowedRoles={['Student', 'Company', 'Coordinator', 'Admin']}>
                <Layout>
                  <InternshipDetail />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/internship/:id/journal" element={
              <ProtectedRoute allowedRoles={['Student', 'Company', 'Coordinator', 'Admin']}>
                <Layout>
                  <InternshipJournal />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/internship/:id/edit" element={
              <ProtectedRoute allowedRoles={['Student', 'Company', 'Coordinator']}>
                <Layout>
                  <div className="text-center py-12">
                    <h1 className="text-2xl font-bold mb-4">Уредување на пракса</h1>
                    <p className="text-muted-foreground">Оваа страница е во развој.</p>
                  </div>
                </Layout>
              </ProtectedRoute>
            } />

            <Route path="/candidates" element={
              <ProtectedRoute allowedRoles={['Company','Admin']}>
                <Layout>
                  <Candidates />
                </Layout>
              </ProtectedRoute>
            } />

            <Route path="/interns" element={
              <ProtectedRoute allowedRoles={['Company', 'Coordinator']}>
                <Layout>
                  <Interns />
                </Layout>
              </ProtectedRoute>
            } />

            <Route path="/coordinators" element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <Layout>
                  <CoordinatorStatistics />
                </Layout>
              </ProtectedRoute>
            } />

            <Route path="/unauthorized" element={
              <Layout>
                <div className="text-center py-12">
                  <h1 className="text-2xl font-bold mb-4">Неавторизиран пристап</h1>
                  <p className="text-muted-foreground">Немате дозвола за пристап до оваа страница.</p>
                </div>
              </Layout>
            } />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

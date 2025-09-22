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
import Announcements from "@/pages/Announcements.tsx";
import Candidates from "@/pages/Candidates.tsx";
import Practicants from "@/pages/Practicants.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={
              isAuthenticated ? <Navigate to={user?.role === 'Coordinator' ? '/all-internships' : '/internships'} replace /> : <Login />
            } />
            
            <Route path="/" element={
              <Navigate to={isAuthenticated ? (user?.role === 'Coordinator' ? '/all-internships' : '/internships') : '/login'} replace />
            } />

            <Route path="/internships" element={
              <ProtectedRoute allowedRoles={['Student', 'Company']}>
                <Layout>
                  <StudentInternships />
                </Layout>
              </ProtectedRoute>
            } />

            <Route path="/all-internships" element={
              <ProtectedRoute allowedRoles={['Coordinator']}>
                <Layout>
                  <AllInternships />
                </Layout>
              </ProtectedRoute>
            } />

            <Route path="/instructions" element={
              <ProtectedRoute>
                <Layout>
                  <Instructions />
                </Layout>
              </ProtectedRoute>
            } />

            <Route path="/announcements" element={
              <ProtectedRoute allowedRoles={['Company', 'Coordinator']}>
                <Layout>
                  <Announcements />
                </Layout>
              </ProtectedRoute>
            } />

            {/* Internship detail routes */}
            <Route path="/internship/:id" element={
              <ProtectedRoute allowedRoles={['Student', 'Company', 'Coordinator']}>
                <Layout>
                  <InternshipDetail />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/internship/:id/journal" element={
              <ProtectedRoute allowedRoles={['Student', 'Company', 'Coordinator']}>
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
              <ProtectedRoute allowedRoles={['Company', 'Coordinator']}>
                <Layout>
                  <Candidates />
                </Layout>
              </ProtectedRoute>
            } />

            <Route path="/practicants" element={
              <ProtectedRoute allowedRoles={['Student', 'Company', 'Coordinator']}>
                <Layout>
                  <Practicants />
                </Layout>
              </ProtectedRoute>
            } />

            <Route path="/coordinators" element={
              <ProtectedRoute allowedRoles={['Coordinator']}>
                <Layout>
                  <div className="text-center py-12">
                    <h1 className="text-2xl font-bold mb-4">Координатори</h1>
                    <p className="text-muted-foreground">Управување со координатори</p>
                  </div>
                </Layout>
              </ProtectedRoute>
            } />

            <Route path="/unauthorized" element={
              <Layout>
                <div className="text-center py-12">
                  <h1 className="text-2xl font-bold mb-4">Неавторизован пристап</h1>
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

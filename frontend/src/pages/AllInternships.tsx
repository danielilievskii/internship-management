import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button.tsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useInternshipStore } from '@/store/internshipStore.ts';
import { useAuthStore } from '@/store/authStore.ts';
import { internshipApi } from '@/services/api.ts';
import InternshipFilters from '@/components/internships/InternshipFilters.tsx';
import InternshipTable from '@/components/internships/InternshipTable.tsx';
import { useToast } from '@/hooks/use-toast.ts';

const AllInternships = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuthStore();
  const {
    internships,
    totalPages,
    currentPage,
    pageSize,
    loading,
    filters,
    setInternships,
    setCurrentPage,
    setLoading
  } = useInternshipStore();

  const fetchInternships = async () => {
    setLoading(true);
    try {
      const data = await internshipApi.getInternships(currentPage, pageSize, filters);
      setInternships(data);
    } catch (error) {
      toast({
        title: 'Грешка',
        description: 'Неможе да се вчитаат податоците',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInternships();
  }, [currentPage, filters]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (!user || user.role !== 'Coordinator') {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Неавторизован пристап</h1>
        <p className="text-muted-foreground">Немате дозвола за пристап до оваа страница.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <InternshipFilters />
      
      {loading ? (
        <div className="text-center py-12">
          <p>Се вчитува...</p>
        </div>
      ) : (
        <>
          <InternshipTable internships={internships} />

          {/* Pagination */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(Math.max(0, currentPage - 1))}
                disabled={currentPage === 0}
              >
                Прва
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(Math.max(0, currentPage - 1))}
                disabled={currentPage === 0}
              >
                Претходна
              </Button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = i;
                  return (
                    <Button
                      key={page}
                      variant={page === currentPage ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                      className={page === currentPage ? "bg-primary text-primary-foreground" : ""}
                    >
                      {page + 1}
                    </Button>
                  );
                })}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(Math.min(totalPages - 1, currentPage + 1))}
                disabled={currentPage >= totalPages - 1}
              >
                Следна
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(totalPages - 1)}
                disabled={currentPage >= totalPages - 1}
              >
                Последна
              </Button>
            </div>

            <div className="text-sm text-muted-foreground">
              Резултати на страна: {internships.length} / Вкупно: {totalPages * pageSize}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AllInternships;
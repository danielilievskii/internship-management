import { Badge } from '@/components/ui/badge.tsx';
import { useToast } from '@/hooks/use-toast.ts';
import {useAuthStore} from "@/store/authStore.ts";
import {useEffect} from "react";
import {useInternshipStore} from "@/store/internshipStore.ts";
import {companyQueryApi} from "@/services/companyApi.ts";
import {coordinatorQueryApi} from "@/services/coordinatorApi.ts";
import {matchesSelectOption, matchesTextInput} from "@/util/dataUtils.ts";
import InternshipTable from "@/components/internships/InternshipTable.tsx";
import {Pagination} from "@/components/Pagination.tsx";
import InternshipFilters from "@/components/internships/InternshipFilters.tsx";

const Practicants = () => {
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
    setFilters,
    resetFilters,
    setCurrentPage,
    setPageSize,
    setTotalPages,
    setLoading
  } = useInternshipStore();

  const fetchInternships = async ()=> {
    setLoading(true)
    try {
      if(user && user.role === 'Company') {
        const internshipResponse = await companyQueryApi.getInternships()
        const internships = internshipResponse
            .filter((item: any) => item.status !== 'REJECTED')
        setInternships(internships)
      }
      else if(user && user.role === 'Coordinator') {
        const internshipResponse = await coordinatorQueryApi.getInternships()
        const internships = internshipResponse
            .filter((item: any) => item.status !== 'REJECTED')
        setInternships(internships)
      }
    }
    catch (error) {
      toast({
        title: 'Грешка',
        description: 'Неможе да се вчитаат податоците',
        variant: 'destructive',
      });
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchInternships()
  }, []);

  const filteredInternships = internships
      .filter(internship =>
          matchesTextInput(internship.studentView.index, filters.studentSearch) &&
          matchesSelectOption(internship.companyView.name, filters.companyFilter) &&
          matchesTextInput(internship.coordinatorView.name, filters.coordinatorSearch) &&
          matchesSelectOption(internship.status, filters.statusFilter))
      .sort((a, b) => {
        const dateA = new Date(a.period.fromDate).getTime();
        const dateB = new Date(b.period.fromDate).getTime();
        return dateB - dateA;
      });

  useEffect(() => {
    setTotalPages(Math.ceil(filteredInternships.length / pageSize));
  }, [filteredInternships.length, pageSize]);

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedInternships = filteredInternships.slice(startIndex, startIndex + pageSize);

  if (!user || (user.role !== 'Coordinator' && user.role !== 'Company')) {
    return (
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Неавторизован пристап</h1>
          <p className="text-muted-foreground">Немате дозвола за пристап до оваа страница.</p>
        </div>
    );
  }

  return (
    <div className="space-y-6">

      {loading ? (
          <div className="text-center py-12">
            <p>Се вчитува...</p>
          </div>
      ) : (
          <>
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Практиканти</h1>
              <Badge variant="secondary" className="text-sm">
                {internships.length} {internships.length === 1 ? 'активен практикант' : 'активни практиканти'}
              </Badge>
            </div>

            <InternshipFilters filters={filters} setFilters={setFilters} onReset={resetFilters} />
            <InternshipTable internships={paginatedInternships} fetchInternships={fetchInternships} />
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                pageSize={pageSize}
                totalItems={filteredInternships.length}
                onPageChange={(page) => setCurrentPage(page)}
            />

          </>
      )}

    </div>
  );
};

export default Practicants;
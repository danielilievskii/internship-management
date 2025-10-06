import { useEffect } from 'react';
import { useInternshipStore } from '@/store/internshipStore.ts';
import { useAuthStore } from '@/store/authStore.ts';
import { internshipApi } from '@/services/api.ts';
import InternshipFilters from '@/components/internships/InternshipFilters.tsx';
import InternshipTable from '@/components/internships/InternshipTable.tsx';
import { useToast } from '@/hooks/use-toast.ts';
import {matchesSelectOption, matchesTextInput} from "@/util/dataUtils.ts";
import {Pagination} from "@/components/Pagination.tsx";
import Loading from "@/pages/Loading.tsx";

const AllInternships = () => {
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

  const fetchInternships = async () => {
    setLoading(true);
    try {
      const internshipsResponse = await internshipApi.getInternships();
      const internships = internshipsResponse
        .filter((item: any) => item.status?.value !== 'SEARCHING')

      setInternships(internships);
      console.log(internships)
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

  if(loading) {
    return <Loading/>
  }

  return (
    <div className="space-y-6">
      <InternshipFilters filters={filters} setFilters={setFilters} onReset={resetFilters} />
      <InternshipTable internships={paginatedInternships} fetchInternships={fetchInternships} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        totalItems={filteredInternships.length}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default AllInternships;
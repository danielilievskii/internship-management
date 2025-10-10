import { Badge } from '@/components/ui/badge.tsx';
import { useToast } from '@/hooks/use-toast.ts';
import {useAuthStore} from "@/store/authStore.ts";
import { useEffect, useState } from "react";
import {useInternshipStore} from "@/store/internshipStore.ts";
import {companyCommandsApi, companyQueryApi} from "@/services/companyApi.ts";
import {coordinatorQueryApi} from "@/services/coordinatorApi.ts";
import {matchesSelectOption, matchesTextInput} from "@/util/dataUtils.ts";
import InternshipTable from "@/components/internships/InternshipTable.tsx";
import {Pagination} from "@/components/Pagination.tsx";
import InternshipFilters from "@/components/internships/InternshipFilters.tsx";
import Loading from "@/pages/Loading.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Plus} from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {SubmitAgreedInternshipPayload} from "@/types/internship.ts";

const Interns = () => {
  const { toast } = useToast();
  const { user } = useAuthStore();
  const [isAddInternOpen, setIsAddInternOpen] = useState(false);
  const [internFormData, setInternFormData] = useState({
    studentIndex: '',
    description: '',
    fromDate: '',
    toDate: '',
    weeklyHours: '',
    contactEmail: ''
  });
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

  const handleSubmitPracticant = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: SubmitAgreedInternshipPayload = {
      studentIndex: internFormData.studentIndex,
      description: internFormData.description,
      fromDate: internFormData.fromDate,
      toDate: internFormData.toDate,
      weeklyHours: Number(internFormData.weeklyHours),
      contactEmail: internFormData.contactEmail
    }

    await companyCommandsApi.submitAgreedInternship(payload)
    // Possibly try to fix early fetching (results in no assigned coordinator displaying while there is an assigned coordinator for the new internship)
    await fetchInternships()

    toast({
      title: "Практикант додаден",
      description: `Практикантот е успешно додаден.`
    });

    setIsAddInternOpen(false);
    setInternFormData({
      studentIndex: '',
      description: '',
      fromDate: '',
      toDate: '',
      weeklyHours: '',
      contactEmail: ''
    });
  };

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

  if(loading) {
    return <Loading/>
  }

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-start gap-4">
        <h1 className="text-3xl font-bold flex-shirnk-0">Практиканти</h1>

        <div className="flex items-center gap-6 ml-auto">
          { user.role === 'Company' &&
              <Button
                  size="lg"
                  onClick={() => setIsAddInternOpen(true)}
                  className="shadow-lg font-semibold"
              >
                <Plus className="h-5 w-5 mr-2" />
                Додади практикант
              </Button>
          }

          <Badge variant="secondary" className="text-sm">
            {internships.length} {internships.length === 1 ? 'активен практикант' : 'активни практиканти'}
          </Badge>
        </div>
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

      <Dialog open={isAddInternOpen} onOpenChange={setIsAddInternOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Додади практикант</DialogTitle>
            <DialogDescription>
              Внесете ги деталите за практикантот што сакате да го додадете.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitPracticant}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="studentIndex">Индекс на студент</Label>
                <Input
                    id="studentIndex"
                    value={internFormData.studentIndex}
                    onChange={(e) => setInternFormData({ ...internFormData, studentIndex: e.target.value })}
                    placeholder="222077"
                    required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="practicantDescription">Опис на праксата</Label>
                <Textarea
                    id="practicantDescription"
                    value={internFormData.description}
                    onChange={(e) => setInternFormData({ ...internFormData, description: e.target.value })}
                    placeholder="Опишете ги задачите и одговорностите..."
                    required
                    rows={4}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="practicantFromDate">Почетен датум</Label>
                  <Input
                      id="practicantFromDate"
                      type="date"
                      value={internFormData.fromDate}
                      onChange={(e) => setInternFormData({ ...internFormData, fromDate: e.target.value })}
                      required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="practicantToDate">Краен датум</Label>
                  <Input
                      id="practicantToDate"
                      type="date"
                      value={internFormData.toDate}
                      onChange={(e) => setInternFormData({ ...internFormData, toDate: e.target.value })}
                      required
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="practicantWeeklyHours">Работни часови во неделата</Label>
                <Input
                    id="practicantWeeklyHours"
                    type="number"
                    min="1"
                    value={internFormData.weeklyHours}
                    onChange={(e) => setInternFormData({ ...internFormData, weeklyHours: e.target.value })}
                    placeholder="Број на часови неделно"
                    required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="practicantContactEmail">Е-пошта за Контакт</Label>
                <Input
                    id="practicantContactEmail"
                    type="email"
                    value={internFormData.contactEmail}
                    onChange={(e) => setInternFormData({ ...internFormData, contactEmail: e.target.value })}
                    placeholder="email@company.com"
                    required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddInternOpen(false)}>
                Откажи
              </Button>
              <Button type="submit">
                Додади практикант
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default Interns;
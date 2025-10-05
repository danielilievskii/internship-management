import {useEffect, useState} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import {XCircle} from 'lucide-react';
import {useAuthStore} from '@/store/authStore';
import {useToast} from '@/hooks/use-toast';
import {studentCommandsApi, studentQueryApi} from "@/services/studentApi.ts";
import {matchesTextInput, matchesSelectOption} from "@/util/dataUtils.ts";
import CVUploadCard from "@/components/internships/CVUploadCard.tsx";
import InternshipsFilter from "@/components/internships/InternshipFilters.tsx";
import {mapApiInternship} from "@/services/mappers/internshipMapper.ts";
import Loading from "@/pages/Loading.tsx";
import InternshipTable from "@/components/internships/InternshipTable.tsx";
import {useInternshipStore} from "@/store/internshipStore.ts";
import {Pagination} from "@/components/Pagination.tsx";

const StudentInternships = () => {
  const {user} = useAuthStore();
  const {toast} = useToast();

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
    setTotalPages,
    setLoading
  } = useInternshipStore();

  const [error, setError] = useState<string | null>(null);

  const [displayedCV, setDisplayedCV] = useState<File | null>(null);
  const [selectedCV, setSelectedCV] = useState<File | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const fetchStudentData = () => {
    setLoading(true);

    Promise.all([
      studentQueryApi.getInternships(),
      studentQueryApi.getCV(),
    ])
      .then(([internshipsResponse, cvBlob]) => {
        // Internships
        const internships = internshipsResponse
          .filter((item: any) => item.status?.value !== 'SEARCHING')
          .map((item: any) => (mapApiInternship(item)));

        setInternships(internships);

        // CV
        if (cvBlob && cvBlob.size > 0) {
          const file = new File([cvBlob], `${user.name}.pdf`, {
            type: cvBlob.type || 'application/octet-stream',
          });
          setDisplayedCV(file);
        }
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to load data. Please try again later.");
        toast({
          title: 'Грешка при вчитување',
          description: 'Имаше грешка при вчитување на вашите податоци.',
          variant: 'destructive',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchStudentData();
  }, []);

  const filteredInternships = internships
    .filter(internship =>
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

  const handleUploadCV = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setSelectedCV(file);
        setShowConfirmDialog(true);
      }
    };
    input.click();
  };

  const handleSubmitCV = async () => {
    if (!selectedCV) return;

    try {
      await studentCommandsApi.createSearchingInternship(selectedCV)
      setDisplayedCV(selectedCV)
      setSelectedCV(null)

      toast({
        title: 'CV поднесен',
        description: `Вашето CV ${selectedCV.name} е успешно поднесен за пребарување пракса.`,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Грешка при поднесување',
        description: 'Не успеавме да го поднесеме вашето CV. Обидете се повторно.',
        variant: 'destructive',
      });
    } finally {
      setShowConfirmDialog(false);
    }
  };

  const handleDownloadCV = () => {
    if (displayedCV) {
      const url = URL.createObjectURL(displayedCV);
      const a = document.createElement('a');
      a.href = url;
      a.download = displayedCV.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleCancelSubmit = async () => {
    if (!displayedCV) return;

    try {
      await studentCommandsApi.deleteSearchingInternship()
      setDisplayedCV(null);

      toast({
        title: 'Пребарувањето за пракса откажано',
        description: `Вашето CV ${displayedCV.name} е успешно избришано како и поднесувањето за пребарување пракса.`,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Грешка при бришење',
        description: 'Не успеавме да го избришеме вашето CV. Обидете се повторно.',
        variant: 'destructive',
      });
    } finally {
      setShowConfirmDialog(false);
    }
  };

  if (!user || user.role !== 'Student') {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Неавторизиран пристап</h1>
        <p className="text-muted-foreground">Немате дозвола за пристап до оваа страница.</p>
      </div>
    );
  }

  if (loading) {
    return <Loading/>
  }

  if (error) {
    return (
      <Card className="border-red-500 bg-red-50 p-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-700">
            <XCircle className="h-5 w-5"/>
            Грешка при вчитување
          </CardTitle>
        </CardHeader>
        <CardContent className="text-red-600">
          <p className="mt-2">Проверете ја вашата интернет конекција или обидете се повторно подоцна.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Мои пракси</h1>

      <CVUploadCard
        displayedCV={displayedCV}
        handleCVUpload={handleUploadCV}
        handleCancelSubmit={handleCancelSubmit}
        handleDownloadCV={handleDownloadCV}
      />
      <InternshipsFilter
        filters={filters}
        setFilters={setFilters}
        onReset={resetFilters}
      />
      <InternshipTable internships={paginatedInternships} fetchInternships={fetchStudentData}/>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        totalItems={filteredInternships.length}
        onPageChange={(page) => setCurrentPage(page)}
      />

      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Поднесување на CV</AlertDialogTitle>
            <AlertDialogDescription>
              Дали сакате да го поднесете вашето CV "{selectedCV?.name}" за пребарување пракса? Со притискање на копчето
              „Поднеси“ ќе креирате барање за пракса.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelSubmit}>Откажи</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmitCV}>Поднеси</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default StudentInternships;
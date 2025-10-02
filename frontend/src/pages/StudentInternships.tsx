import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
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
import {InternshipStatus} from '@/types/internship';
import {studentCommandsApi, studentQueryApi} from "@/services/studentApi.ts";
import {matchesFilter} from "@/util/dataUtils.ts";
import CVUploadCard from "@/components/internships/CVUploadCard.tsx";
import InternshipsFilter from "@/components/internships/InternshipFilters.tsx";
import {mapApiInternship} from "@/services/mappers/internshipMapper.ts";
import Loading from "@/pages/Loading.tsx";
import {AcceptButton} from "@/components/styled/AcceptButton.tsx";
import {RejectButton} from "@/components/styled/RejectButton.tsx";
import {DetailsButton} from "@/components/styled/DetailsButton.tsx";
import {ViewJournalButton} from "@/components/styled/ViewJournalButton.tsx";

const StudentInternships = () => {
  const {user} = useAuthStore();
  const navigate = useNavigate();
  const {toast} = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [internships, setInternships] = useState([]);

  const [displayedCV, setDisplayedCV] = useState<File | null>(null);
  const [selectedCV, setSelectedCV] = useState<File | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const [filterCompany, setFilterCompany] = useState('all');
  const [filterCoordinator, setFilterCoordinator] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredInternships = internships.filter(internship =>
    matchesFilter(internship.companyView.name, filterCompany) &&
    matchesFilter(internship.coordinatorView.name, filterCoordinator) &&
    matchesFilter(internship.status, filterStatus)
  );

  const fetchStudentData = () => {
    setIsLoading(true);

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
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchStudentData();
  }, []);

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

  const handleAcceptInternship = async (internshipId: string) => {
    try {
      await studentCommandsApi.acceptInternship(internshipId)

      setInternships(prev =>
        prev.map(intern =>
          intern.id === internshipId
            ? {...intern, status: 'ACCEPTED' as InternshipStatus}
            : intern
        )
      );

      toast({
        title: 'Пракса прифатена',
        description: 'Успешно ја прифативте праксата.',
      });
    } catch (error) {
      toast({
        title: 'Грешка при прифаќање на пракса!',
        description: 'Се појави проблем при прифаќање на праксата. Ве молам обидете се повторно.',
        variant: 'destructive'
      });
    }
  };

  const handleRejectInternship = async (internshipId: string) => {
    try {
      await studentCommandsApi.rejectInternship(internshipId)

      setInternships(prev =>
        prev.map(intern =>
          intern.id === internshipId
            ? {...intern, status: 'REJECTED' as InternshipStatus}
            : intern
        )
      );

      toast({
        title: 'Пракса одбиена',
        description: 'Ја одбивте праксата.',
        variant: 'destructive',
      });

    } catch (error) {
      toast({
        title: 'Грешка при одбивање на пракса!',
        description: 'Се појави проблем при одбивање на праксата. Ве молам обидете се повторно.',
        variant: 'destructive'
      });
    }
  };

  const handleViewDetails = (internshipId: string) => {
    navigate(`/internship/${internshipId}`);
  };

  const handleViewJournal = (internshipId: string) => {
    navigate(`/internship/${internshipId}/journal`);
  };

  if (!user || user.role !== 'Student') {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Неавторизиран пристап</h1>
        <p className="text-muted-foreground">Немате дозвола за пристап до оваа страница.</p>
      </div>
    );
  }

  if (isLoading) {
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
        <CardContent>
          <CardDescription className="text-red-600">
            {error}
            <p className="mt-2">Проверете ја вашата интернет конекција или обидете се повторно подоцна.</p>
          </CardDescription>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* CV Upload Section */}
      <CVUploadCard
        displayedCV={displayedCV}
        handleCVUpload={handleUploadCV}
        handleCancelSubmit={handleCancelSubmit}
        handleDownloadCV={handleDownloadCV}
      />

      <InternshipsFilter
        filterCompany={filterCompany}
        setFilterCompany={setFilterCompany}
        filterCoordinator={filterCoordinator}
        setFilterCoordinator={setFilterCoordinator}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        onReset={() => {
          setFilterCompany('all');
          setFilterCoordinator('');
          setFilterStatus('all');
        }}
      />

      {/* My Applications */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Мои пракси</h2>
        <div className="grid gap-4">
          {filteredInternships.map((internship) => (
            <Card key={internship.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{internship.companyView.name}</CardTitle>
                    <CardDescription>{internship.position}</CardDescription>
                    {internship.coordinatorView &&
                        <CardDescription>Coordinator: {internship.coordinatorView.name}</CardDescription>}
                  </div>
                  <Badge
                    className={
                      internship.status === 'ACCEPTED'
                        ? 'bg-status-accepted text-status-accepted-foreground'
                        : internship.status === 'REJECTED'
                          ? 'bg-status-rejected text-status-rejected-foreground'
                          : 'bg-status-submitted text-status-submitted-foreground'
                    }
                  >
                    {internship.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {internship.period.fromDate} - {internship.period.toDate}
                </p>

                <div className="flex gap-2">
                  <DetailsButton size="sm" onClick={() => handleViewDetails(internship.id)}
                  />

                  {internship.status === 'SUBMITTED' && (
                    <>
                      <AcceptButton size="sm" onClick={() => handleAcceptInternship(internship.id)}/>
                      <RejectButton size="sm" onClick={() => handleRejectInternship(internship.id)}/>
                    </>
                  )}

                  {internship.status === 'ACCEPTED' && (
                    <ViewJournalButton size="sm" onClick={() => handleViewJournal(internship.id)}
                    />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/*/!* Pagination *!/*/}
        {/*  <div className="flex justify-between items-center mt-4">*/}
        {/*    <Button variant="outline" disabled={pagination.page === 0} onClick={() => fetchStudentInternships(pagination.page - 1)}>*/}
        {/*      Претходна*/}
        {/*    </Button>*/}
        {/*    <span>Страница {pagination.page + 1} од {pagination.totalPages}</span>*/}
        {/*    <Button variant="outline" disabled={pagination.page + 1 >= pagination.totalPages} onClick={() => fetchStudentInternships(pagination.page + 1)}>*/}
        {/*      Следна*/}
        {/*    </Button>*/}
        {/*  </div>*/}

      </div>

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
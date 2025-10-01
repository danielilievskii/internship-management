import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { FileText, Upload, Eye, CheckCircle, XCircle, Check, Download } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useToast } from '@/hooks/use-toast';
import { InternshipStatus } from '@/types/internship';
import {internshipApi} from "@/services/api.ts";

interface StudentInternship {
  id: string;
  company: string;
  position: string;
  status: InternshipStatus;
  period: { startDate: string; endDate: string };
  description: string;
}

const StudentInternships = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedCV, setSelectedCV] = useState<File | null>(null);
  const [cvSubmitted, setCvSubmitted] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [internships, setInternships] = useState<StudentInternship[]>([]);
  const [pagination, setPagination] = useState({ page: 0, size: 5, totalPages: 0, totalElements: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInternships = async (page = 0) => {

    try {
      setIsLoading(true)
      const [internshipsResponse] = await Promise.all([
        internshipApi.getStudentInternships(page,pagination.size),
      ])

      const { content, totalPages, totalElements, number, size } = internshipsResponse

      setInternships(
          (content || [])
              .filter((item: any) => item.status?.value !== 'SEARCHING') // remove SEARCHING
              .map((item: any) => ({
                id: item.id?.value || '',
                company: item.companyView?.name?.value || undefined,
                position: undefined,
                status: item.status?.value || 'UNKNOWN',
                period: {
                  startDate: item.period?.fromDate || '',
                  endDate: item.period?.toDate || '',
                },
                description: undefined
              }))
      );

      setPagination({
        page: number,
        size: size,
        totalPages: totalPages,
        totalElements: totalElements,
      });
    }
    catch (error) {
      console.error(error)
      setError("Failed to load data. Please try again later.");
      toast({
        title: 'Грешка при вчитување',
        description: 'Имаше грешка при вчитување на вашите податоци.',
        variant: 'destructive',
      });
    }
    finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if(!user || user.role !== 'Student') {
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        const [internshipsResponse, cvResponse] = await Promise.all([
            internshipApi.getStudentInternships(),
            internshipApi.getCV(),
        ])

        const { content, totalPages, totalElements, number, size } = internshipsResponse

        setInternships(
            (content || [])
                .filter((item: any) => item.status?.value !== 'SEARCHING') // remove SEARCHING
                .map((item: any) => ({
                  id: item.id?.value || '',
                  company: item.companyView?.name?.value || undefined,
                  position: undefined,
                  status: item.status?.value || 'UNKNOWN',
                  period: {
                    startDate: item.period?.fromDate || '',
                    endDate: item.period?.toDate || '',
                  },
                  description: undefined
                }))
        );

        setPagination({
          page: number,
          size: size,
          totalPages: totalPages,
          totalElements: totalElements,
        });

        if (cvResponse && cvResponse.size > 0) {
          const file = new File([cvResponse], `${user.name}.pdf`, {
            type: cvResponse.type || 'application/octet-stream',
          });
          setSelectedCV(file);
          setCvSubmitted(true)
        }
      }
      catch (error) {
        console.error(error)
        setError("Failed to load data. Please try again later.");
        toast({
          title: 'Грешка при вчитување',
          description: 'Имаше грешка при вчитување на вашите податоци.',
          variant: 'destructive',
        });
      }
      finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, []);

  const handleCVUpload = () => {
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
      await internshipApi.submitCV(selectedCV)
      setCvSubmitted(true)

      toast({
        title: 'CV поднесен',
        description: `Вашиот CV ${selectedCV.name} е успешно поднесен за пребарување пракса.`,
      });
    }
    catch (error) {
      console.error(error);
      toast({
        title: 'Грешка при поднесување',
        description: 'Не успеавме да го поднесеме вашиот CV. Обидете се повторно.',
        variant: 'destructive',
      });
    } finally {
      setShowConfirmDialog(false);
    }
  };

  const handleDownloadCV = () => {
    if (selectedCV) {
      const url = URL.createObjectURL(selectedCV);
      const a = document.createElement('a');
      a.href = url;
      a.download = selectedCV.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleCancelSubmit = async () => {
    if (!selectedCV) return;

    try {
      await internshipApi.deleteSearchingInternship()

      setSelectedCV(null);
      setCvSubmitted(false)
      toast({
        title: 'CV успешно пребришано',
        description: `Вашието CV ${selectedCV.name} е успешно пребришано како и поднесувањето за пребарување пракса.`,
      });
    }
    catch (error) {
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

  const handleAcceptInternship = (internshipId: string) => {
    setInternships(prev =>
        prev.map(intern =>
            intern.id === internshipId
                ? { ...intern, status: 'ACCEPTED' as InternshipStatus }
                : intern
        )
    );
    toast({
      title: 'Пракса прифатена',
      description: 'Успешно ја прифативте праксата.',
    });
  };

  const handleRejectInternship = (internshipId: string) => {
    setInternships(prev =>
        prev.map(intern =>
            intern.id === internshipId
                ? { ...intern, status: 'REJECTED' as InternshipStatus }
                : intern
        )
    );
    toast({
      title: 'Пракса одбиена',
      description: 'Ја одбивте праксата.',
      variant: 'destructive',
    });
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
          <h1 className="text-2xl font-bold mb-4">Неавторизован пристап</h1>
          <p className="text-muted-foreground">Немате дозвола за пристап до оваа страница.</p>
        </div>
    );
  }

  if (isLoading) {
    return (
        <div className="flex justify-center items-center h-64">
          <div className="flex flex-col items-center space-y-3">
            <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-lg text-muted-foreground">Вчитување на податоците за пракса...</p>
          </div>
        </div>
    );
  }

  if (error) {
    return (
        <Card className="border-red-500 bg-red-50 p-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-700">
              <XCircle className="h-5 w-5" />
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
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  CV
                </CardTitle>
                <CardDescription>
                  Прикачете го вашето CV за да можете да аплицирате за пракси
                </CardDescription>
              </div>
              {cvSubmitted && selectedCV && (
                  <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDownloadCV}
                      className="shrink-0"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Симни
                  </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className={`border-2 border-dashed rounded-lg p-6 text-center ${
                selectedCV
                    ? 'border-primary bg-primary/5 border-solid'
                    : 'border-muted-foreground/25'
            }`}>
              {selectedCV ? (
                  <Check className="h-12 w-12 mx-auto mb-4 text-primary" />
              ) : (
                  <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              )}
              <p className="mb-4">
                {selectedCV
                    ? `Избрана датотека: ${selectedCV.name}`
                    : 'Влечете го вашиот CV овде или кликнете за да изберете'
                }
              </p>
              <div className="flex gap-2 justify-center">
                <Button onClick={handleCVUpload} variant={selectedCV ? "outline" : "default"}>
                  {selectedCV ? 'Променете датотека' : 'Изберете датотека'}
                </Button>
                {selectedCV && (
                    <Button onClick={() => handleCancelSubmit()} variant="destructive">
                      Откажи пребарување
                    </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* My Applications */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Мои пракси</h2>
          <div className="grid gap-4">
            {internships.map((internship) => (
                <Card key={internship.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{internship.company}</CardTitle>
                        <CardDescription>{internship.position}</CardDescription>
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
                      {internship.period.startDate} - {internship.period.endDate}
                    </p>
                    <p className="mb-4">{internship.description}</p>

                    <div className="flex gap-2">
                      <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDetails(internship.id)}
                          className="bg-action-view text-action-view-foreground hover:bg-action-view/90"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Детали
                      </Button>

                      {internship.status === 'SUBMITTED' && (
                          <>
                            <Button
                                size="sm"
                                onClick={() => handleAcceptInternship(internship.id)}
                                className="bg-status-accepted text-status-accepted-foreground hover:bg-status-accepted/90"
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Прифати
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleRejectInternship(internship.id)}
                                className="bg-status-rejected text-status-rejected-foreground hover:bg-status-rejected/90"
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Одбиј
                            </Button>
                          </>
                      )}

                      {internship.status === 'ACCEPTED' && (
                          <Button
                              size="sm"
                              onClick={() => handleViewJournal(internship.id)}
                              className="bg-action-view text-action-view-foreground hover:bg-action-view/90"
                          >
                            <FileText className="h-4 w-4 mr-2" />
                            Дневник
                          </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
            ))}
          </div>

        {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <Button variant="outline" disabled={pagination.page === 0} onClick={() => fetchInternships(pagination.page - 1)}>
              Претходна
            </Button>
            <span>Страница {pagination.page + 1} од {pagination.totalPages}</span>
            <Button variant="outline" disabled={pagination.page + 1 >= pagination.totalPages} onClick={() => fetchInternships(pagination.page + 1)}>
              Следна
            </Button>
          </div>

        </div>

        {/* Confirmation Dialog */}
        <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Поднесување на CV</AlertDialogTitle>
              <AlertDialogDescription>
                Дали сакате да го поднесете вашето CV "{selectedCV?.name}" за пребарување пракса? Со притискање на копчето „Поднеси“ ќе креирате барање за пракса.
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Download, UserPlus, GraduationCap, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast.ts';
import {useAuthStore} from "@/store/authStore.ts";
import {internshipApi} from "@/services/api.ts";
import {useEffect} from "react";
import {matchesSelectOption, matchesTextInput} from "@/util/dataUtils.ts";
import {useCandidateStore} from "@/store/candidatesStore.ts";
import Loading from "@/pages/Loading.tsx";
import {Pagination} from "@/components/Pagination.tsx";

const Candidates = () => {
  const { toast } = useToast();

  const { user } = useAuthStore();
  const {
    candidates,
    setCandidates,
    totalPages,
    currentPage,
    pageSize,
    loading,
    setLoading,
    filters,
    setFilters,
    resetFilters,
    setCurrentPage,
    setPageSize,
    setTotalPages,
  } = useCandidateStore();

  const fetchCandidates = async () => {
    setLoading(true);
    try {
      const candidatesResponse = await internshipApi.getInternships('SEARCHING');
      setCandidates(candidatesResponse);
      console.log(candidatesResponse)
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
    fetchCandidates();
  }, []);

  // TODO: sort by date creation
  const filteredCandidates = candidates
    .filter(internship => matchesTextInput(internship.studentView.index, filters.studentSearch))

  useEffect(() => {
    setTotalPages(Math.ceil(filteredCandidates.length / pageSize));
  }, [filteredCandidates.length, pageSize]);

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedCandidates = filteredCandidates.slice(startIndex, startIndex + pageSize);

  const handleDownloadCV = (internshipId: string, studentName: string) => {

    toast({
      title: "CV се презема",
      description: `CV на ${studentName} се презема...`
    });

    internshipApi.downloadCv(internshipId)
      .then(blob => {
        console.log(blob.type);

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${studentName}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      })
      .catch(error => {
        console.error(error);
        toast({
          title: 'Грешка при преземање на CV',
          description: 'Обидете се повторно.',
          variant: 'destructive',
        });
      })
  };

  const handleProposeInternship = (internshipId: string, studentName: string) => {
    toast({
      title: "Предлог за пракса",
      description: `Предлог за пракса е испратен до ${studentName}.`
    });
  };

  if(loading) {
    return <Loading />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Кандидати за пракси</h1>
        <Badge variant="secondary" className="text-sm">
          {candidates.length} {candidates.length !== 1 ? `достапни студенти` : `достапен студент`}
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {paginatedCandidates.map((candidate, index) => (
          <Card key={candidate.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{candidate.studentView.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Индекс: {candidate.studentView.index}
                  </p>
                </div>
                <Badge variant="outline" className="text-xs">
                  #{index + 1}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  <span>{candidate.studentView.credits} credits</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span className="truncate">{candidate.studentView.email}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleDownloadCV(candidate.id, candidate.studentView.name)}
                >
                  <Download className="h-4 w-4 mr-1" />
                  CV
                </Button>
                <Button 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleProposeInternship(candidate.id, candidate.studentView.name)}
                >
                  <UserPlus className="h-4 w-4 mr-1" />
                  Испрати
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        totalItems={filteredCandidates.length}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default Candidates;
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Download, UserPlus, GraduationCap, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast.ts';
import {useAuthStore} from "@/store/authStore.ts";
import {internshipApi} from "@/services/api.ts";
import {useEffect, useState} from "react";
import {matchesTextInput} from "@/util/dataUtils.ts";
import {useCandidateStore} from "@/store/candidatesStore.ts";
import Loading from "@/pages/Loading.tsx";
import {Pagination} from "@/components/Pagination.tsx";
import {AddWeekCommentPayload, InternshipView, SubmitInternshipCommandPayload} from "@/types/internship.ts";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {companyCommandsApi} from "@/services/companyApi.ts";

const Candidates = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<InternshipView | null>(null)
  const [formData, setFormData] = useState({
    description: '',
    fromDate: '',
    toDate: '',
    weeklyHours: '',
    contactEmail: ''
  });
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

  const handleProposeInternship = (student: InternshipView) => {
    setSelectedStudent(student);
    setIsDialogOpen(true);
  };

  const handleSubmitProposal = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedStudent) return;

    const payload: SubmitInternshipCommandPayload = {
      internshipId: selectedStudent.id,
      description: formData.description,
      fromDate: formData.fromDate,
      toDate: formData.toDate,
      weeklyHours: Number(formData.weeklyHours),
      contactEmail: formData.contactEmail
    };

    await companyCommandsApi.submitInternship(payload)

    toast({
      title: "Предлог за пракса испратен",
      description: `Предлогот за пракса е успешно испратен до ${selectedStudent.studentView?.name}.`
    });

    setIsDialogOpen(false);
    setFormData({
      description: '',
      fromDate: '',
      toDate: '',
      weeklyHours: '',
      contactEmail: ''
    });

    // TODO: reload by removing student.
    setTimeout(() => {
      window.location.reload();
    }, 1000);
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
                  onClick={() => handleProposeInternship(candidate)}
                >
                  <UserPlus className="h-4 w-4 mr-1" />
                  Предложи
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Предложи пракса за {selectedStudent?.studentView?.name}</DialogTitle>
            <DialogDescription>
              Внесете ги деталите за праксата што сакате да ја понудите.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitProposal}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="description">Опис на праксата</Label>
                <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Опишете ги задачите и одговорностите..."
                    required
                    rows={4}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="fromDate">Почетен датум</Label>
                  <Input
                      id="fromDate"
                      type="date"
                      value={formData.fromDate}
                      onChange={(e) => setFormData({ ...formData, fromDate: e.target.value })}
                      required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="toDate">Краен датум</Label>
                  <Input
                      id="toDate"
                      type="date"
                      value={formData.toDate}
                      onChange={(e) => setFormData({ ...formData, toDate: e.target.value })}
                      required
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="weeklyHours">Неделни часови</Label>
                <Input
                    id="weeklyHours"
                    type="number"
                    min="1"
                    value={formData.weeklyHours}
                    onChange={(e) => setFormData({ ...formData, weeklyHours: e.target.value })}
                    placeholder="Број на часови неделно"
                    required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contactEmail">Контакт е-пошта</Label>
                <Input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    placeholder="email@company.com"
                    required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Откажи
              </Button>
              <Button type="submit">
                Испрати предлог
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Candidates;
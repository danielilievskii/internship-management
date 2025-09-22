import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import { FileText, Upload, Eye, CheckCircle, XCircle } from 'lucide-react';
import { useAuthStore } from '@/store/authStore.ts';
import { useToast } from '@/hooks/use-toast.ts';
import { InternshipStatus } from '@/types/internship.ts';

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
  const [internships, setInternships] = useState<StudentInternship[]>([
    {
      id: '1',
      company: 'Netcetera',
      position: 'Frontend Developer Intern',
      status: 'ACCEPTED' as const,
      period: { startDate: '2025-09-20', endDate: '2025-12-20' },
      description: 'Develop modern web applications using React and TypeScript...',
    },
    {
      id: '2', 
      company: 'Seavus',
      position: 'Backend Developer Intern',
      status: 'SUBMITTED' as const,
      period: { startDate: '2025-10-01', endDate: '2025-12-31' },
      description: 'Work with Java Spring Boot applications...',
    }
  ]);

  const handleCVUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        toast({
          title: 'CV прикачен',
          description: `Датотеката ${file.name} е успешно прикачена.`,
        });
      }
    };
    input.click();
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

  return (
    <div className="space-y-6">
      {/* CV Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            CV
          </CardTitle>
          <CardDescription>
            Прикачете го вашето CV за да можете да аплицирате за пракси
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
            <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="mb-4">Влечете го вашиот CV овде или кликнете за да изберете</p>
            <Button onClick={handleCVUpload}>Изберете датотека</Button>
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
      </div>
    </div>
  );
};

export default StudentInternships;
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Download, UserPlus, GraduationCap, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast.ts';

interface StudentCandidate {
  id: string;
  index: string;
  name: string;
  email: string;
  credits: number;
  hasCv: boolean;
}

const Candidates = () => {
  const { toast } = useToast();

  const mockCandidates: StudentCandidate[] = [
    {
      id: '1',
      index: '223056',
      name: 'Марија Петровска',
      email: 'marija.petrovska@students.finki.ukim.mk',
      credits: 240,
      hasCv: true
    },
    {
      id: '2',
      index: '223123',
      name: 'Стефан Николовски',
      email: 'stefan.nikolovski@students.finki.ukim.mk',
      credits: 180,
      hasCv: true
    },
    {
      id: '3',
      index: '223089',
      name: 'Ана Стојановска',
      email: 'ana.stojanovska@students.finki.ukim.mk',
      credits: 220,
      hasCv: true
    },
    {
      id: '4',
      index: '223247',
      name: 'Давид Спасовски',
      email: 'david.spasovski@students.finki.ukim.mk',
      credits: 120,
      hasCv: false
    },
    {
      id: '5',
      index: '223174',
      name: 'Елена Јовановска',
      email: 'elena.jovanovska@students.finki.ukim.mk',
      credits: 200,
      hasCv: true
    },
    {
      id: '6',
      index: '223201',
      name: 'Александар Тодоровски',
      email: 'aleksandar.todorovski@students.finki.ukim.mk',
      credits: 140,
      hasCv: true
    }
  ];

  const handleDownloadCV = (studentName: string, hasCv: boolean) => {
    if (!hasCv) {
      toast({
        title: "CV недостапно",
        description: `${studentName} сè уште не го прикачил CV-то.`,
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "CV се презема",
      description: `CV на ${studentName} се презема...`
    });
  };

  const handleProposeInternship = (studentName: string) => {
    toast({
      title: "Предлог за пракса",
      description: `Предлог за пракса е испратен до ${studentName}.`
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Кандидати за пракси</h1>
        <Badge variant="secondary" className="text-sm">
          {mockCandidates.length} достапни студенти
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockCandidates.map((candidate, index) => (
          <Card key={candidate.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{candidate.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Индекс: {candidate.index}
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
                  <span>{candidate.credits} кредити</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span className="truncate">{candidate.email}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleDownloadCV(candidate.name, candidate.hasCv)}
                  disabled={!candidate.hasCv}
                >
                  <Download className="h-4 w-4 mr-1" />
                  CV
                </Button>
                <Button 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleProposeInternship(candidate.name)}
                >
                  <UserPlus className="h-4 w-4 mr-1" />
                  Предложи
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Candidates;
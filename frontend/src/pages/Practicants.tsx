import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import { Button } from '@/components/ui/button.tsx';
import { BookOpen, GraduationCap, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast.ts';

interface Practicant {
  id: string;
  index: string;
  name: string;
  email: string;
  credits: number;
  internshipId: string;
}

const Practicants = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const mockPracticants: Practicant[] = [
    {
      id: '1',
      index: '223056',
      name: 'Марија Петровска',
      email: 'marija.petrovska@students.finki.ukim.mk',
      credits: 240,
      internshipId: '1'
    },
    {
      id: '2',
      index: '223123',
      name: 'Стефан Николовски',
      email: 'stefan.nikolovski@students.finki.ukim.mk',
      credits: 180,
      internshipId: '2'
    },
    {
      id: '3',
      index: '223089',
      name: 'Ана Стојановска',
      email: 'ana.stojanovska@students.finki.ukim.mk',
      credits: 220,
      internshipId: '3'
    },
    {
      id: '4',
      index: '223247',
      name: 'Давид Спасовски',
      email: 'david.spasovski@students.finki.ukim.mk',
      credits: 120,
      internshipId: '4'
    },
    {
      id: '5',
      index: '223174',
      name: 'Елена Јовановска',
      email: 'elena.jovanovska@students.finki.ukim.mk',
      credits: 200,
      internshipId: '5'
    }
  ];

  const handleViewJournal = (practicant: Practicant) => {
    navigate(`/internship/${practicant.internshipId}/journal`);
    toast({
      title: "Дневник се отвора",
      description: `Дневник на ${practicant.name} се отвора...`
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Практиканти</h1>
        <Badge variant="secondary" className="text-sm">
          {mockPracticants.length} активни практиканти
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockPracticants.map((practicant, index) => (
          <Card key={practicant.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{practicant.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Индекс: {practicant.index}
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
                  <span>{practicant.credits} кредити</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span className="truncate">{practicant.email}</span>
                </div>
              </div>

              <div className="pt-2">
                <Button 
                  size="sm" 
                  className="w-full"
                  onClick={() => handleViewJournal(practicant)}
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Дневник
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Practicants;
import { Button } from '@/components/ui/button.tsx';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import { Eye, Edit, Trash2, CheckCircle, FileText } from 'lucide-react';
import { InternshipView } from '@/types/internship.ts';
import StatusBadge from './StatusBadge.tsx';
import { useAuthStore } from '@/store/authStore.ts';
import { useToast } from '@/hooks/use-toast.ts';
import { useNavigate } from 'react-router-dom';

interface InternshipTableProps {
  internships: InternshipView[];
}

const InternshipTable = ({ internships }: InternshipTableProps) => {
  const { user } = useAuthStore();
  const { toast } = useToast();
  const navigate = useNavigate();

  const canDelete = (internship: InternshipView) => {
    if (!user) return false;
    return user.role === 'Coordinator';
  };

  const handleViewJournal = (internshipId: string) => {
    navigate(`/internship/${internshipId}/journal`);
  };

  const handleDelete = (internshipId: string) => {
    if (confirm('Дали сте сигурни дека сакате да ја избришете оваа пракса?')) {
      toast({
        title: 'Пракса избришана',
        description: 'Праксата е успешно избришана.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="bg-card rounded-lg border">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <FileText className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-xl font-semibold">Листа на сите пракси</h2>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b">
                <TableHead className="text-left font-medium">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-primary text-primary-foreground">
                      index
                    </Badge>
                    Студент
                  </div>
                </TableHead>
                <TableHead className="text-left font-medium">Координатор</TableHead>
                <TableHead className="text-left font-medium">Компанија</TableHead>
                <TableHead className="text-left font-medium">Статус</TableHead>
                <TableHead className="text-left font-medium">Дневник</TableHead>
                <TableHead className="text-left font-medium">Акции</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {internships.map((internship, index) => (
                <TableRow key={internship.id || index} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>{internship.studentView.index} {internship.studentView.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-muted-foreground">{internship.coordinatorView?.name ? internship.coordinatorView.name : "Нема определен координатор"}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="italic">{internship.companyView?.name ? internship.companyView.name : "Нема компанија"}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={internship.status} />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleViewJournal(internship.id)}
                      className="bg-action-view text-action-view-foreground hover:bg-action-view/90"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Дневник
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {canDelete(internship) && (
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => handleDelete(internship.id)}
                          className="bg-action-delete text-action-delete-foreground hover:bg-action-delete/90"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default InternshipTable;
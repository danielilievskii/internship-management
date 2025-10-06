import { Button } from '@/components/ui/button.tsx';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.tsx';
import {FileText, Archive, BookOpen} from 'lucide-react';
import { InternshipView } from '@/types/internship.ts';
import StatusBadge from './StatusBadge.tsx';
import { useAuthStore } from '@/store/authStore.ts';
import { useToast } from '@/hooks/use-toast.ts';
import {useNavigate} from 'react-router-dom';
import {formatMacedonianDateTime} from "@/util/dateUtils.ts";
import {studentCommandsApi} from "@/services/studentApi.ts";
import {DetailsButton} from "@/components/styled/DetailsButton.tsx";
import {AcceptButton} from "@/components/styled/AcceptButton.tsx";
import {RejectButton} from "@/components/styled/RejectButton.tsx";

interface InternshipTableProps {
  internships: InternshipView[];
  fetchInternships: () => void
}

const InternshipTable = ({ internships, fetchInternships }: InternshipTableProps) => {
  const { user } = useAuthStore();
  const { toast } = useToast();
  const navigate = useNavigate();

  let tableHeading = user.role === 'Student' ? "Листа на мои пракси" : "Листа на сите пракси"

  const handleViewDetails = (internshipId: string) => {
    navigate(`/internship/${internshipId}`);
  };

  const handleAcceptInternship = async (internshipId: string) => {
    try {
      await studentCommandsApi.acceptInternship(internshipId)
      fetchInternships()

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
      fetchInternships()

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

  const handleArchive = (internshipId: string) => {
    if (confirm('Дали сте сигурни дека сакате да ја архицирате оваа пракса?')) {
      toast({
        title: 'Пракса архивирана',
        description: 'Праксата е успешно архивирана.',
        variant: 'destructive',
      });
    }
  };

  const handleViewJournal = (internshipId: string) => {
    navigate(`/internship/${internshipId}/journal`);
    toast({
      title: "Дневник се отвора",
      description: `Дневник на Практикантот се отвора...`
    });
  }

  return (
    <div className="bg-card rounded-lg border">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <FileText className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-xl font-semibold">{tableHeading}</h2>
        </div>

        <div className="overflow-x-auto">
          <Table className="text-lg">
            <TableHeader>
              <TableRow className="border-b">
                {user.role !== 'Student' && (
                    <TableHead className="text-left font-medium w-[20%]">Студент</TableHead>
                )}
                {user.role !== 'Coordinator' && (
                  <TableHead className="text-left font-medium w-[20%]">Координатор</TableHead>
                )}
                {user.role !== 'Company' && (
                  <TableHead className="text-left font-medium w-[15%]">Компанија</TableHead>
                )}
                <TableHead className="text-left font-medium w-[20%]">Период</TableHead>
                <TableHead className="text-left font-medium w-[20%]">Статус</TableHead>
                <TableHead className="text-left font-medium w-[10%]">Aкции</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {internships.map((internship, index) => (
                <TableRow key={internship.id || index} className="hover:bg-muted/50">
                  {user.role !== 'Student' && (
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span>{internship.studentView.index} {internship.studentView.name}</span>
                      </div>
                    </TableCell>
                  )}

                  {user.role !== 'Coordinator' && (
                    <TableCell>
                      <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">
                        {internship.coordinatorView?.name || "Нема определен координатор"}
                      </span>
                      </div>
                    </TableCell>

                  )}

                  {user.role !== 'Company' && (
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="italic">{internship.companyView?.name || "Нема компанија"}</span>
                      </div>
                    </TableCell>
                  )}

                  <TableCell>
                    <span>
                      {formatMacedonianDateTime(internship.period.fromDate, false)} - {formatMacedonianDateTime(internship.period.toDate, false)}
                     </span>
                  </TableCell>

                  <TableCell>
                    <StatusBadge status={internship.status} />
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-col justify-center gap-1 h-full">
                      <DetailsButton size="sm" onClick={() => handleViewDetails(internship.id)}/>
                      {(user.role === 'Student' && internship.status === 'SUBMITTED') && (
                        <>
                          <AcceptButton size="sm" onClick={() => handleAcceptInternship(internship.id)}/>
                          <RejectButton size="sm" onClick={() => handleRejectInternship(internship.id)}/>
                        </>
                      )}
                      {user.role === 'Admin' && (
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => handleArchive(internship.id)}
                          className="bg-action-delete text-action-delete-foreground hover:bg-action-delete/90"
                        >
                          <Archive className="h-4 w-4" />
                        </Button>
                      )}
                      {(user.role === 'Coordinator' || user.role === 'Company') && (
                          <Button
                              variant="default"
                              size="sm"
                              onClick={() => handleViewJournal(internship.id)}
                              className="w-full"
                          >
                            <BookOpen className="h-4 w-4" />
                            Дневник
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
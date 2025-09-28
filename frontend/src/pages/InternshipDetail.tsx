import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import { ArrowLeft, FileText, Download, Calendar, MapPin } from 'lucide-react';
import StatusBadge from '@/components/internships/StatusBadge.tsx';
import { useToast } from '@/hooks/use-toast.ts';
import {useEffect, useState} from "react";
import {internshipApi} from "@/services/api.ts";
import {InternshipDetailsView} from "@/types/internship.ts";

const InternshipDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [internshipDetails, setInternshipDetails] = useState<InternshipDetailsView | null>(null);

  useEffect(() => {

    console.log("Sending req: " + id)

    internshipApi.getInternshipDetails(id)
        .then((data) => {
          setInternshipDetails(data)
          console.log(data)
        })

  }, [id])

  // Mock data for the internship detail
  const internship = {
    id: id,
    status: 'ACCEPTED' as const,
    studentName: 'John Doe 111111',
    coordinatorName: 'Нема определен координатор',
    companyName: 'Netcetera',
    position: 'Frontend Developer Intern',
    description: 'Develop modern web applications using React and TypeScript. Work with experienced developers to create user-friendly interfaces and learn industry best practices.',
    period: { startDate: '2025-09-20', endDate: '2025-12-20' },
    companyContactEmail: 'hr@netcetera.com',
    weeklyHours: 40,
    location: 'Skopje, Macedonia'
  };

  const handleDownloadCV = () => {
    toast({
      title: 'CV преземање',
      description: 'CV-то се преземаат...',
    });
  };

  const handleViewJournal = () => {
    navigate(`/internship/${id}/journal`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Назад
        </Button>
        <h1 className="text-3xl font-bold">Детали за пракса</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Основни информации
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Студент</label>
              <p className="text-lg">{internshipDetails?.studentView?.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Компанија</label>
              <p className="text-lg">{internshipDetails?.companyView?.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Позиција</label>
              {/*<p className="text-lg">{internship.position}</p>*/}
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Координатор</label>
              <p className="text-lg text-muted-foreground">{internship.coordinatorName}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Статус</label>
              <div className="mt-1">
                <StatusBadge status={internshipDetails?.status} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timeline & Location */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Временски рамки
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Почеток</label>
              <p className="text-lg">{internshipDetails?.period?.startDate}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Завршеток</label>
              <p className="text-lg">{internshipDetails?.period?.endDate}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Неделни часови</label>
              <p className="text-lg">{internshipDetails?.weeklyHours} часа</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                Локација
              </label>
              <p className="text-lg">{internship.location}</p>
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Опис на праксата</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{internshipDetails?.description}</p>
          </CardContent>
        </Card>

        {/* Contact & Actions */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Контакт и акции</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Контакт email</label>
                <p className="text-lg">{internshipDetails?.companyContactEmail}</p>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline"
                  onClick={handleDownloadCV}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Преземи CV
                </Button>
                <Button 
                  onClick={handleViewJournal}
                  className="flex items-center gap-2 bg-action-view text-action-view-foreground hover:bg-action-view/90"
                >
                  <FileText className="h-4 w-4" />
                  Прегледај дневник
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InternshipDetail;
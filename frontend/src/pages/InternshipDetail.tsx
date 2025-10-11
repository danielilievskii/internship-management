import {useParams, useNavigate, Link} from 'react-router-dom';
import {useEffect, useState} from "react";
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card.tsx';
import {Button} from '@/components/ui/button.tsx';
import {
  FileText,
  Calendar,
  MapPin,
  CheckCircle,
  XCircle,
  SendHorizontal,
  Clock,
  FileArchive
} from 'lucide-react';
import StatusBadge from '@/components/internships/StatusBadge.tsx';
import {useToast} from '@/hooks/use-toast.ts';
import {internshipApi} from "@/services/api.ts";
import {
  AddWeekCommentPayload,
  InternshipDetailsView,
  InternshipStatusChangeView, InvalidateJournalCommandPayload,
  ValidateJournalCommandPayload
} from "@/types/internship.ts";
import {texts} from "@/constants/texts.ts";
import Loading from "@/pages/Loading.tsx";
import {UserRole} from "@/types/internship.ts";
import {studentCommandsApi} from "@/services/studentApi.ts";
import {useAuthStore} from "@/store/authStore.ts";
import {AcceptButton} from "@/components/styled/AcceptButton.tsx";
import {RejectButton} from "@/components/styled/RejectButton.tsx";
import {SubmitJournalButton} from "@/components/styled/SubmitJournalButton.tsx";
import {DownloadCVButton} from "@/components/styled/DownloadCVButton.tsx";
import {BackButton} from "@/components/styled/BackButton.tsx";
import {formatMacedonianDateTime} from "@/util/dateUtils.ts";
import {ValidateButton} from "@/components/styled/ValidateButton.tsx";
import {InvalidateButton} from "@/components/styled/InvalidateButton.tsx";
import {companyCommandsApi} from "@/services/companyApi.ts";
import {coordinatorCommandsApi} from "@/services/coordinatorApi.ts";

const statusTransitions: Record<string, { icon: any; color: string; msg: string; changedBy: UserRole }> = {
  "null-SEARCHING": {
    icon: Clock,
    color: "text-blue-500",
    msg: "Пребарувањето за пракса поднесено.",
    changedBy: 'Student' as UserRole
  },
  "null-SUBMITTED": {
    icon: SendHorizontal,
    color: "text-blue-500",
    msg: "Праксата е испратена.",
    changedBy: 'Company' as UserRole
  },
  "SEARCHING-SUBMITTED": {
    icon: SendHorizontal,
    color: "text-blue-500",
    msg: "Праксата е испратена.",
    changedBy: 'Company' as UserRole
  },
  "SUBMITTED-ACCEPTED": {
    icon: CheckCircle,
    color: "text-green-500",
    msg: "Студентот ја прифаќа праксата.",
    changedBy: 'Student' as UserRole

  },
  "SUBMITTED-REJECTED": {
    icon: XCircle,
    color: "text-red-500",
    msg: "Студентот ја одбива праксата.",
    changedBy: 'Student' as UserRole
  },
  "ACCEPTED-JOURNAL_SUBMITTED": {
    icon: FileText,
    color: "text-purple-500",
    msg: "Дневникот е испратен на валидација.",
    changedBy: 'Student' as UserRole
  },
  "JOURNAL_SUBMITTED-VALIDATED_BY_COMPANY": {
    icon: CheckCircle,
    color: "text-green-600",
    msg: "Компанијата го верификува дневникот.",
    changedBy: 'Company' as UserRole
  },
  "JOURNAL_SUBMITTED-ACCEPTED": {
    icon: CheckCircle,
    color: "text-green-600",
    msg: "Компанијата го враќа дневникот на ревизија.",
    changedBy: 'Company' as UserRole
  },
  "VALIDATED_BY_COMPANY-VALIDATED_BY_COORDINATOR": {
    icon: CheckCircle,
    color: "text-green-600",
    msg: "Координаторот го верификува дневникот.",
    changedBy: 'Coordinator' as UserRole
  },
  "ACCEPTED": {
    icon: CheckCircle,
    color: "text-green-600",
    msg: "Координаторот го го враќа дневникот на ревизија.",
    changedBy: 'Coordinator' as UserRole
  },
  "VALIDATED_BY_COORDINATOR-ARCHIVED": {
    icon: FileArchive,
    color: "text-green-600",
    msg: "Праксата е архивирана.",
    changedBy: 'Admin' as UserRole
  },
}

const InternshipDetail = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const {toast} = useToast();
  const {user} = useAuthStore();

  const [isLoading, setIsLoading] = useState(true)
  const [internshipDetails, setInternshipDetails] = useState<InternshipDetailsView | null>(null);
  const [internshipStatusChanges, setInternshipStatusChanges] = useState<InternshipStatusChangeView[] | null>(null);

  const fetchInternshipData = () => {
    setIsLoading(true);

    Promise.all([
      internshipApi.getInternshipDetails(id),
      internshipApi.getInternshipStatusChanges(id),
    ])
      .then(([internshipDetailsResponse, internshipStatusChangesResponse]) => {

        // const internshipStatusChanges = internshipStatusChangesResponse
        //   .map((item: any) => (mapApiInternshipStatusChange(item)));

        setInternshipDetails(internshipDetailsResponse);
        setInternshipStatusChanges(internshipStatusChangesResponse.reverse())

        console.log(internshipStatusChangesResponse)
        console.log(internshipStatusChanges)
      })
      .catch((error) => {
        console.error(error);
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
    fetchInternshipData();
  }, []);


  const handleDownloadCV = () => {
    toast({
      title: 'CV преземање',
      description: 'CV-то се презема...',
    });
  };

  const handleAcceptInternship = async (internshipId: string) => {
    try {
      await studentCommandsApi.acceptInternship(internshipId)

      toast({
        title: 'Пракса прифатена',
        description: 'Успешно ја прифативте праксата.',
      });

      fetchInternshipData()

    } catch (error) {
      toast({
        title: 'Грешка при прифаќање на пракса!',
        description: 'Се појави проблем при прифаќање на праксата. Ве молиме обидете се повторно.',
        variant: 'destructive'
      });
    }
  };

  const handleValidateJournal = async (internshipId: string) => {
    try {
      const payload: ValidateJournalCommandPayload = {
        internshipId: internshipId
      };

      const validateJournalHandlers = {
        Company: companyCommandsApi.validateJournal,
        Coordinator: coordinatorCommandsApi.validateJournal,
      }

      const handler = validateJournalHandlers[user.role]
      if (handler) {
        await handler(payload)
        fetchInternshipData()

        toast({
          title: 'Дневник одобрен',
          description: `Успешно го одобривте дневникот на студентот ${internshipDetails.studentView.name}.`,
        });
      }
    } catch (error) {
      toast({
        title: 'Грешка при одобрување на дневник!',
        description: `Се појави проблем при одобрување на дневникот на ${internshipDetails.studentView.name}. Ве молиме обидете се повторно.`,
        variant: 'destructive'
      });
    }
  }

  const handleInvalidateJournal = async (internshipId: string) => {
    try {
      const payload: InvalidateJournalCommandPayload = {
        internshipId: internshipId
      };

      const invalidateJournalHandlers = {
        Company: companyCommandsApi.invalidateJournal,
        Coordinator: coordinatorCommandsApi.invalidateJournal,
      }

      const handler = invalidateJournalHandlers[user.role]
      if (handler) {
        await handler(payload)
        fetchInternshipData()

        toast({
          title: 'Дневник одбиен',
          description: `Успешно го одбивте дневникот на студентот ${internshipDetails.studentView.name}.`,
        });
      }
    } catch (error) {
      toast({
        title: 'Грешка при одбивате на пракса!',
        description: `Се појави проблем при oдбивање на дневникот на ${internshipDetails.studentView.name}. Ве молиме обидете се повторно.`,
        variant: 'destructive'
      });
    }
  }

  const handleRejectInternship = async (internshipId: string) => {
    try {
      await studentCommandsApi.rejectInternship(internshipId)

      fetchInternshipData()

      toast({
        title: 'Пракса одбиена',
        description: 'Ја одбивте праксата.',
      });
    } catch (error) {
      toast({
        title: 'Грешка при одбивање на пракса!',
        description: 'Се појави проблем при прифаќање на праксата. Ве молиме обидете се повторно.',
        variant: 'destructive'
      });
    }
  }

  const handleSubmitJournal = async (internshipId) => {
    try {
      await studentCommandsApi.submitJournal(internshipId)

      fetchInternshipData()

      toast({
        title: 'Дневник испратен на валидација',
        description: 'Го испративте дневникот на валидација.',
      });
    } catch (error) {
      toast({
        title: 'Грешка при испраќање на дневник!',
        description: 'Се појави проблем при испраќање на дневникот на валидација. Ве молиме обидете се повторно.',
        variant: 'destructive'
      });
    }

  }

  if (isLoading) return <Loading/>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <BackButton onClick={() => navigate(-1)}/>
        <h1 className="text-3xl font-bold">Детали за пракса</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-10">
        {/* LEFT COLUMN — 7/10 width */}
        <div className="md:col-span-7 flex flex-col gap-6">

          <div className="flex flex-col md:flex-row gap-6">
            {/* Basic Information */}
            <Card className="flex-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5"/>
                  Основни информации
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Студент</label>
                  <p className="text-lg">{internshipDetails?.studentView?.name || texts.notSpecified}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Компанија</label>
                  <p className="text-lg">{internshipDetails?.companyView?.name || texts.notSpecified}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Позиција</label>
                  <p className="text-lg">{texts.notSpecified}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Координатор</label>
                  <p className="text-lg text-muted-foreground">
                    {internshipDetails?.coordinatorView?.name || texts.notSpecified}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Статус</label>
                  <div className="mt-1">
                    <StatusBadge status={internshipDetails?.status}/>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline & Location */}
            <Card className="flex-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5"/>
                  Временски рамки
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Почеток</label>
                  <p className="text-lg">
                    {formatMacedonianDateTime(internshipDetails?.period?.fromDate, false) || texts.notSpecified}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Завршеток</label>
                  <p className="text-lg">
                    {formatMacedonianDateTime(internshipDetails?.period?.toDate, false) || texts.notSpecified}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Неделни часови</label>
                  {internshipDetails?.weeklyHours ? (
                    <p className="text-lg">{internshipDetails?.weeklyHours} часа</p>
                  ) : (
                    <p className="text-lg">{texts.notSpecified}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-4 w-4"/>
                    Локација
                  </label>
                  <p className="text-lg">{texts.notSpecified}</p>
                </div>
              </CardContent>
            </Card>
          </div>


          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Опис на праксата</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {internshipDetails?.description || texts.notSpecified}
              </p>
            </CardContent>
          </Card>

          {/* Contact & Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Контакт и акции</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Контакт email</label>
                  <p className="text-lg">{internshipDetails?.companyContactEmail || texts.notSpecified}</p>
                </div>
                <div className="flex gap-2">
                  <DownloadCVButton onClick={handleDownloadCV}/>

                  {internshipDetails?.status !== 'REJECTED' && (
                    <Button className="bg-action-view text-action-view-foreground hover:bg-action-view/90">
                      <Link to={`/internship/${id}/journal`} className="flex items-center gap-2 ">
                        <FileText className="h-4 w-4"/> Дневник
                      </Link>
                    </Button>
                  )}

                  {user.role === 'Student' && internshipDetails?.status === 'SUBMITTED' && (
                    <>
                      <AcceptButton onClick={() => handleAcceptInternship(internshipDetails.id)}/>
                      <RejectButton onClick={() => handleRejectInternship(internshipDetails.id)}/>
                    </>
                  )}

                  {user.role === 'Student' && internshipDetails?.status === 'ACCEPTED' && (
                    <SubmitJournalButton onClick={() => handleSubmitJournal(internshipDetails.id)}/>
                  )}

                  {((user.role === 'Company' && internshipDetails?.status === 'JOURNAL_SUBMITTED')
                    || (user.role === 'Coordinator' && internshipDetails?.status === 'VALIDATED_BY_COMPANY'))
                    && (
                    <>
                      <ValidateButton onClick={() => handleValidateJournal(internshipDetails.id)}/>
                      <InvalidateButton onClick={() => handleInvalidateJournal(internshipDetails.id)}/>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN — 3/10 width */}
        <div className="md:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Историја на промени</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-7">
                {internshipStatusChanges?.map((change) => {
                  const key = `${change.previousStatus ?? "null"}-${change.newStatus}`;
                  const config = statusTransitions[key] || {
                    icon: Clock,
                    color: "text-gray-400",
                    msg: `Status changed from ${change.previousStatus ?? "—"} to ${change.newStatus}`,
                    changedBy: `Not specified`,
                  };
                  const Icon = config.icon;

                  return (
                    <div key={change.id}>
                      <div className="flex flex-row items-center gap-1.5 mb-3 rounded-lg bg-gray-100 px-3 py-2">
                        <Icon className={`h-6 w-6 ${config.color}`}/>
                        <p className="font-medium">{config.msg}</p>
                      </div>

                      <div className="space-y-1 text-muted-foreground">
                        <p>
                          <span>Променето од: </span>
                          <span className="italic">
                            {config.changedBy === 'Student' &&
                              `${internshipDetails.studentView.name} ${internshipDetails.studentView.index}`
                            }
                            {config.changedBy === 'Company' && internshipDetails.companyView.name}
                            {config.changedBy === 'Coordinator' && internshipDetails.coordinatorView.name}
                            {config.changedBy === 'Admin' && `Админ`}
                            </span>
                        </p>
                        <p>
                          <span>Датум: </span>
                          <span>{formatMacedonianDateTime(change.changedAt)}</span>
                        </p>
                        {change.previousStatus && (
                          <p>
                            <span>Претходен статус: </span>
                            <span className="font-semibold">{change.previousStatus}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

    </div>
  );
};

export default InternshipDetail;
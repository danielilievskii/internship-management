import {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card.tsx';
import {compareAsc, parseISO} from "date-fns";
import {Button} from '@/components/ui/button.tsx';
import {Badge} from '@/components/ui/badge.tsx';
import {Textarea} from '@/components/ui/textarea.tsx';
import {Input} from '@/components/ui/input.tsx';
import {Label} from '@/components/ui/label.tsx';
import { Plus, Calendar, Clock} from 'lucide-react';
import {useToast} from '@/hooks/use-toast.ts';
import {useAuthStore} from '@/store/authStore.ts';
import {
  AddWeekCommentPayload,
  CreateInternshipWeekPayload,
  EditInternshipWeekPayload,
  InternshipDetailsView
} from "@/types/internship.ts";
import {internshipApi} from "@/services/api.ts";
import {studentCommandsApi} from "@/services/studentApi.ts";
import {companyCommandsApi} from "@/services/companyApi.ts";
import {coordinatorCommandsApi} from "@/services/coordinatorApi.ts";
import {texts} from "@/constants/texts.ts";
import Loading from "@/pages/Loading.tsx";
import InternshipWeekForm from "@/components/internship-journal/InternshipWeekForm.tsx";
import InternshipWeekComments from "@/components/internship-journal/InternshipWeekComments.tsx";
import InternshipWeekDescription from "@/components/internship-journal/InternshipWeekDescription.tsx";
import {BackButton} from "@/components/styled/BackButton.tsx";

interface WeekEntryData {
  fromDate: string;
  toDate: string;
  description: string;
  workingHours: string | number;
}

interface EditWeekFormData {
  [weekId: string]: WeekEntryData;
}

const InternshipJournal = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const {toast} = useToast();
  const {user} = useAuthStore();

  const [loading, setLoading] = useState(true)
  const [internshipDetails, setInternshipDetails] = useState<InternshipDetailsView | null>(null);

  const [showAddForm, setShowAddForm] = useState(false);
  const [addWeekFormData, setAddWeekFormData] = useState({
    fromDate: '',
    toDate: '',
    description: '',
    workingHours: ''
  });

  const [editWeekId, setEditWeekId] = useState<string | null>(null);
  const [editWeekFormData, setEditWeekFormData] = useState<EditWeekFormData>({});

  const [newComment, setNewComment] = useState('');
  const [commentWeekId, setCommentWeekId] = useState<string | null>(null);

  useEffect(() => {
    internshipApi.getInternshipDetails(id)
      .then((data) => {
        setInternshipDetails(data)
        console.log(data)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    if (!internshipDetails?.weeks) return;

    setEditWeekFormData(
      internshipDetails.weeks.reduce((acc, week) => {
          acc[week.id] = {
            fromDate: week.period.fromDate,
            toDate: week.period.toDate,
            description: week.description,
            workingHours: Number(week.workingHours),
          };
          return acc;
        }, {} as EditWeekFormData
      ));
  }, [internshipDetails]);


  const sortedWeeks = internshipDetails?.weeks
    ? internshipDetails.weeks.sort((a, b) =>
      compareAsc(parseISO(a.period.fromDate), parseISO(b.period.fromDate)))
    : []

  const handleEditWeekFormData = (weekId: string, field: string, value: string) => {

    setEditWeekFormData(prev => ({
      ...prev,
      [weekId]: {
        ...prev[weekId],
        [field]: value,
      }
    }));
  };

  const validateWeekData = (weekEntryData: WeekEntryData): boolean => {
    const {fromDate, toDate, description, workingHours} = weekEntryData;

    if (!fromDate || !toDate || !description || !workingHours) {
      toast({
        title: "Грешка",
        description: "Ве молиме пополнете ги сите полиња",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleCreateInternshipWeek = () => {
    if (!validateWeekData(addWeekFormData)) {
      return;
    }

    const payload: CreateInternshipWeekPayload = {
      ...addWeekFormData,
      internshipId: internshipDetails.id,
      workingHours: Number(addWeekFormData.workingHours) || 0,
    };

    studentCommandsApi.createInternshipWeek(payload)
      .then((response) => {
        setAddWeekFormData({fromDate: '', toDate: '', description: '', workingHours: ''});
        setShowAddForm(false);

        console.log(response)

        toast({
          title: 'Внес додаден',
          description: 'Новиот неделен внес е успешно додаден.',
        });

        internshipApi.getInternshipDetails(id)
          .then((data) => {
            setInternshipDetails(data)
          })

      }).catch((error) => {
      toast({
        title: "Грешка",
        // description = "Ве молиме обидете се повторно",
        variant: "destructive",
      });
    })
  };

  const handleEditInternshipWeek = async (weekId: string) => {
    const weekEntryData = editWeekFormData[weekId];

    if (!validateWeekData(weekEntryData)) {
      return;
    }

    const payload: EditInternshipWeekPayload = {
      ...weekEntryData,
      internshipId: internshipDetails.id,
      weekId: weekId,
      workingHours: Number(weekEntryData.workingHours),
    }

    studentCommandsApi.editInternshipWeek(payload)
      .then((response) => {

        toast({
          title: 'Внес додаден',
          description: 'Новиот неделен внес е успешно додаден.',
        });

        setEditWeekId(null);

        internshipApi.getInternshipDetails(id)
          .then((data) => {
            setInternshipDetails(data)
          })

      }).catch((error) => {
        console.log(error)
      toast({
        title: "Грешка",
        variant: "destructive",
      });
    })
  };

  const addWeekComment = async (
    apiCall: (payload: AddWeekCommentPayload) => Promise<any>,
    payload: AddWeekCommentPayload
  ) => {
    try {
      await apiCall(payload);

      toast({
        title: "Коментар додаден",
        description: "Вашиот коментар е успешно додаден.",
      });

      setNewComment("");
      setCommentWeekId(null)

      const data = await internshipApi.getInternshipDetails(payload.internshipId);
      setInternshipDetails(data);

    } catch (error) {
      console.log(error)
      toast({
        title: "Грешка",
        variant: "destructive",
      });
    }
  };

  const handleAddComment = (weekId: string) => {
    if (!newComment.trim()) return;

    const payload: AddWeekCommentPayload = {
      internshipId: internshipDetails.id,
      weekId,
      comment: newComment,
    };

    if (user?.role === "Company") {
      addWeekComment(companyCommandsApi.addWeekComment, payload);
    } else if (user?.role === "Coordinator") {
      addWeekComment(coordinatorCommandsApi.addWeekComment, payload);
    }
  };

  const canModifyWeekData = user?.role === 'Student' && internshipDetails?.status == 'ACCEPTED';

  if (loading) return <Loading/>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <BackButton onClick={() => navigate(-1)} />
        <h1 className="text-3xl font-bold">Дневник на пракса</h1>
      </div>

      {/* Add New Entry Form */}
      {canModifyWeekData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5"/>
              Додај нов неделен внес
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!showAddForm ? (
              <Button onClick={() => setShowAddForm(true)}>
                Додај внес за нова недела
              </Button>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fromDate">Од датум</Label>
                    <Input
                      id="fromDate"
                      type="date"
                      value={addWeekFormData.fromDate}
                      onChange={(e) => setAddWeekFormData(prev => ({...prev, fromDate: e.target.value}))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="toDate">До датум</Label>
                    <Input
                      id="toDate"
                      type="date"
                      value={addWeekFormData.toDate}
                      onChange={(e) => setAddWeekFormData(prev => ({...prev, toDate: e.target.value}))}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="workingHours">Работни часови оваа недела</Label>
                  <Input
                    id="workingHours"
                    type="number"
                    value={addWeekFormData.workingHours}
                    onChange={(e) => setAddWeekFormData(prev => ({...prev, workingHours: e.target.value}))}
                  />
                </div>
                <div>
                  <Label htmlFor="description">Опис на активностите</Label>
                  <Textarea
                    id="description"
                    placeholder="Опишете ги активностите што ги извршивте оваа недела..."
                    value={addWeekFormData.description}
                    onChange={(e) => setAddWeekFormData(prev => ({...prev, description: e.target.value}))}
                    rows={4}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleCreateInternshipWeek}>Зачувај внес</Button>
                  <Button variant="outline" onClick={() => setShowAddForm(false)}>Откажи</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Weekly Entries */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Неделни внесови</h2>
        {sortedWeeks.map((week, index) => {
          const isEditing = editWeekId === week.id;

          return (
            <Card key={week.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5"/>
                    Недела {index + 1}: {week.period.fromDate} - {week.period.toDate}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Clock className="h-3 w-3"/>
                      {week.workingHours ? `${week.workingHours}ч` : texts.notSpecified}
                    </Badge>
                    {canModifyWeekData && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditWeekId(isEditing ? null : week.id)
                        }}
                      >
                        {isEditing ? "Откажи" : "Измени"}
                      </Button>
                    )}

                  </div>
                </CardTitle>
              </CardHeader>


              <CardContent className="space-y-4">
                {isEditing && internshipDetails.status === 'ACCEPTED' ? (
                  <InternshipWeekForm
                    entry={editWeekFormData[week.id]}
                    onChange={(field, value) => handleEditWeekFormData(week.id, field, value)}
                    onSave={() => handleEditInternshipWeek(week.id)}
                    onCancel={() => setEditWeekId(null)}
                  />
                ) : (
                  <InternshipWeekDescription week={week}/>
                )}
                <InternshipWeekComments
                  user={user}
                  week={week}
                  internshipDetails={internshipDetails}
                  newComment={newComment}
                  setNewComment={setNewComment}
                  commentWeekId={commentWeekId}
                  setCommentWeekId={setCommentWeekId}
                  handleAddComment={handleAddComment}
                />
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  );
};

export default InternshipJournal;
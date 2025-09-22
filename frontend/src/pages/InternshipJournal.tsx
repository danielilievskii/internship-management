import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import { Textarea } from '@/components/ui/textarea.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Label } from '@/components/ui/label.tsx';
import { ArrowLeft, FileText, Plus, Calendar, Clock, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast.ts';
import { useAuthStore } from '@/store/authStore.ts';

interface WeekEntry {
  id: string;
  period: { startDate: string; endDate: string };
  description: string;
  workingHours: number;
  comments: {
    id: string;
    author: 'Company' | 'Coordinator';
    text: string;
    createdAt: string;
  }[];
}

const InternshipJournal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuthStore();

  const [weeks, setWeeks] = useState<WeekEntry[]>([
    {
      id: '1',
      period: { startDate: '2025-09-20', endDate: '2025-09-26' },
      description: 'Запознавање со тимот и проектите. Поставување на развојната средина и почетна обука за React и TypeScript.',
      workingHours: 40,
      comments: [
        {
          id: '1',
          author: 'Company',
          text: 'Одличен старт! Студентот покажа голема мотивираност.',
          createdAt: '2025-09-27'
        }
      ]
    },
    {
      id: '2', 
      period: { startDate: '2025-09-27', endDate: '2025-10-03' },
      description: 'Работа на првиот проект - создавање на компоненти за корисничкиот интерфејс.',
      workingHours: 38,
      comments: []
    }
  ]);

  const [newEntry, setNewEntry] = useState({
    fromDate: '',
    toDate: '',
    description: '',
    workingWeeklyHours: ''
  });

  const [showAddForm, setShowAddForm] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [activeWeekForComment, setActiveWeekForComment] = useState<string | null>(null);

  const handleAddEntry = () => {
    if (!newEntry.fromDate || !newEntry.toDate || !newEntry.description || !newEntry.workingWeeklyHours) {
      toast({
        title: 'Грешка',
        description: 'Ве молиме пополнете ги сите полиња',
        variant: 'destructive',
      });
      return;
    }

    const entry: WeekEntry = {
      id: (weeks.length + 1).toString(),
      period: { startDate: newEntry.fromDate, endDate: newEntry.toDate },
      description: newEntry.description,
      workingHours: parseInt(newEntry.workingWeeklyHours),
      comments: []
    };

    setWeeks([...weeks, entry]);
    setNewEntry({ fromDate: '', toDate: '', description: '', workingWeeklyHours: '' });
    setShowAddForm(false);
    
    toast({
      title: 'Внес додаден',
      description: 'Новиот неделен внес е успешно додаден.',
    });
  };

  const handleAddComment = (weekId: string) => {
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now().toString(),
      author: user?.role === 'Student' ? 'Company' : (user?.role || 'Coordinator') as 'Company' | 'Coordinator',
      text: newComment,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setWeeks(prev => prev.map(week => 
      week.id === weekId 
        ? { ...week, comments: [...week.comments, comment] }
        : week
    ));

    setNewComment('');
    setActiveWeekForComment(null);
    
    toast({
      title: 'Коментар додаден',
      description: 'Вашиот коментар е успешно додаден.',
    });
  };

  const canAddEntries = user?.role === 'Student';
  const canComment = user?.role === 'Company' || user?.role === 'Coordinator';

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
        <h1 className="text-3xl font-bold">Дневник на пракса</h1>
      </div>

      {/* Add New Entry Form */}
      {canAddEntries && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
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
                      value={newEntry.fromDate}
                      onChange={(e) => setNewEntry(prev => ({ ...prev, fromDate: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="toDate">До датум</Label>
                    <Input
                      id="toDate"
                      type="date"
                      value={newEntry.toDate}
                      onChange={(e) => setNewEntry(prev => ({ ...prev, toDate: e.target.value }))}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="workingHours">Работни часови оваа недела</Label>
                  <Input
                    id="workingHours"
                    type="number"
                    placeholder="40"
                    value={newEntry.workingWeeklyHours}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, workingWeeklyHours: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="description">Опис на активностите</Label>
                  <Textarea
                    id="description"
                    placeholder="Опишете ги активностите што ги извршивте оваа недела..."
                    value={newEntry.description}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleAddEntry}>Зачувај внес</Button>
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
        {weeks.map((week) => (
          <Card key={week.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Недела {week.id}: {week.period.startDate} - {week.period.endDate}
                </div>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {week.workingHours}ч
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Активности:</h4>
                <p className="text-muted-foreground">{week.description}</p>
              </div>

              {/* Comments Section */}
              {week.comments.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Коментари:
                  </h4>
                  <div className="space-y-2">
                    {week.comments.map((comment) => (
                      <div key={comment.id} className="bg-muted p-3 rounded-lg">
                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-1">
                          <span>{comment.author}</span>
                          <span>{comment.createdAt}</span>
                        </div>
                        <p>{comment.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Add Comment */}
              {canComment && (
                <div className="pt-2 border-t">
                  {activeWeekForComment !== week.id ? (
                    <Button
                      variant="outline" 
                      size="sm"
                      onClick={() => setActiveWeekForComment(week.id)}
                    >
                      Додај коментар
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      <Textarea
                        placeholder="Внесете го вашиот коментар..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        rows={2}
                      />
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => handleAddComment(week.id)}>
                          Додај коментар
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setActiveWeekForComment(null)}
                        >
                          Откажи
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InternshipJournal;
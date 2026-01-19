import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Progress} from "@/components/ui/progress";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, BarChart, Bar
} from 'recharts';
import {Users, Building2, FileText, TrendingUp, CheckCircle2, Award, Target, UserCheck} from 'lucide-react';
import {internshipApi} from "@/services/api.ts";
import {useEffect, useState, useMemo} from "react";
import {useToast} from "@/hooks/use-toast.ts";
import Loading from "@/pages/Loading.tsx";
import {InternshipView} from "@/types/internship.ts";
import {adminQueryApi} from "@/services/adminApi.ts";

interface CoordinatorSummary {
  coordinator: string;
  ACCEPTED: number;
  JOURNAL_SUBMITTED: number;
  VALIDATED_BY_COMPANY: number;
  VALIDATED_BY_COORDINATOR: number;
  ARCHIVED: number;
  total: number;
}

type StatusName =
  | 'SEARCHING'
  | 'SUBMITTED'
  | 'ACCEPTED'
  | 'JOURNAL_SUBMITTED'
  | 'VALIDATED_BY_COMPANY'
  | 'VALIDATED_BY_COORDINATOR'
  | 'ARCHIVED';

interface StatusDistributionItem {
  name: StatusName;
  value: number;
  color: string
}

const STATUS_COLORS = {
  SEARCHING: '#9CA3AF',
  SUBMITTED: '#3B82F6',
  ACCEPTED: '#10B981',
  JOURNAL_SUBMITTED: '#8B5CF6',
  VALIDATED_BY_COMPANY: '#F59E0B',
  VALIDATED_BY_COORDINATOR: '#EF4444',
  ARCHIVED: '#6B7280',
};

const Coordinators = () => {
  const {toast} = useToast()
  const [allInternships, setAllInternships] = useState<InternshipView[]>([])
  const [totalCompanies, setTotalCompanies] = useState(0)
  const [loading, setLoading] = useState(true)

  const activeInternships = useMemo(() =>
    allInternships.filter(item =>
      item.status !== 'ARCHIVED' &&
      item.status !== 'SEARCHING' &&
      item.status !== 'SUBMITTED' &&
      item.status !== 'REJECTED'
    ), [allInternships]
  );

  const archivedInternships = useMemo(() =>
      allInternships.filter(item => item.status === 'ARCHIVED'),
    [allInternships]
  );

  const filteredInternships = useMemo(() =>
    allInternships.filter(item =>
      item.status !== 'SEARCHING' &&
      item.status !== 'SUBMITTED'
    ), [allInternships]
  );

  const statusDistribution = useMemo(() => {
    const distribution: StatusDistributionItem[] = [
      {name: 'SEARCHING', value: 0, color: STATUS_COLORS.SEARCHING},
      {name: 'SUBMITTED', value: 0, color: STATUS_COLORS.SUBMITTED},
      {name: 'ACCEPTED', value: 0, color: STATUS_COLORS.ACCEPTED},
      {name: 'JOURNAL_SUBMITTED', value: 0, color: STATUS_COLORS.JOURNAL_SUBMITTED},
      {name: 'VALIDATED_BY_COMPANY', value: 0, color: STATUS_COLORS.VALIDATED_BY_COMPANY},
      {name: 'VALIDATED_BY_COORDINATOR', value: 0, color: STATUS_COLORS.VALIDATED_BY_COORDINATOR},
      {name: 'ARCHIVED', value: 0, color: STATUS_COLORS.ARCHIVED}
    ];

    allInternships.forEach((internship) => {
      const distItem = distribution.find(item => item.name === internship.status);
      if (distItem) {
        distItem.value += 1;
      }
    });

    return distribution;
  }, [allInternships]);

  const summaryMap = useMemo(() => {
    const map: Record<string, CoordinatorSummary> = {};

    filteredInternships.forEach((internship) => {
      const coordinatorName = internship.coordinatorView?.name || "Непознат Координатор";
      const status = internship.status;

      if (!map[coordinatorName]) {
        map[coordinatorName] = {
          coordinator: coordinatorName,
          ACCEPTED: 0,
          JOURNAL_SUBMITTED: 0,
          VALIDATED_BY_COMPANY: 0,
          VALIDATED_BY_COORDINATOR: 0,
          ARCHIVED: 0,
          total: 0,
        };
      }

      if (status && map[coordinatorName][status as keyof Omit<CoordinatorSummary, 'coordinator' | 'total'>] !== undefined) {
        map[coordinatorName][status as keyof Omit<CoordinatorSummary, 'coordinator' | 'total'>] += 1;
      }

      map[coordinatorName].total += 1;
    });

    return Object.values(map);
  }, [filteredInternships]);

  useEffect(() => {
    const fetchInternships = async () => {
      setLoading(true);
      try {
        const [internshipsResponse, numberOfCompanies] = await Promise.all([
          internshipApi.getInternships(),
          adminQueryApi.getNumberOfCompanies()
        ]);

        setAllInternships(internshipsResponse);
        setTotalCompanies(numberOfCompanies);
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

    fetchInternships();
  }, [toast]);

  const overviewStats = [
    {
      title: "Вкупно Пракси",
      value: allInternships.length,
      change: "+12%",
      icon: FileText,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Активни Пракси",
      value: activeInternships.length,
      change: "+8%",
      icon: Users,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Партнер Компании",
      value: totalCompanies,
      change: "+5%",
      icon: Building2,
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Завршени Пракси",
      value: archivedInternships.length,
      change: "+18%",
      icon: CheckCircle2,
      color: "from-green-500 to-emerald-500"
    },
  ];

  if (loading) {
    return <Loading/>
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Overview Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {overviewStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}
                  className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5`}></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color}`}>
                  <Icon className="h-4 w-4 text-white"/>
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="text-3xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-green-500"/>
                  <span className="text-green-500 font-semibold">{stat.change}</span>
                  <span>од минатиот месец</span>
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Section */}
      <Tabs defaultValue="distribution" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:inline-grid">
          <TabsTrigger value="distribution">Дистрибуција</TabsTrigger>
          <TabsTrigger value="statistic">Изведба</TabsTrigger>
        </TabsList>

        <TabsContent value="distribution" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5"/>
                  Статус Дистрибуција
                </CardTitle>
                <CardDescription>Распределба на пракси по статус</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={statusDistribution.filter(item => item.value > 0)}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {statusDistribution.filter(item => item.value > 0).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color}/>
                      ))}
                    </Pie>
                    <Tooltip/>
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5"/>
                  Детален Преглед
                </CardTitle>
                <CardDescription>Статистика по категорија</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {statusDistribution.map((status, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{backgroundColor: status.color}}
                        />
                        <span className="text-sm font-medium">{status.name}</span>
                      </div>
                      <span className="text-sm font-bold">{status.value}</span>
                    </div>
                    <Progress
                      value={(status.value / statusDistribution.reduce((acc, s) => acc + s.value, 0)) * 100}
                      className="h-2"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="statistic" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5"/>
                Пракси по Координатор и Статус
              </CardTitle>
              <CardDescription>Преглед на вкупниот број пракси за секој координатор поделени по
                статус.</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={summaryMap}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))"/>
                  <XAxis dataKey="coordinator" stroke="hsl(var(--muted-foreground))"/>
                  <YAxis stroke="hsl(var(--muted-foreground))"/>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend/>

                  <Bar
                    dataKey="ACCEPTED"
                    stackId="a"
                    fill={STATUS_COLORS.ACCEPTED}
                    name="ACCEPTED"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="JOURNAL_SUBMITTED"
                    stackId="a"
                    fill={STATUS_COLORS.JOURNAL_SUBMITTED}
                    name="JOURNAL SUBMITTED"
                  />
                  <Bar
                    dataKey="VALIDATED_BY_COMPANY"
                    stackId="a"
                    fill={STATUS_COLORS.VALIDATED_BY_COMPANY}
                    name="VALIDATED BY COMPANY"
                  />
                  <Bar
                    dataKey="VALIDATED_BY_COORDINATOR"
                    stackId="a"
                    fill={STATUS_COLORS.VALIDATED_BY_COORDINATOR}
                    name="VALIDATED BY COORDINATOR"
                  />
                  <Bar
                    dataKey="ARCHIVED"
                    stackId="a"
                    fill={STATUS_COLORS.ARCHIVED}
                    name="ARCHIVED"
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Coordinators;
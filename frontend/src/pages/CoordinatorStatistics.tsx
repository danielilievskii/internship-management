import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip,
    Legend, ResponsiveContainer, AreaChart, Area, BarChart, Bar
} from 'recharts';
import {Users, Building2, FileText, TrendingUp, CheckCircle2, Award, Target, UserCheck} from 'lucide-react';
import {internshipApi} from "@/services/api.ts";
import {useEffect, useState} from "react";
import {useToast} from "@/hooks/use-toast.ts";
import Loading from "@/pages/Loading.tsx";
import {InternshipView} from "@/types/internship.ts";
import {companyQueryApi} from "@/services/companyApi.ts";
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

interface CoordinatorInternshipMap {
    [coordinatorName: string]: InternshipView[]
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

const Coordinators = () => {
    const { toast } = useToast()
    const [allInternships, setAllInternships] = useState<InternshipView[]>([])
    const [activeInternships, setActiveInternships] = useState<InternshipView[]>([])
    const [totalCompanies, setTotalCompanies] = useState(0)
    const [internships, setInternships] = useState<InternshipView[]>([])
    const [summaryMap, setSummaryMap] = useState<CoordinatorSummary[]>([])
    const [internshipMap, setInternshipMap] = useState<CoordinatorInternshipMap>({})
    const [statusDistribution, setStatusDistribution] = useState<StatusDistributionItem[]>([
        { name: 'SEARCHING', value: 0, color: '#FBBF24' },
        { name: 'SUBMITTED', value: 0, color: '#3B82F6' },
        { name: 'ACCEPTED', value: 0, color: '#10B981' },
        { name: 'JOURNAL_SUBMITTED', value: 0, color: '#8B5CF6' },
        { name: 'VALIDATED_BY_COMPANY', value: 0, color: '#F59E0B' },
        { name: 'VALIDATED_BY_COORDINATOR', value: 0, color: '#EF4444' },
        { name: 'ARCHIVED', value: 0, color: '#6B7280' },
    ])
    const [loading, setLoading] = useState(true)

    const buildCoordinatorSummaryMap  = (internships: any[]) => {
        const map: Record<string, any> = {};

        internships.forEach((internship) => {
            const coordinatorName = internship.coordinatorView?.name || "Непознат Координатор";
            const status = internship.status || "UNKNOWN";

            if (!map[coordinatorName]) {
                map[coordinatorName] = {
                    "coordinator": coordinatorName,
                    "ACCEPTED": 0,
                    "JOURNAL_SUBMITTED": 0,
                    "VALIDATED_BY_COMPANY": 0,
                    "VALIDATED_BY_COORDINATOR": 0,
                    "ARCHIVED": 0,
                    "total": 0,
                };
            }

            if (map[coordinatorName][status] !== undefined) {
                map[coordinatorName][status] += 1;
            }

            map[coordinatorName].total += 1;
        });

        return Object.values(map);
    };

    const buildCoordinatorInternshipMap = (internships: any[]) => {
        const internshipMap: Record<string, any[]> = {};

        internships.forEach((internship) => {
            const coordinatorName = internship.coordinatorView?.name || "Непознат Координатор";

            if (!internshipMap[coordinatorName]) {
                internshipMap[coordinatorName] = [];
            }

            internshipMap[coordinatorName].push(internship);
        });

        return internshipMap;
    };

    const buildDistributionGraph = (internships: InternshipView[]) => {
        const startingMap : StatusDistributionItem[] = [
            { name: 'SEARCHING', value: 0, color: '#FBBF24' },
            { name: 'SUBMITTED', value: 0, color: '#3B82F6' },
            { name: 'ACCEPTED', value: 0, color: '#10B981' },
            { name: 'JOURNAL_SUBMITTED', value: 0, color: '#8B5CF6' },
            { name: 'VALIDATED_BY_COMPANY', value: 0, color: '#F59E0B' },
            { name: 'VALIDATED_BY_COORDINATOR', value: 0, color: '#EF4444' },
            { name: 'ARCHIVED', value: 0, color: '#6B7280' }
        ]

        internships.forEach((internship) => {
            const distItem = startingMap.find(item => item.name === internship.status);
            if (distItem) {
                distItem.value += 1;
            }
        })

        return startingMap;
    }

    const fetchInternships = async () => {
        setLoading(true);
        try {
            const internshipsResponse = await internshipApi.getInternships();
            setAllInternships(internshipsResponse)

            const numberOfCompanies = await adminQueryApi.getNumberOfCompanies();
            setTotalCompanies(numberOfCompanies)

            const activeInternships = internshipsResponse
                .filter(item => item.status !== 'ARCHIVED')
            setActiveInternships(activeInternships)

            const statusDist = buildDistributionGraph(internshipsResponse)
            setStatusDistribution(statusDist)

            const internships = internshipsResponse
                .filter((item: any) => item.status !== 'SEARCHING' && item.status !== "SUBMITTED")

            setInternships(internships);
            console.log("All internships: ", internshipsResponse)

            const summaryMap = buildCoordinatorSummaryMap(internships);
            setSummaryMap(summaryMap)

            const internshipMap = buildCoordinatorInternshipMap(internships);
            setInternshipMap(internshipMap)
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

    useEffect(() => {
        fetchInternships()
    }, []);

    const overviewStats = [
        {
            title: "Вкупно Пракси",
            value: allInternships.length,
            change: "+12%",
            trend: "up",
            icon: FileText,
            color: "from-blue-500 to-cyan-500"
        },
        {
            title: "Активни Пракси",
            value: activeInternships.length,
            change: "+8%",
            trend: "up",
            icon: Users,
            color: "from-purple-500 to-pink-500"
        },
        {
            title: "Партнер Компании",
            value: totalCompanies,
            change: "+5%",
            trend: "up",
            icon: Building2,
            color: "from-orange-500 to-red-500"
        },
        {
            title: "Завршени Пракси",
            value: allInternships.length - activeInternships.length,
            change: "+18%",
            trend: "up",
            icon: CheckCircle2,
            color: "from-green-500 to-emerald-500"
        },
    ];

    const monthlyTrends = [
        { month: 'Јан', пракси: 12, студенти: 15, компании: 8 },
        { month: 'Фев', пракси: 15, студенти: 18, компании: 10 },
        { month: 'Мар', пракси: 18, студенти: 22, компании: 12 },
        { month: 'Апр', пракси: 22, студенти: 28, компании: 15 },
        { month: 'Мај', пракси: 28, студенти: 35, компании: 18 },
        { month: 'Јун', пракси: 35, студенти: 42, компании: 22 },
    ];

    const statusColors = {
        'ACCEPTED': 'hsl(45.4 93.4% 47.5%)',
        'JOURNAL SUBMITTED': 'hsl(217.2 91.2% 59.8%)',
        'VALIDATED BY COMPANY': 'hsl(142.1 76.2% 36.3%)',
        'VALIDATED BY COORDINATOR': 'hsl(283,73%,45%)',
        'ARCHIVED': 'hsl(0 84.2% 60.2%)',
    };

    if(loading) {
        return <Loading/>
    }

    return (
        <div className="space-y-6 pb-8">
            {/* Overview Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {overviewStats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={index} className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5`}></div>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    {stat.title}
                                </CardTitle>
                                <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color}`}>
                                    <Icon className="h-4 w-4 text-white" />
                                </div>
                            </CardHeader>
                            <CardContent className="relative z-10">
                                <div className="text-3xl font-bold">{stat.value}</div>
                                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                                    <TrendingUp className="h-3 w-3 text-green-500" />
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
                    {/*<TabsTrigger value="trends">Трендови</TabsTrigger>*/}
                    <TabsTrigger value="distribution">Дистрибуција</TabsTrigger>
                    <TabsTrigger value="statistic">Изведба</TabsTrigger>
                </TabsList>

                <TabsContent value="trends" className="space-y-4">
                    <Card className="border-0 shadow-lg">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5" />
                                Месечни Трендови
                            </CardTitle>
                            <CardDescription>Преглед на пракси, студенти и компании по месец</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={350}>
                                <AreaChart data={monthlyTrends}>
                                    <defs>
                                        <linearGradient id="colorПракси" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="hsl(217.2 91.2% 59.8%)" stopOpacity={0.8}/>
                                            <stop offset="95%" stopColor="hsl(217.2 91.2% 59.8%)" stopOpacity={0}/>
                                        </linearGradient>
                                        <linearGradient id="colorСтуденти" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="hsl(142.1 76.2% 36.3%)" stopOpacity={0.8}/>
                                            <stop offset="95%" stopColor="hsl(142.1 76.2% 36.3%)" stopOpacity={0}/>
                                        </linearGradient>
                                        <linearGradient id="colorКомпании" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="hsl(45.4 93.4% 47.5%)" stopOpacity={0.8}/>
                                            <stop offset="95%" stopColor="hsl(45.4 93.4% 47.5%)" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                                    <YAxis stroke="hsl(var(--muted-foreground))" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'hsl(var(--card))',
                                            border: '1px solid hsl(var(--border))',
                                            borderRadius: '8px'
                                        }}
                                    />
                                    <Legend />
                                    <Area type="monotone" dataKey="пракси" stroke="hsl(217.2 91.2% 59.8%)" fillOpacity={1} fill="url(#colorПракси)" />
                                    <Area type="monotone" dataKey="студенти" stroke="hsl(142.1 76.2% 36.3%)" fillOpacity={1} fill="url(#colorСтуденти)" />
                                    <Area type="monotone" dataKey="компании" stroke="hsl(45.4 93.4% 47.5%)" fillOpacity={1} fill="url(#colorКомпании)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="distribution" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <Card className="border-0 shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Target className="h-5 w-5" />
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
                                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                            outerRadius={100}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {statusDistribution.filter(item => item.value > 0).map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Award className="h-5 w-5" />
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
                                                    style={{ backgroundColor: status.color }}
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
                                <UserCheck className="h-5 w-5" />
                                Пракси по Координатор и Статус
                            </CardTitle>
                            <CardDescription>Преглед на вкупниот број пракси за секој координатор поделени по статус.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={350}>
                                <BarChart data={summaryMap}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                    <XAxis dataKey="coordinator" stroke="hsl(var(--muted-foreground))" />
                                    <YAxis stroke="hsl(var(--muted-foreground))" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'hsl(var(--card))',
                                            border: '1px solid hsl(var(--border))',
                                            borderRadius: '8px'
                                        }}
                                        // Custom Tooltip to show Coordinator and status breakdown
                                        formatter={(value, name, props) => [value, name]}
                                    />
                                    <Legend />

                                    {/* Stacked Bars - Note the use of stackId="a" on all Bars */}
                                    <Bar
                                        dataKey="ACCEPTED"
                                        stackId="a"
                                        fill={statusColors['ACCEPTED']}
                                        name="ACCEPTED"
                                        radius={[4, 4, 0, 0]}
                                    />
                                    <Bar
                                        dataKey="JOURNAL_SUBMITTED"
                                        stackId="a"
                                        fill={statusColors['JOURNAL SUBMITTED']}
                                        name="JOURNAL SUBMITTED"
                                    />
                                    <Bar
                                        dataKey="VALIDATED_BY_COMPANY"
                                        stackId="a"
                                        fill={statusColors['VALIDATED BY COMPANY']}
                                        name="VALIDATED BY COMPANY"
                                    />
                                    <Bar
                                        dataKey="VALIDATED_BY_COORDINATOR"
                                        stackId="a"
                                        fill={statusColors['VALIDATED BY COORDINATOR']}
                                        name="VALIDATED BY COORDINATOR"
                                        radius={[0, 0, 4, 4]}
                                    />
                                    <Bar
                                        dataKey="ARCHIVED"
                                        stackId="a"
                                        fill={statusColors['ARCHIVED']}
                                        name="ARCHIVED"
                                        radius={[0, 0, 4, 4]}
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
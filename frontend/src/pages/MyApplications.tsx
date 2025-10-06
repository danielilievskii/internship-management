import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Building2, Calendar, MapPin, Clock } from "lucide-react";
import StatusBadge from "@/components/internships/StatusBadge";
import type { InternshipStatus } from "@/types/internship";

interface Application {
    id: string;
    companyName: string;
    position: string;
    location: string;
    appliedDate: string;
    status: InternshipStatus;
    description: string;
    workingHours: number;
}

// Mock data - replace with actual API call
const mockApplications: Application[] = [
    {
        id: '1',
        companyName: 'TechCorp Macedonia',
        position: 'Frontend Developer Intern',
        location: 'Skopje',
        appliedDate: '2024-01-15',
        status: 'SUBMITTED',
        description: 'Working on React applications and modern web technologies.',
        workingHours: 40
    },
    {
        id: '2',
        companyName: 'Digital Solutions Ltd',
        position: 'Full Stack Developer Intern',
        location: 'Bitola',
        appliedDate: '2024-01-10',
        status: 'ACCEPTED',
        description: 'Full stack development using Node.js and React.',
        workingHours: 35
    },
    {
        id: '3',
        companyName: 'StartupHub',
        position: 'UI/UX Design Intern',
        location: 'Ohrid',
        appliedDate: '2024-01-05',
        status: 'REJECTED',
        description: 'User interface and experience design for mobile apps.',
        workingHours: 30
    }
];

const MyApplications = () => {
    const [applications] = useState<Application[]>(mockApplications);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');

    const filteredApplications = applications.filter(app => {
        const matchesSearch = app.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.position.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('mk-MK', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="container mx-auto p-6 space-y-6">
            <div className="flex flex-col space-y-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Моите Апликации</h1>
                    <p className="text-muted-foreground">
                        Преглед на сите компании и позиции за кои сте аплицирале
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                            placeholder="Барај по компанија или позиција..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-full sm:w-[200px]">
                            <SelectValue placeholder="Филтрирај по статус" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Сите статуси</SelectItem>
                            <SelectItem value="SUBMITTED">Поднесено</SelectItem>
                            <SelectItem value="ACCEPTED">Прифатено</SelectItem>
                            <SelectItem value="REJECTED">Одбиено</SelectItem>
                            <SelectItem value="SEARCHING">Барам</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Applications Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredApplications.map((application) => (
                    <Card key={application.id} className="hover:shadow-lg transition-shadow flex flex-col">
                        <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-2">
                                    <Building2 className="h-5 w-5 text-primary" />
                                    <CardTitle className="text-lg">{application.companyName}</CardTitle>
                                </div>
                                <StatusBadge status={application.status} />
                            </div>
                            <CardDescription className="font-medium text-foreground">
                                {application.position}
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-3 flex-1">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                <span>{application.location}</span>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                <span>Аплицирано: {formatDate(application.appliedDate)}</span>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                <span>{application.workingHours} часа неделно</span>
                            </div>

                            <p className="text-sm text-muted-foreground line-clamp-3">
                                {application.description}
                            </p>
                        </CardContent>

                        <CardFooter>
                            <Button variant="outline" size="sm" className="w-full">
                                Погледни детали
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {filteredApplications.length === 0 && (
                <div className="text-center py-12">
                    <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Нема пронајдени апликации</h3>
                    <p className="text-muted-foreground">
                        {searchTerm || statusFilter
                            ? 'Пробајте да ги промените филтрите за пребарување.'
                            : 'Сè уште не сте аплицирале за ниедна позиција.'
                        }
                    </p>
                </div>
            )}
        </div>
    );
};

export default MyApplications;
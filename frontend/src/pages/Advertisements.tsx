import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Building, MapPin, Clock, Users, ExternalLink } from 'lucide-react';
import { useAuthStore } from '@/store/authStore.ts';

const Advertisements = () => {
  const { user } = useAuthStore();
  const mockAdvertisements = [
    {
      id: '1',
      title: 'Frontend Developer Intern',
      company: 'Netcetera',
      location: 'Skopje',
      type: 'Full-time',
      duration: '3 месеци',
      deadline: '2025-10-15',
      description: 'Бараме мотивиран студент за работа со React, TypeScript и современи веб технологии...',
      requirements: ['React', 'TypeScript', 'HTML/CSS', 'Git'],
      isActive: true
    },
    {
      id: '2',
      title: 'Backend Developer Intern',
      company: 'Seavus',
      location: 'Skopje',
      type: 'Full-time',
      duration: '4 месеци',
      deadline: '2025-10-20',
      description: 'Можност за стекнување искуство во развој на серверски апликации со Java и Spring Boot...',
      requirements: ['Java', 'Spring Boot', 'SQL', 'REST API'],
      isActive: true
    },
    {
      id: '3',
      title: 'Mobile Developer Intern',
      company: 'ThoughtWorks',
      location: 'Скопје/Remote',
      type: 'Hybrid',
      duration: '3 месеци',
      deadline: '2025-09-30',
      description: 'Развој на мобилни апликации за Android и iOS платформи...',
      requirements: ['React Native', 'Flutter', 'Mobile Development'],
      isActive: false
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Огласи за пракси</h1>
        <Badge variant="secondary" className="text-sm">
          {mockAdvertisements.filter(a => a.isActive).length} активни огласи
        </Badge>
      </div>

      <div className="grid gap-6">
        {mockAdvertisements.map((advertisement) => (
          <Card key={advertisement.id} className={!advertisement.isActive ? "opacity-60" : ""}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{advertisement.title}</CardTitle>
                  <CardDescription className="flex items-center gap-4 mt-2">
                    <span className="flex items-center gap-1">
                      <Building className="h-4 w-4" />
                      {advertisement.company}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {advertisement.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {advertisement.duration}
                    </span>
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={advertisement.isActive ? "default" : "secondary"}>
                    {advertisement.isActive ? "Активен" : "Истечен"}
                  </Badge>
                  <Badge variant="outline">
                    {advertisement.type}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                {advertisement.description}
              </p>

              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Потребни вештини:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {advertisement.requirements.map((req) => (
                    <Badge key={req} variant="secondary" className="text-xs">
                      {req}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="text-sm text-muted-foreground">
                  Краен рок за аплицирање: <span className="font-medium">{advertisement.deadline}</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Детали
                  </Button>
                  {user?.role === 'Student' && (
                    <Button 
                      size="sm"
                      disabled={!advertisement.isActive}
                      className="bg-action-view text-action-view-foreground hover:bg-action-view/90"
                    >
                      Аплицирај
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Advertisements;
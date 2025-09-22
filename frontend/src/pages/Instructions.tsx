import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { BookOpen, Users, Building, Settings } from 'lucide-react';

const Instructions = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Инструкции за користење на системот</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              За студенти
            </CardTitle>
            <CardDescription>Како да го користите системот како студент</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <h4 className="font-medium">1. Прикачување на CV</h4>
              <p className="text-sm text-muted-foreground">
                Прикачете го вашиот CV во PDF формат за да можете да аплицирате за пракси.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">2. Преглед на понуди</h4>
              <p className="text-sm text-muted-foreground">
                Прегледајте ги достапните пракси и аплицирајте за оние што ви одговараат.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">3. Ведење дневник</h4>
              <p className="text-sm text-muted-foreground">
                Редовно ажурирајте го вашиот дневник со неделните активности.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              За компании
            </CardTitle>
            <CardDescription>Како да го користите системот како компанија</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <h4 className="font-medium">1. Објавување на позиции</h4>
              <p className="text-sm text-muted-foreground">
                Објавувајте нови позиции за стажирање и управувајте со аплицирањата.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">2. Преглед на кандидати</h4>
              <p className="text-sm text-muted-foreground">
                Прегледајте ги CV-јата и профилите на заинтересираните студенти.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">3. Следење на напредокот</h4>
              <p className="text-sm text-muted-foreground">
                Следете го напредокот на стажантите преку нивните дневници.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              За координатори
            </CardTitle>
            <CardDescription>Како да го користите системот како координатор</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <h4 className="font-medium">1. Управување со пракси</h4>
              <p className="text-sm text-muted-foreground">
                Имате преглед над сите пракси во системот и можете да ги управувате.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">2. Валидација на дневници</h4>
              <p className="text-sm text-muted-foreground">
                Валидирајте или означете како неважечки дневници од студентите.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">3. Архивирање</h4>
              <p className="text-sm text-muted-foreground">
                Архивирајте завршени пракси за да го одржите системот организиран.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Општи упатства
            </CardTitle>
            <CardDescription>Важни информации за сите корисници</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <h4 className="font-medium">Технички барања</h4>
              <p className="text-sm text-muted-foreground">
                Користете современ веб прелистувач за најдобро искуство.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Поддршка</h4>
              <p className="text-sm text-muted-foreground">
                За техничка помош контактирајте го ИТ тимот на универзитетот.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Безбедност</h4>
              <p className="text-sm text-muted-foreground">
                Никогаш не споделувајте ги вашите лозинки со други лица.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Instructions;
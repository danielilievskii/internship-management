import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button.tsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Label } from '@/components/ui/label.tsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.tsx';
import { useAuthStore } from '@/store/authStore.ts';
import { useToast } from '@/hooks/use-toast.ts';
import { UserRole } from '@/types/internship.ts';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuthStore();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '' as UserRole | '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password || !formData.role) {
      toast({
        title: 'Грешка',
        description: 'Ве молиме пополнете ги сите полиња',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      // Mock authentication - in real app, call API
      const mockUser = {
        id: '1',
        name: formData.role === 'Student' ? 'John Doe' : 
              formData.role === 'Company' ? 'Netcetera Admin' : 
              'Координатор Админ',
        email: formData.email,
        role: formData.role as UserRole,
      };

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      login(mockUser);
      
      toast({
        title: 'Добредојдовте!',
        description: `Успешно се најавивте како ${formData.role}`,
      });

      // Redirect based on role
      if (formData.role === 'Coordinator') {
        navigate('/all-internships');
      } else {
        navigate('/instructions');
      }
    } catch (error) {
      toast({
        title: 'Грешка при најава',
        description: 'Неточни податоци за најава',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Систем за пракси</CardTitle>
          <CardDescription>
            Најавете се за да пристапите до системот
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email адреса</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="example@email.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Лозинка</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                placeholder="••••••••"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Улога</Label>
              <Select
                value={formData.role}
                onValueChange={(value: UserRole) => setFormData(prev => ({ ...prev, role: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Изберете улога" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Student">Студент</SelectItem>
                  <SelectItem value="Company">Компанија</SelectItem>
                  <SelectItem value="Coordinator">Координатор</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Се најавувате...' : 'Најави се'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
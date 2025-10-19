import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button.tsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Label } from '@/components/ui/label.tsx';
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
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast({
        title: 'Грешка',
        description: 'Ве молиме пополнете ги сите полиња',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      console.log(response)

      if(!response.ok) {
        toast({
          title: 'Грешни креденцијали!',
          description: 'Внесовте грешен мејл или грешна лозинка.',
          variant: 'destructive'
        })
      }

      const data = await response.json();

      const token = data.access_token;
      // const refresh = data.refresh_token;

      const payload = JSON.parse(atob(token.split(".")[1]));

      const roles = payload.realm_access?.roles || []
      const role = roles.includes("student") ? 'Student' :
          roles.includes("company") ? 'Company' :
          roles.includes("professor") ? 'Coordinator' : 'Admin'

      const user = {
        id: '1',
        name: payload.name || formData.email,
        email: payload.email || formData.email,
        role: role as UserRole,
        // token,
        // refresh,
      };

      login(user)
      localStorage.setItem("auth-token", token)
      
      toast({
        title: 'Добредојдовте!',
        description: `Успешно се најавивте!`,
      });

      if (user.role === 'Admin') {
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
              <Label htmlFor="text">Корисничко име</Label>
              <Input
                id="email"
                type="text"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
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
                required
              />
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
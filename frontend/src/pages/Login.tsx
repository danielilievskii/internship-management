import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {KEYCLOAK_AUTH_URL, KEYCLOAK_CLIENT_ID, KEYCLOAK_LOGIN_REDIRECT_URI} from "@/config/auth.ts";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    const params = new URLSearchParams({
      client_id: KEYCLOAK_CLIENT_ID,
      response_type: "code",
      scope: "openid",
      redirect_uri: KEYCLOAK_LOGIN_REDIRECT_URI,
    });

    window.location.href = `${KEYCLOAK_AUTH_URL}?${params.toString()}`;
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
          <Button
            onClick={handleLogin}
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Се најавувате...' : 'Најави се'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
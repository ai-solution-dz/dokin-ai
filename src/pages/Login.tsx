
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Login = () => {
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (login(formData.email, formData.password)) {
      toast({
        title: "Login Successful",
        description: "Welcome back to AI Solutions!",
      });
      navigate('/dashboard');
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Try demo@ai.dz / demo123",
        variant: "destructive",
      });
    }
  };

  const handleDemoLogin = () => {
    setFormData({
      email: 'demo@ai.dz',
      password: 'demo123'
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <Card className="w-full max-w-md bg-gray-800 border-gray-700">
        <CardHeader className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold">AI</span>
          </div>
          <CardTitle className="text-2xl text-white">
            {t('auth.login.title')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">
                {t('auth.email')}
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">
                {t('auth.password')}
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              {t('auth.login.button')}
            </Button>
          </form>

          <div className="text-center">
            <Button
              variant="outline"
              onClick={handleDemoLogin}
              className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Try Demo Account
            </Button>
          </div>

          <div className="text-center text-sm">
            <span className="text-gray-400">
              {t('auth.switch.signup')}
            </span>
            {' '}
            <Link to="/signup" className="text-blue-400 hover:text-blue-300 transition-colors">
              {t('nav.signup')}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;

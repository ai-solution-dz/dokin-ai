
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Key, CreditCard, FileText, TrendingUp, Copy } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Dashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  if (!user?.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  const stats = [
    {
      title: t('dashboard.processed'),
      value: '1,247',
      icon: FileText,
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: t('dashboard.thisMonth'),
      value: '89',
      icon: TrendingUp,
      change: '+5%',
      changeType: 'positive'
    }
  ];

  const chartData = [
    { month: 'Jan', invoices: 45 },
    { month: 'Feb', invoices: 78 },
    { month: 'Mar', invoices: 123 },
    { month: 'Apr', invoices: 95 },
    { month: 'May', invoices: 156 },
    { month: 'Jun', invoices: 89 }
  ];

  const copyApiKey = () => {
    navigator.clipboard.writeText(user.apiKey);
    toast({
      title: "API Key Copied",
      description: "API key has been copied to clipboard",
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            {t('dashboard.welcome')}, {user.name}!
          </h1>
          <p className="text-gray-400">
            Monitor your Doc-IN usage and performance
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* API Key Card */}
          <Card className="bg-gray-800 border-gray-700 col-span-1 md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">
                {t('dashboard.apiKey')}
              </CardTitle>
              <Key className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <code className="text-lg font-mono text-white bg-gray-700 px-3 py-2 rounded">
                  {user.apiKey}
                </code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyApiKey}
                  className="text-gray-400 hover:text-white"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Plan Card */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">
                {t('dashboard.plan')}
              </CardTitle>
              <CreditCard className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{user.currentPlan}</div>
              <p className="text-xs text-gray-400">
                {user.currentPlan === 'Test' ? 'Free plan' : 'Premium features'}
              </p>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          {stats.map((stat, index) => (
            <Card key={index} className="bg-gray-800 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <p className="text-xs text-green-400">
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Usage Chart */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">{t('dashboard.usage')}</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="invoices" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: 'Invoice processed', file: 'invoice_2024_001.pdf', time: '2 minutes ago' },
                  { action: 'API call made', endpoint: '/extract', time: '5 minutes ago' },
                  { action: 'Invoice processed', file: 'facture_012.pdf', time: '12 minutes ago' },
                  { action: 'Invoice processed', file: 'invoice_dz_789.pdf', time: '1 hour ago' },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-gray-700 last:border-0">
                    <div>
                      <p className="text-white text-sm font-medium">{activity.action}</p>
                      <p className="text-gray-400 text-xs">
                        {activity.file || activity.endpoint}
                      </p>
                    </div>
                    <span className="text-gray-400 text-xs">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

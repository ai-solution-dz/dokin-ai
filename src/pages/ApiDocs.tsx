
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code, Upload, Download, BarChart3 } from 'lucide-react';

const ApiDocs = () => {
  const { t } = useLanguage();

  const endpoints = [
    {
      method: 'POST',
      path: '/api/v1/upload-invoice',
      title: t('api.upload.title'),
      description: 'Upload an invoice file for AI processing',
      icon: Upload,
      example: {
        request: {
          headers: {
            'Authorization': 'Bearer dokin_abc123_xyz789',
            'Content-Type': 'multipart/form-data'
          },
          body: 'Form data with "file" field containing the invoice'
        },
        response: {
          id: 'inv_12345',
          status: 'processing',
          filename: 'invoice_001.pdf',
          created_at: '2024-01-15T10:30:00Z'
        }
      }
    },
    {
      method: 'GET',
      path: '/api/v1/extract/{invoice_id}',
      title: t('api.extract.title'),
      description: 'Retrieve extracted data from a processed invoice',
      icon: Download,
      example: {
        request: {
          headers: {
            'Authorization': 'Bearer dokin_abc123_xyz789'
          }
        },
        response: {
          id: 'inv_12345',
          status: 'completed',
          data: {
            invoice_number: 'INV-2024-001',
            date: '2024-01-15',
            total_amount: 1500.00,
            currency: 'DZD',
            vendor: {
              name: 'ABC Company',
              tax_id: '123456789'
            },
            items: [
              {
                description: 'Service A',
                quantity: 1,
                unit_price: 1500.00,
                total: 1500.00
              }
            ]
          }
        }
      }
    },
    {
      method: 'GET',
      path: '/api/v1/usage',
      title: t('api.usage.title'),
      description: 'Get current usage statistics and limits',
      icon: BarChart3,
      example: {
        request: {
          headers: {
            'Authorization': 'Bearer dokin_abc123_xyz789'
          }
        },
        response: {
          current_plan: 'Pro',
          invoices_processed: 245,
          monthly_limit: 500,
          reset_date: '2024-02-01T00:00:00Z',
          remaining: 255
        }
      }
    }
  ];

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'POST': return 'bg-green-600';
      case 'GET': return 'bg-blue-600';
      case 'PUT': return 'bg-yellow-600';
      case 'DELETE': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6">
            <Code className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            {t('api.title')}
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            {t('api.overview')}
          </p>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-sm text-gray-300 mb-2">Base URL:</p>
            <code className="text-blue-400 font-mono">https://api.docin.ai.dz</code>
          </div>
        </div>

        {/* Authentication */}
        <Card className="bg-gray-800 border-gray-700 mb-12">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Code className="w-5 h-5 mr-2" />
              Authentication
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-4">
              All API requests require authentication using your API key in the Authorization header:
            </p>
            <div className="bg-gray-900 p-4 rounded-lg">
              <code className="text-green-400 font-mono">
                Authorization: Bearer YOUR_API_KEY
              </code>
            </div>
          </CardContent>
        </Card>

        {/* Endpoints */}
        <div className="space-y-8">
          {endpoints.map((endpoint, index) => (
            <Card key={index} className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center">
                    <endpoint.icon className="w-5 h-5 mr-3" />
                    {endpoint.title}
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge className={`${getMethodColor(endpoint.method)} text-white`}>
                      {endpoint.method}
                    </Badge>
                  </div>
                </div>
                <p className="text-gray-400">{endpoint.description}</p>
                <code className="text-blue-400 text-sm font-mono">
                  {endpoint.path}
                </code>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Request */}
                  <div>
                    <h4 className="text-white font-semibold mb-3">Request</h4>
                    <div className="bg-gray-900 p-4 rounded-lg">
                      <pre className="text-sm text-gray-300 overflow-x-auto">
                        {JSON.stringify(endpoint.example.request, null, 2)}
                      </pre>
                    </div>
                  </div>
                  
                  {/* Response */}
                  <div>
                    <h4 className="text-white font-semibold mb-3">Response</h4>
                    <div className="bg-gray-900 p-4 rounded-lg">
                      <pre className="text-sm text-gray-300 overflow-x-auto">
                        {JSON.stringify(endpoint.example.response, null, 2)}
                      </pre>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* SDKs and Libraries */}
        <Card className="bg-gray-800 border-gray-700 mt-12">
          <CardHeader>
            <CardTitle className="text-white">SDKs & Libraries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'Python', status: 'Available', color: 'bg-green-600' },
                { name: 'JavaScript', status: 'Available', color: 'bg-green-600' },
                { name: 'PHP', status: 'Coming Soon', color: 'bg-yellow-600' }
              ].map((sdk, index) => (
                <div key={index} className="bg-gray-900 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">{sdk.name}</h4>
                  <Badge className={`${sdk.color} text-white`}>
                    {sdk.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Rate Limits */}
        <Card className="bg-gray-800 border-gray-700 mt-8">
          <CardHeader>
            <CardTitle className="text-white">Rate Limits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">60</div>
                <div className="text-gray-400">requests/minute</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">1000</div>
                <div className="text-gray-400">requests/hour</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">10MB</div>
                <div className="text-gray-400">max file size</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ApiDocs;

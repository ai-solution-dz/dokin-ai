
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Zap, Building, TestTube } from 'lucide-react';

const Pricing = () => {
  const { t } = useLanguage();
  const { user } = useAuth();

  const plans = [
    {
      name: t('pricing.test.name'),
      price: t('pricing.test.price'),
      description: t('pricing.test.desc'),
      invoices: t('pricing.test.invoices'),
      icon: TestTube,
      color: 'from-gray-500 to-gray-600',
      current: user?.currentPlan === 'Test',
      features: [
        '25 invoices per month',
        'Basic AI processing',
        'Email support',
        'API access'
      ]
    },
    {
      name: t('pricing.pro.name'),
      price: t('pricing.pro.price'),
      description: t('pricing.pro.desc'),
      invoices: t('pricing.pro.invoices'),
      icon: Zap,
      color: 'from-blue-500 to-purple-600',
      popular: true,
      current: user?.currentPlan === 'Pro',
      features: [
        '500 invoices per month',
        'Advanced AI processing',
        'Priority support',
        'API access',
        'Custom fields',
        'Batch processing'
      ]
    },
    {
      name: t('pricing.enterprise.name'),
      price: t('pricing.enterprise.price'),
      description: t('pricing.enterprise.desc'),
      invoices: t('pricing.enterprise.invoices'),
      icon: Building,
      color: 'from-purple-500 to-pink-600',
      current: user?.currentPlan === 'Enterprise',
      features: [
        'Unlimited invoices',
        'Premium AI models',
        '24/7 dedicated support',
        'API access',
        'Custom integrations',
        'On-premise deployment',
        'SLA guarantee'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            {t('pricing.title')}
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Choose the perfect plan for your business needs. All plans include our core AI-powered invoice processing.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`bg-gray-800 border-gray-700 relative ${
                plan.popular ? 'ring-2 ring-blue-500 transform scale-105' : ''
              } ${plan.current ? 'ring-2 ring-green-500' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              {plan.current && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-green-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Current Plan
                  </span>
                </div>
              )}
              
              <CardHeader className="text-center pb-6">
                <div className={`w-16 h-16 bg-gradient-to-br ${plan.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  <plan.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-white mb-2">
                  {plan.name}
                </CardTitle>
                <div className="text-3xl font-bold text-white mb-2">
                  {plan.price}
                </div>
                <p className="text-gray-400">{plan.description}</p>
                <p className="text-blue-400 font-medium">{plan.invoices}</p>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-300">
                      <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                {plan.current ? (
                  <Button 
                    disabled 
                    className="w-full bg-gray-600 text-gray-300"
                  >
                    Current Plan
                  </Button>
                ) : plan.price === t('pricing.enterprise.price') ? (
                  <Button 
                    variant="outline" 
                    className="w-full border-gray-600 text-white hover:bg-gray-700"
                  >
                    Contact Sales
                  </Button>
                ) : user?.isLoggedIn ? (
                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-blue-600 hover:bg-blue-700' 
                        : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                  >
                    Upgrade Now
                  </Button>
                ) : (
                  <Link to="/signup">
                    <Button 
                      className={`w-full ${
                        plan.popular 
                          ? 'bg-blue-600 hover:bg-blue-700' 
                          : 'bg-gray-700 hover:bg-gray-600'
                      }`}
                    >
                      Get Started
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-24 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "What happens if I exceed my invoice limit?",
                answer: "You'll be notified when approaching your limit. Additional invoices can be processed at a per-unit rate."
              },
              {
                question: "Can I change my plan anytime?",
                answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately."
              },
              {
                question: "Do you support Algerian Dinar payments?",
                answer: "Yes, we accept payments in Algerian Dinar through local payment methods."
              },
              {
                question: "Is there a setup fee?",
                answer: "No setup fees. Pay only for your chosen plan with no hidden costs."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-400">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;

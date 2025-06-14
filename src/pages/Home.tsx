
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Brain, 
  Zap, 
  Shield, 
  Globe, 
  Clock, 
  DollarSign, 
  Target,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const Home = () => {
  const { t, isRTL } = useLanguage();
  const { user } = useAuth();

  const features = [
    {
      icon: Brain,
      title: t('features.accuracy.title'),
      description: t('features.accuracy.desc'),
    },
    {
      icon: Zap,
      title: t('features.speed.title'),
      description: t('features.speed.desc'),
    },
    {
      icon: Shield,
      title: t('features.integration.title'),
      description: t('features.integration.desc'),
    },
    {
      icon: Globe,
      title: t('features.support.title'),
      description: t('features.support.desc'),
    },
  ];

  const benefits = [
    {
      icon: Clock,
      title: t('benefits.time.title'),
      description: t('benefits.time.desc'),
    },
    {
      icon: DollarSign,
      title: t('benefits.cost.title'),
      description: t('benefits.cost.desc'),
    },
    {
      icon: Target,
      title: t('benefits.accuracy.title'),
      description: t('benefits.accuracy.desc'),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
              {t('home.hero.title')}
            </h1>
            <p className="text-xl lg:text-2xl text-blue-400 mb-8 animate-fade-in">
              {t('home.hero.subtitle')}
            </p>
            <p className="text-lg text-gray-300 mb-12 max-w-3xl mx-auto animate-fade-in">
              {t('home.hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              {user?.isLoggedIn ? (
                <Link to="/dashboard">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
                    {t('home.cta.dashboard')}
                    <ArrowRight className={`w-5 h-5 ${isRTL ? 'mr-2' : 'ml-2'}`} />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/signup">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
                      {t('home.cta.start')}
                      <ArrowRight className={`w-5 h-5 ${isRTL ? 'mr-2' : 'ml-2'}`} />
                    </Button>
                  </Link>
                  <Link to="/pricing">
                    <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-gray-600 text-white hover:bg-gray-800">
                      {t('nav.pricing')}
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              {t('features.title')}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700 hover-scale">
                <CardContent className="p-6">
                  <feature.icon className="w-12 h-12 text-blue-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              {t('benefits.title')}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <benefit.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-400 text-lg">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8">
              {t('about.title')}
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              {t('about.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Powered by Advanced AI
            </h2>
            <p className="text-lg text-gray-400">
              Built with cutting-edge technology for maximum performance
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {['Machine Learning', 'Neural Networks', 'OCR Technology', 'Cloud Computing'].map((tech, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
                <p className="text-gray-300 font-medium">{tech}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join hundreds of Algerian businesses already using Doc-IN
          </p>
          {!user?.isLoggedIn && (
            <Link to="/signup">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3">
                {t('home.cta.start')}
                <ArrowRight className={`w-5 h-5 ${isRTL ? 'mr-2' : 'ml-2'}`} />
              </Button>
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;


import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.dashboard': 'Dashboard',
    'nav.pricing': 'Pricing',
    'nav.api': 'API Docs',
    'nav.login': 'Login',
    'nav.signup': 'Sign Up',
    'nav.logout': 'Logout',
    
    // Home Page
    'home.hero.title': 'AI Solutions',
    'home.hero.subtitle': 'Let AI read your invoices',
    'home.hero.description': 'Doc-IN is an AI-powered invoice reader designed specifically for Algerian businesses. Transform your invoice processing with cutting-edge artificial intelligence.',
    'home.cta.dashboard': 'Explore Dashboard',
    'home.cta.start': 'Start Now',
    
    // Features
    'features.title': 'Why Choose Doc-IN?',
    'features.accuracy.title': 'AI-Powered Accuracy',
    'features.accuracy.desc': 'Our advanced AI extracts data with 99%+ accuracy from Arabic and French invoices.',
    'features.speed.title': 'Lightning Fast',
    'features.speed.desc': 'Process hundreds of invoices in seconds, not hours.',
    'features.integration.title': 'Easy Integration',
    'features.integration.desc': 'Simple REST API integration with your existing business systems.',
    'features.support.title': 'Local Support',
    'features.support.desc': 'Dedicated support for Algerian businesses in Arabic and French.',
    
    // About
    'about.title': 'About AI Solutions',
    'about.description': 'We are a cutting-edge technology company focused on bringing AI innovation to Algerian businesses. Our flagship product, Doc-IN, revolutionizes invoice processing through advanced machine learning algorithms.',
    
    // Benefits
    'benefits.title': 'Transform Your Business',
    'benefits.time.title': 'Save Time',
    'benefits.time.desc': 'Reduce invoice processing time by 90%',
    'benefits.cost.title': 'Cut Costs',
    'benefits.cost.desc': 'Lower operational expenses significantly',
    'benefits.accuracy.title': 'Improve Accuracy',
    'benefits.accuracy.desc': 'Eliminate human errors in data entry',
    
    // Dashboard
    'dashboard.welcome': 'Welcome back',
    'dashboard.apiKey': 'API Key',
    'dashboard.plan': 'Current Plan',
    'dashboard.processed': 'Invoices Processed',
    'dashboard.thisMonth': 'This Month',
    'dashboard.usage': 'Usage Statistics',
    
    // Pricing
    'pricing.title': 'Choose Your Plan',
    'pricing.test.name': 'Test Plan',
    'pricing.test.price': 'Free',
    'pricing.test.desc': 'Perfect for testing',
    'pricing.test.invoices': '25 invoices/month',
    'pricing.pro.name': 'Pro Plan',
    'pricing.pro.price': '1,500 DA/month',
    'pricing.pro.desc': 'For growing businesses',
    'pricing.pro.invoices': '500 invoices/month',
    'pricing.enterprise.name': 'Enterprise',
    'pricing.enterprise.price': 'Contact us',
    'pricing.enterprise.desc': 'For large organizations',
    'pricing.enterprise.invoices': 'Unlimited invoices',
    
    // API Docs
    'api.title': 'API Documentation',
    'api.overview': 'Doc-IN REST API Overview',
    'api.upload.title': 'Upload Invoice',
    'api.extract.title': 'Extract Data',
    'api.usage.title': 'Check Usage',
    
    // Auth
    'auth.login.title': 'Login to AI Solutions',
    'auth.signup.title': 'Join AI Solutions',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.name': 'Full Name',
    'auth.company': 'Company Name',
    'auth.login.button': 'Login',
    'auth.signup.button': 'Create Account',
    'auth.switch.login': 'Already have an account? Login',
    'auth.switch.signup': "Don't have an account? Sign up",
    
    // Footer
    'footer.company': 'AI Solutions',
    'footer.description': 'Revolutionizing business processes with AI',
    'footer.rights': 'All rights reserved.',
    'footer.contact': 'Contact',
    'footer.support': 'Support',
    'footer.privacy': 'Privacy',
    'footer.terms': 'Terms',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.dashboard': 'لوحة التحكم',
    'nav.pricing': 'الأسعار',
    'nav.api': 'توثيق API',
    'nav.login': 'تسجيل دخول',
    'nav.signup': 'التسجيل',
    'nav.logout': 'تسجيل خروج',
    
    // Home Page
    'home.hero.title': 'حلول الذكاء الاصطناعي',
    'home.hero.subtitle': 'دع الذكاء الاصطناعي يقرأ فواتيرك',
    'home.hero.description': 'Doc-IN هو قارئ فواتير مدعوم بالذكاء الاصطناعي مصمم خصيصاً للشركات الجزائرية. حول معالجة فواتيرك باستخدام الذكاء الاصطناعي المتطور.',
    'home.cta.dashboard': 'استكشف لوحة التحكم',
    'home.cta.start': 'ابدأ الآن',
    
    // Features
    'features.title': 'لماذا تختار Doc-IN؟',
    'features.accuracy.title': 'دقة مدعومة بالذكاء الاصطناعي',
    'features.accuracy.desc': 'الذكاء الاصطناعي المتقدم يستخرج البيانات بدقة تزيد عن 99% من الفواتير العربية والفرنسية.',
    'features.speed.title': 'سرعة البرق',
    'features.speed.desc': 'معالجة مئات الفواتير في ثوانٍ، وليس ساعات.',
    'features.integration.title': 'تكامل سهل',
    'features.integration.desc': 'تكامل REST API بسيط مع أنظمة عملك الحالية.',
    'features.support.title': 'دعم محلي',
    'features.support.desc': 'دعم مخصص للشركات الجزائرية باللغة العربية والفرنسية.',
    
    // About
    'about.title': 'حول حلول الذكاء الاصطناعي',
    'about.description': 'نحن شركة تكنولوجيا متطورة تركز على جلب ابتكارات الذكاء الاصطناعي للشركات الجزائرية. منتجنا الرئيسي، Doc-IN، يثور معالجة الفواتير من خلال خوارزميات التعلم الآلي المتقدمة.',
    
    // Benefits
    'benefits.title': 'حول عملك',
    'benefits.time.title': 'وفر الوقت',
    'benefits.time.desc': 'قلل وقت معالجة الفواتير بنسبة 90%',
    'benefits.cost.title': 'خفض التكاليف',
    'benefits.cost.desc': 'قلل النفقات التشغيلية بشكل كبير',
    'benefits.accuracy.title': 'حسن الدقة',
    'benefits.accuracy.desc': 'تخلص من الأخطاء البشرية في إدخال البيانات',
    
    // Dashboard
    'dashboard.welcome': 'مرحباً بعودتك',
    'dashboard.apiKey': 'مفتاح API',
    'dashboard.plan': 'الخطة الحالية',
    'dashboard.processed': 'الفواتير المعالجة',
    'dashboard.thisMonth': 'هذا الشهر',
    'dashboard.usage': 'إحصائيات الاستخدام',
    
    // Pricing
    'pricing.title': 'اختر خطتك',
    'pricing.test.name': 'خطة التجربة',
    'pricing.test.price': 'مجاني',
    'pricing.test.desc': 'مثالي للاختبار',
    'pricing.test.invoices': '25 فاتورة/شهر',
    'pricing.pro.name': 'خطة المحترفين',
    'pricing.pro.price': '1,500 دج/شهر',
    'pricing.pro.desc': 'للشركات النامية',
    'pricing.pro.invoices': '500 فاتورة/شهر',
    'pricing.enterprise.name': 'المؤسسات',
    'pricing.enterprise.price': 'اتصل بنا',
    'pricing.enterprise.desc': 'للمنظمات الكبيرة',
    'pricing.enterprise.invoices': 'فواتير غير محدودة',
    
    // API Docs
    'api.title': 'توثيق API',
    'api.overview': 'نظرة عامة على Doc-IN REST API',
    'api.upload.title': 'رفع فاتورة',
    'api.extract.title': 'استخراج البيانات',
    'api.usage.title': 'فحص الاستخدام',
    
    // Auth
    'auth.login.title': 'تسجيل دخول إلى حلول الذكاء الاصطناعي',
    'auth.signup.title': 'انضم إلى حلول الذكاء الاصطناعي',
    'auth.email': 'البريد الإلكتروني',
    'auth.password': 'كلمة المرور',
    'auth.name': 'الاسم الكامل',
    'auth.company': 'اسم الشركة',
    'auth.login.button': 'تسجيل دخول',
    'auth.signup.button': 'إنشاء حساب',
    'auth.switch.login': 'لديك حساب؟ سجل دخول',
    'auth.switch.signup': 'ليس لديك حساب؟ سجل الآن',
    
    // Footer
    'footer.company': 'حلول الذكاء الاصطناعي',
    'footer.description': 'ثورة في العمليات التجارية مع الذكاء الاصطناعي',
    'footer.rights': 'جميع الحقوق محفوظة.',
    'footer.contact': 'اتصل',
    'footer.support': 'الدعم',
    'footer.privacy': 'الخصوصية',
    'footer.terms': 'الشروط',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  
  const isRTL = language === 'ar';
  
  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRTL]);
  
  const t = (key: string): string => {
    return translations[language][key] || key;
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};


import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <span className="text-white font-bold text-xl">{t('footer.company')}</span>
            </div>
            <p className="text-gray-400 text-sm mb-4 max-w-md">
              {t('footer.description')}
            </p>
            <p className="text-gray-500 text-xs">
              © 2024 AI Solutions. {t('footer.rights')}
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link to="/pricing" className="text-gray-400 hover:text-white text-sm transition-colors">{t('nav.pricing')}</Link></li>
              <li><Link to="/api-docs" className="text-gray-400 hover:text-white text-sm transition-colors">{t('nav.api')}</Link></li>
              <li><Link to="/dashboard" className="text-gray-400 hover:text-white text-sm transition-colors">{t('nav.dashboard')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">{t('footer.contact')}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">{t('footer.support')}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">{t('footer.privacy')}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">{t('footer.terms')}</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

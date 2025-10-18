import React from 'react';
import { Truck } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark-200 border-t border-dark-300">
      <div className="max-w-7xl mx-auto py-12 px-6 lg:px-8">
        <div className="flex justify-center space-x-6">
            <a href="#" className="text-light-400 hover:text-light-200">About</a>
            <a href="#" className="text-light-400 hover:text-light-200">Contact</a>
            <a href="#" className="text-light-400 hover:text-light-200">Terms of Service</a>
        </div>
        <div className="mt-8 flex justify-center">
             <Truck className="h-8 w-auto text-primary" />
        </div>
        <p className="mt-8 text-center text-sm text-light-400">
          &copy; {new Date().getFullYear()} SupplySphere, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;


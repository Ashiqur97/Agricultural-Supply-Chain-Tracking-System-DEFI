import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import ConnectWallet from './ConnectWallet';
import FarmerForm from './FarmerForm';
import SupplierForm from './SupplierForm';
import PackagerForm from './PackagerForm';
import ProductTracker from './ProductTracker';
import { Link2, Sprout, Factory, Package, Search } from 'lucide-react';

export default function AppLayout() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSuccess = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link2 className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">AgriChain</h1>
                <p className="text-xs text-gray-600">Blockchain Supply Chain Tracker</p>
              </div>
            </div>
            <ConnectWallet />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://d64gsuwffb70l.cloudfront.net/68fb540aaba5354ee417e814_1761388908338_8ff6e4da.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.15
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Track Food from Farm to Table
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Transparent, Secure, and Immutable Supply Chain Tracking  By Blockchain Technology
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-6">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <Sprout className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Farmer Origin</h3>
              <p className="text-gray-600">Record harvest details, location, and quality checks at source</p>
            </div>
            <div className="text-center p-6">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                <Factory className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Mill Processing</h3>
              <p className="text-gray-600">Track processing, batch numbers, and quality control</p>
            </div>
            <div className="text-center p-6">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center">
                <Package className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Final Packaging</h3>
              <p className="text-gray-600">Brand packaging with QR codes for consumer verification</p>
            </div>
          </div>

          {/* Main Interface */}
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="track" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="track" className="gap-2">
                  <Search className="w-4 h-4" />
                  Track
                </TabsTrigger>
                <TabsTrigger value="farmer" className="gap-2">
                  <Sprout className="w-4 h-4" />
                  Farmer
                </TabsTrigger>
                <TabsTrigger value="supplier" className="gap-2">
                  <Factory className="w-4 h-4" />
                  Supplier
                </TabsTrigger>
                <TabsTrigger value="packager" className="gap-2">
                  <Package className="w-4 h-4" />
                  Packager
                </TabsTrigger>
              </TabsList>

              <TabsContent value="track">
                <ProductTracker key={refreshKey} />
              </TabsContent>

              <TabsContent value="farmer">
                <FarmerForm onSuccess={handleSuccess} />
              </TabsContent>

              <TabsContent value="supplier">
                <SupplierForm onSuccess={handleSuccess} />
              </TabsContent>

              <TabsContent value="packager">
                <PackagerForm onSuccess={handleSuccess} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold mb-4">AgriChain</h4>
              <p className="text-gray-400 text-sm">
                Blockchain Transparency for agriculture
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Technology</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Ethereum Blockchain</li>
                <li>Solidity Smart Contracts</li>
                <li>Hardhat Development</li>
                <li>Ethers.js Integration</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Documentation</li>
                <li>Community Forum</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>ashiqurrahmanabir96@gmail.com</li>
                <li>+880 1825806917</li>
                <li>Dhaka, Bangladesh</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            © 2025 AgriChain. All rights reserved. Built with Solidity, Hardhat & React.
          </div>
        </div>
      </footer>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import {
  CalendarDays,
  DollarSign,
  HardHat,
  Home,
  LineChart,
  Package,
  Camera,
  Building,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import Dashboard from '@/components/Dashboard';
import Visits from '@/components/Visits';
import Materials from '@/components/Materials';
import Reports from '@/components/Reports';
import Album from '@/components/Album';
import FinancialManagement from '@/components/FinancialManagement';
import Projects from '@/components/Projects'; // Alterado de Team para Projects
import { Button } from '@/components/ui/Button';

const initialData = {
  activeProjects: 5,
  monthlyExpenses: 150000,
  scheduledVisits: 8,
  completionRate: 75,
  averageTime: 4.5,
  pendingPayments: 3,
  pendingPaymentsTotal: 25000,
  materialsNeeded: ['Cimento', 'Vergalhões'],
  materials: [
    { id: 1, name: 'Cimento', quantity: 100, unit: 'sacos', unitPrice: 25 },
    { id: 2, name: 'Vergalhões', quantity: 50, unit: 'barras', unitPrice: 45 },
    {
      id: 3,
      name: 'Tijolos',
      quantity: 5000,
      unit: 'unidades',
      unitPrice: 0.5,
    },
  ],
  projectImages: [
    {
      id: 1,
      url: '/placeholder.svg',
      description: 'Fundação concluída',
      date: '2023-05-15',
    },
    {
      id: 2,
      url: '/placeholder.svg',
      description: 'Estrutura em andamento',
      date: '2023-06-01',
    },
  ],
  projects: [ // Alterado de team para projects
    {
      id: 1,
      name: 'Edifício Horizonte',
      address: 'Rua das Palmeiras, 123',
      startDate: '2024-01-15',
      estimatedEndDate: '2025-06-30',
      budget: 1500000,
      status: 'in_progress',
      constructionType: 'residential',
      totalArea: '5000',
      numberOfUnits: '24',
      responsibleEngineer: 'João Silva',
    },
    {
      id: 2,
      name: 'Residencial Parque Verde',
      address: 'Av. Principal, 500',
      startDate: '2024-02-01',
      estimatedEndDate: '2025-08-30',
      budget: 800000,
      status: 'planning',
      constructionType: 'residential',
      totalArea: '3000',
      numberOfUnits: '16',
      responsibleEngineer: 'Maria Santos',
    },
  ],
};

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard data={initialData} />;
      case 'visits':
        return <Visits data={initialData} />;
      case 'projects':
        return <Projects data={initialData} />;
      case 'materials':
        return <Materials data={initialData} />;
      case 'reports':
        return <Reports data={initialData} />;
      case 'finance':
        return <FinancialManagement data={initialData} />;
      default:
        return <Dashboard data={initialData} />;
    }
  };
  const menuItems = [
    { icon: Home, label: 'Dashboard', id: 'dashboard', color: '#64B5F6' },
    { icon: Building, label: 'Obras', id: 'projects', color: '#FF6B6B' },
    { icon: CalendarDays, label: 'Visitas', id: 'visits', color: '#4CAF50' },
    { icon: Package, label: 'Materiais', id: 'materials', color: '#FFB300' },
    { icon: LineChart, label: 'Relatórios', id: 'reports', color: '#FF7043' },
    { icon: DollarSign, label: 'Gestão Financeira', id: 'finance', color: '#9C27B0' },
  ];

  return (
    <div className="relative flex min-h-screen bg-gray-100">
      {/* Overlay */}
      {isMenuExpanded && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMenuExpanded(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white z-50 transition-all duration-300 ${
          isMenuExpanded ? 'w-64' : 'w-16'
        }`}
      >
        {/* Logo Section */}
        <div
          className={`flex items-center ${
            isMenuExpanded ? 'justify-start px-4' : 'justify-center'
          } mt-6 mb-6`}
        >
          <HardHat className="h-8 w-8 text-white" />
          {isMenuExpanded && (
            <span className="ml-3 text-xl font-bold text-white">Trilux</span>
          )}
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setIsMenuExpanded(!isMenuExpanded)}
          className={`absolute top-6 -right-3 bg-gray-700 text-white h-6 w-6 rounded-full flex items-center justify-center shadow-md transition-transform duration-300`}
        >
          {isMenuExpanded ? (
            <ChevronLeft className="h-3 w-3" />
          ) : (
            <ChevronRight className="h-3 w-3" />
          )}
        </button>

        {/* Navigation Items */}
        <nav className="mt-4 space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              className={`w-full flex items-center ${
                activeTab === item.id
                  ? 'bg-gray-700 text-white'
                  : 'hover:bg-gray-700'
              } ${isMenuExpanded ? 'px-4 justify-start' : 'justify-center'}`}
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon className="h-5 w-5" style={{ color: item.color }} />
              {isMenuExpanded && <span className="ml-3">{item.label}</span>}
            </Button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isMenuExpanded ? 'ml-0' : 'ml-16'
        }`}
      >
        <div className="p-4">{renderContent()}</div>
      </div>
    </div>
  );
}
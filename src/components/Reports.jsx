import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import {
  Building,
  TrendingUp,
  Calendar,
  DollarSign,
  AlertTriangle,
  Clock,
  Users,
  Package,
  FileText,
  BarChart,
} from 'lucide-react';

export default function Reports({ data }) {
  const [activeProject, setActiveProject] = useState('overview');

  // Mock data dos projetos
  const projects = [
    {
      id: 1,
      name: 'Edifício Horizonte',
      metrics: {
        completionRate: 45,
        budget: 1500000,
        spent: 675000,
        delayedTasks: 3,
        activeWorkers: 48,
        materialsInStock: 85,
        nextDelivery: '2024-03-25',
      },
      financialReports: [
        { month: 'Janeiro', planned: 150000, actual: 145000 },
        { month: 'Fevereiro', planned: 180000, actual: 195000 },
        { month: 'Março', planned: 200000, actual: 185000 },
      ],
      taskDelays: [
        { task: 'Instalação Elétrica 4º andar', delay: 5, impact: 'Médio' },
        { task: 'Acabamento Fachada Norte', delay: 3, impact: 'Baixo' },
        { task: 'Hidráulica 6º andar', delay: 2, impact: 'Baixo' },
      ],
      materialUsage: [
        { material: 'Cimento', planned: 500, used: 480, unit: 'sacos' },
        { material: 'Vergalhões', planned: 300, used: 290, unit: 'barras' },
        { material: 'Tijolos', planned: 25000, used: 24800, unit: 'unidades' },
      ],
      workforceMetrics: [
        { role: 'Pedreiros', planned: 20, actual: 18 },
        { role: 'Eletricistas', planned: 8, actual: 8 },
        { role: 'Ajudantes', planned: 25, actual: 22 },
      ],
    },
    {
      id: 2,
      name: 'Residencial Parque Verde',
      metrics: {
        completionRate: 15,
        budget: 800000,
        spent: 120000,
        delayedTasks: 1,
        activeWorkers: 32,
        materialsInStock: 92,
        nextDelivery: '2024-03-28',
      },
      financialReports: [
        { month: 'Janeiro', planned: 80000, actual: 75000 },
        { month: 'Fevereiro', planned: 95000, actual: 92000 },
        { month: 'Março', planned: 110000, actual: 108000 },
      ],
      taskDelays: [
        { task: 'Fundação Bloco B', delay: 2, impact: 'Médio' },
      ],
      materialUsage: [
        { material: 'Cimento', planned: 300, used: 290, unit: 'sacos' },
        { material: 'Vergalhões', planned: 200, used: 195, unit: 'barras' },
        { material: 'Tijolos', planned: 15000, used: 14800, unit: 'unidades' },
      ],
      workforceMetrics: [
        { role: 'Pedreiros', planned: 15, actual: 14 },
        { role: 'Eletricistas', planned: 5, actual: 5 },
        { role: 'Ajudantes', planned: 18, actual: 13 },
      ],
    },
  ];

  const renderProjectContent = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    if (!project) return null;

    return (
      <div className="space-y-6">
        {/* Métricas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg rounded-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Taxa de Conclusão</p>
                  <p className="text-2xl font-bold">{project.metrics.completionRate}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-500" />
              </div>
              <Progress value={project.metrics.completionRate} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 shadow-lg rounded-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Orçamento Utilizado</p>
                  <p className="text-2xl font-bold">
                    {((project.metrics.spent / project.metrics.budget) * 100).toFixed(1)}%
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-green-500" />
              </div>
              <Progress 
                value={(project.metrics.spent / project.metrics.budget) * 100} 
                className="mt-2"
              />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-50 to-amber-100 shadow-lg rounded-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tarefas Atrasadas</p>
                  <p className="text-2xl font-bold">{project.metrics.delayedTasks}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-amber-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 shadow-lg rounded-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Trabalhadores Ativos</p>
                  <p className="text-2xl font-bold">{project.metrics.activeWorkers}</p>
                </div>
                <Users className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Relatório Financeiro */}
        <Card className="bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg rounded-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl text-gray-800">Relatório Financeiro</CardTitle>
            <DollarSign className="h-6 w-6 text-gray-500" />
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mês</TableHead>
                  <TableHead>Planejado</TableHead>
                  <TableHead>Realizado</TableHead>
                  <TableHead>Variação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {project.financialReports.map((report) => {
                  const variation = ((report.actual - report.planned) / report.planned) * 100;
                  return (
                    <TableRow key={report.month}>
                      <TableCell>{report.month}</TableCell>
                      <TableCell>R$ {report.planned.toLocaleString()}</TableCell>
                      <TableCell>R$ {report.actual.toLocaleString()}</TableCell>
                      <TableCell className={variation > 0 ? 'text-red-600' : 'text-green-600'}>
                        {variation > 0 ? '+' : ''}{variation.toFixed(1)}%
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Atrasos de Tarefas */}
        <Card className="bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg rounded-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl text-gray-800">Atrasos em Tarefas</CardTitle>
            <Clock className="h-6 w-6 text-gray-500" />
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tarefa</TableHead>
                  <TableHead>Dias de Atraso</TableHead>
                  <TableHead>Impacto</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {project.taskDelays.map((delay, index) => (
                  <TableRow key={index}>
                    <TableCell>{delay.task}</TableCell>
                    <TableCell>{delay.delay} dias</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        delay.impact === 'Alto' ? 'bg-red-100 text-red-800' :
                        delay.impact === 'Médio' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {delay.impact}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Uso de Materiais */}
        <Card className="bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg rounded-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl text-gray-800">Consumo de Materiais</CardTitle>
            <Package className="h-6 w-6 text-gray-500" />
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Material</TableHead>
                  <TableHead>Planejado</TableHead>
                  <TableHead>Utilizado</TableHead>
                  <TableHead>Eficiência</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {project.materialUsage.map((material, index) => {
                  const efficiency = ((material.used / material.planned) * 100).toFixed(1);
                  return (
                    <TableRow key={index}>
                      <TableCell>{material.material}</TableCell>
                      <TableCell>{material.planned} {material.unit}</TableCell>
                      <TableCell>{material.used} {material.unit}</TableCell>
                      <TableCell className={
                        Number(efficiency) > 100 ? 'text-red-600' : 'text-green-600'
                      }>
                        {efficiency}%
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Métricas da Força de Trabalho */}
        <Card className="bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg rounded-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl text-gray-800">Força de Trabalho</CardTitle>
            <Users className="h-6 w-6 text-gray-500" />
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Função</TableHead>
                  <TableHead>Planejado</TableHead>
                  <TableHead>Atual</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {project.workforceMetrics.map((metric, index) => (
                  <TableRow key={index}>
                    <TableCell>{metric.role}</TableCell>
                    <TableCell>{metric.planned}</TableCell>
                    <TableCell>{metric.actual}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        metric.actual < metric.planned ? 'bg-red-100 text-red-800' :
                        metric.actual === metric.planned ? 'bg-green-100 text-green-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {metric.actual < metric.planned ? 'Abaixo' :
                         metric.actual === metric.planned ? 'Adequado' :
                         'Acima'}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <Card
            key={project.id}
            className="bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg rounded-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            onClick={() => setActiveProject(project.id)}
          >
            <CardHeader>
              <CardTitle className="text-xl text-gray-800">{project.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Conclusão</p>
                    <div className="flex items-center">
                      <TrendingUp className="h-4 w-4 text-blue-500 mr-2" />
                      <p className="text-lg font-semibold">{project.metrics.completionRate}%</p>
                    </div>
                    <Progress value={project.metrics.completionRate} className="mt-2" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Orçamento Utilizado</p>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 text-green-500 mr-2" />
                      <p className="text-lg font-semibold">
                        R$ {project.metrics.spent.toLocaleString()}
                      </p>
                    </div>
                    <Progress 
                      value={(project.metrics.spent / project.metrics.budget) * 100} 
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <p className="text-sm text-gray-500">Tarefas Atrasadas</p>
                    <div className="flex items-center">
                      <AlertTriangle className="h-4 w-4 text-amber-500 mr-2" />
                      <p className="text-lg font-semibold">{project.metrics.delayedTasks}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Equipe Ativa</p>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-purple-500 mr-2" />
                      <p className="text-lg font-semibold">{project.metrics.activeWorkers}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <Button
                    className="w-full bg-teal-500 hover:bg-teal-600 text-white"
                    onClick={() => setActiveProject(project.id)}
                  >
                    Ver Relatório Completo
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Métricas Consolidadas */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg rounded-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Investimento Total</p>
                <p className="text-2xl font-bold">
                  R$ {projects.reduce((sum, p) => sum + p.metrics.budget, 0).toLocaleString()}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 shadow-lg rounded-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Executado</p>
                <p className="text-2xl font-bold">
                  R$ {projects.reduce((sum, p) => sum + p.metrics.spent, 0).toLocaleString()}
                </p>
              </div>
              <BarChart className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 shadow-lg rounded-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Força de Trabalho Total</p>
                <p className="text-2xl font-bold">
                  {projects.reduce((sum, p) => sum + p.metrics.activeWorkers, 0)}
                </p>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resumo de Alertas */}
      <Card className="bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg rounded-lg hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-xl text-gray-800">Alertas Consolidados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projects.map(project => (
              project.taskDelays.length > 0 && (
                <div key={project.id} className="p-4 bg-amber-50 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">{project.name}</h3>
                  <div className="space-y-2">
                    {project.taskDelays.map((delay, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <AlertTriangle className="h-4 w-4 text-amber-500 mr-2" />
                        <span>{delay.task} - {delay.delay} dias de atraso</span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <>
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Relatórios</h2>

      {/* Navegação por Abas */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex space-x-4">
          <Button
            onClick={() => setActiveProject('overview')}
            className={`px-4 py-2 font-medium rounded-t-lg transition-colors duration-300 ${
              activeProject === 'overview'
                ? 'bg-white text-teal-600 border-b-2 border-teal-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Building className="h-4 w-4 mr-2 inline-block" />
            Visão Geral
          </Button>
          {projects.map((project) => (
            <Button
              key={project.id}
              onClick={() => setActiveProject(project.id)}
              className={`px-4 py-2 font-medium rounded-t-lg transition-colors duration-300 ${
                activeProject === project.id
                  ? 'bg-white text-teal-600 border-b-2 border-teal-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {project.name}
            </Button>
          ))}
        </nav>
      </div>

      {/* Conteúdo da Aba Selecionada */}
      {activeProject === 'overview' 
        ? renderOverview()
        : renderProjectContent(activeProject)}
    </>
  );
}
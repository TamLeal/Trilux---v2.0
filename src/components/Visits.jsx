import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Building, Calendar, Clock, MapPin, Plus, Trash2 } from 'lucide-react';

export default function Visits({ data }) {
  const [activeProject, setActiveProject] = useState('overview');
  const [newVisit, setNewVisit] = useState({
    date: '',
    time: '',
    projectId: '',
    purpose: '',
    participants: '',
    location: '',
    observations: '',
  });

  // Mock data - em produção, viria das props
  const projects = [
    {
      id: 1,
      name: 'Edifício Horizonte',
      visits: [
        {
          id: 1,
          date: '2024-03-25',
          time: '14:00',
          purpose: 'Vistoria Estrutural',
          participants: 'João Silva, Maria Santos',
          location: 'Pavimento 3',
          observations: 'Verificação das instalações elétricas',
        },
        {
          id: 2,
          date: '2024-03-28',
          time: '09:00',
          purpose: 'Medição Mensal',
          participants: 'Carlos Oliveira',
          location: 'Obra completa',
          observations: 'Medição para faturamento',
        },
      ],
    },
    {
      id: 2,
      name: 'Residencial Parque Verde',
      visits: [
        {
          id: 3,
          date: '2024-03-26',
          time: '10:00',
          purpose: 'Inspeção de Qualidade',
          participants: 'Ana Paula, Roberto Carlos',
          location: 'Área comum',
          observations: 'Verificação dos acabamentos',
        },
      ],
    },
  ];

  const handleAddVisit = (e) => {
    e.preventDefault();
    // Lógica para adicionar visita
    console.log('Nova visita:', newVisit);
    setNewVisit({
      date: '',
      time: '',
      projectId: '',
      purpose: '',
      participants: '',
      location: '',
      observations: '',
    });
  };

  const renderVisitsTable = (visits) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Data</TableHead>
          <TableHead>Horário</TableHead>
          <TableHead>Finalidade</TableHead>
          <TableHead>Participantes</TableHead>
          <TableHead>Local</TableHead>
          <TableHead>Observações</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {visits.map((visit) => (
          <TableRow key={visit.id}>
            <TableCell>{new Date(visit.date).toLocaleDateString()}</TableCell>
            <TableCell>{visit.time}</TableCell>
            <TableCell>{visit.purpose}</TableCell>
            <TableCell>{visit.participants}</TableCell>
            <TableCell>{visit.location}</TableCell>
            <TableCell>{visit.observations}</TableCell>
            <TableCell>
              <Button
                onClick={() => {/* Lógica para deletar */}}
                variant="ghost"
                size="sm"
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  const renderProjectContent = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    if (!project) return null;

    return (
      <div className="space-y-6">
        <Card className="bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg rounded-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800">Agendar Nova Visita</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddVisit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="date">Data da Visita</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newVisit.date}
                    onChange={(e) => setNewVisit({ ...newVisit, date: e.target.value })}
                    className="border-gray-300"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="time">Horário</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newVisit.time}
                    onChange={(e) => setNewVisit({ ...newVisit, time: e.target.value })}
                    className="border-gray-300"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="purpose">Finalidade</Label>
                  <Input
                    id="purpose"
                    value={newVisit.purpose}
                    onChange={(e) => setNewVisit({ ...newVisit, purpose: e.target.value })}
                    className="border-gray-300"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="participants">Participantes</Label>
                  <Input
                    id="participants"
                    value={newVisit.participants}
                    onChange={(e) => setNewVisit({ ...newVisit, participants: e.target.value })}
                    className="border-gray-300"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="location">Local Específico</Label>
                  <Input
                    id="location"
                    value={newVisit.location}
                    onChange={(e) => setNewVisit({ ...newVisit, location: e.target.value })}
                    className="border-gray-300"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="observations">Observações</Label>
                <textarea
                  id="observations"
                  value={newVisit.observations}
                  onChange={(e) => setNewVisit({ ...newVisit, observations: e.target.value })}
                  className="w-full border border-gray-300 rounded px-2 py-1 h-20"
                />
              </div>

              <Button
                type="submit"
                className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
              >
                <Plus className="h-4 w-4 mr-2" />
                Agendar Visita
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg rounded-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800">Visitas Agendadas - {project.name}</CardTitle>
          </CardHeader>
          <CardContent>
            {project.visits.length > 0 ? (
              renderVisitsTable(project.visits)
            ) : (
              <p className="text-gray-500 text-center py-4">Nenhuma visita agendada para este projeto.</p>
            )}
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
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
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{project.visits.length} visitas agendadas</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>Próxima: {project.visits[0]?.date ? new Date(project.visits[0].date).toLocaleDateString() : 'Nenhuma'}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg rounded-lg hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-xl text-gray-800">Todas as Visitas Agendadas</CardTitle>
        </CardHeader>
        <CardContent>
          {renderVisitsTable(projects.flatMap(project => 
            project.visits.map(visit => ({
              ...visit,
              projectName: project.name,
            }))
          ))}
        </CardContent>
      </Card>
    </div>
  );

  return (
    <>
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Visitas Agendadas</h2>

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
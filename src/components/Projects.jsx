import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
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
  Edit,
  Trash2,
  Plus,
  Camera,
  Clock,
  FileText,
  Upload,
  Calendar,
  CheckSquare,
  AlertTriangle,
  Image as ImageIcon,
  Download,
  Save,
  Pencil,
  ArrowRight,
  MousePointer,
  DollarSign,
} from 'lucide-react';

const TABS = {
  OVERVIEW: 'overview',
  TIMELINE: 'timeline',
  DOCUMENTS: 'documents',
  PHOTOS: 'photos',
};

const constructionTypes = [
  { value: 'residential', label: 'Residencial' },
  { value: 'commercial', label: 'Comercial' },
  { value: 'industrial', label: 'Industrial' },
  { value: 'mixed', label: 'Uso Misto' },
];

const projectStatuses = [
  { value: 'planning', label: 'Em Planejamento' },
  { value: 'in_progress', label: 'Em Andamento' },
  { value: 'on_hold', label: 'Pausado' },
  { value: 'completed', label: 'Concluído' },
];

// Adicione as funções aqui, antes do initialProjects
const getStatusColor = (status) => {
  const colors = {
    planning: 'bg-blue-100 text-blue-800',
    in_progress: 'bg-green-100 text-green-800',
    on_hold: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-gray-100 text-gray-800',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

const getStatusText = (status) => {
  return projectStatuses.find(s => s.value === status)?.label || status;
};

// Mock data inicial com os dois empreendimentos
const initialProjects = [
  {
    id: 1,
    name: 'Edifício Horizonte',
    address: 'Rua das Palmeiras, 123',
    startDate: '2024-01-15',
    estimatedEndDate: '2025-06-30',
    budget: 1500000,
    spent: 675000,
    progress: 45,
    status: 'in_progress',
    constructionType: 'residential',
    totalArea: '5000',
    numberOfUnits: '24',
    responsibleEngineer: 'João Silva',
    description: 'Edifício residencial de alto padrão com 24 unidades',
    photos: [
      {
        id: 1,
        url: '/api/placeholder/400/300',
        description: 'Fundação concluída',
        date: '2024-01-20',
        location: 'Térreo',
      },
      {
        id: 2,
        url: '/api/placeholder/400/300',
        description: 'Estrutura do 1º andar',
        date: '2024-02-15',
        location: '1º Pavimento',
      },
    ],
    timeline: [
      {
        phase: 'Fundação',
        startDate: '2024-01-15',
        endDate: '2024-03-15',
        progress: 100,
        milestones: [
          { date: '2024-02-01', description: 'Conclusão da escavação' },
          { date: '2024-03-15', description: 'Fundação finalizada' },
        ],
        tasks: [
          { name: 'Escavação', status: 'completed', progress: 100 },
          { name: 'Armação', status: 'completed', progress: 100 },
          { name: 'Concretagem', status: 'completed', progress: 100 },
        ],
      },
      {
        phase: 'Estrutura',
        startDate: '2024-03-16',
        endDate: '2024-06-15',
        progress: 45,
        milestones: [
          { date: '2024-04-15', description: 'Conclusão do primeiro pavimento' },
        ],
        tasks: [
          { name: 'Pilares térreo', status: 'completed', progress: 100 },
          { name: 'Laje primeiro pav.', status: 'in_progress', progress: 60 },
          { name: 'Pilares primeiro pav.', status: 'pending', progress: 0 },
        ],
      },
    ],
    documents: [
      {
        type: 'Projeto',
        items: [
          { name: 'Projeto Arquitetônico', status: 'approved', expiryDate: null },
          { name: 'Projeto Estrutural', status: 'approved', expiryDate: null },
          { name: 'Projeto Hidráulico', status: 'pending', expiryDate: null },
        ],
      },
      {
        type: 'Licenças',
        items: [
          { name: 'Alvará de Construção', status: 'approved', expiryDate: '2025-01-15' },
          { name: 'Licença Ambiental', status: 'approved', expiryDate: '2024-12-31' },
        ],
      },
    ],
  },
  {
    id: 2,
    name: 'Residencial Parque Verde',
    address: 'Av. Principal, 500',
    startDate: '2024-02-01',
    estimatedEndDate: '2025-08-30',
    budget: 800000,
    spent: 120000,
    progress: 15,
    status: 'planning',
    constructionType: 'residential',
    totalArea: '3000',
    numberOfUnits: '16',
    responsibleEngineer: 'Maria Santos',
    description: 'Condomínio residencial voltado para famílias',
    photos: [
      {
        id: 3,
        url: '/api/placeholder/400/300',
        description: 'Preparação do terreno',
        date: '2024-02-01',
        location: 'Terreno',
      },
      {
        id: 4,
        url: '/api/placeholder/400/300',
        description: 'Início da fundação',
        date: '2024-03-10',
        location: 'Térreo',
      },
    ],
    timeline: [
      {
        phase: 'Preparação do Terreno',
        startDate: '2024-02-01',
        endDate: '2024-03-15',
        progress: 80,
        milestones: [
          { date: '2024-02-15', description: 'Limpeza do terreno concluída' },
          { date: '2024-03-01', description: 'Topografia finalizada' },
        ],
        tasks: [
          { name: 'Limpeza', status: 'completed', progress: 100 },
          { name: 'Nivelamento', status: 'in_progress', progress: 75 },
          { name: 'Demarcação', status: 'in_progress', progress: 60 },
        ],
      },
    ],
    documents: [
      {
        type: 'Projeto',
        items: [
          { name: 'Projeto Arquitetônico', status: 'approved', expiryDate: null },
          { name: 'Projeto Estrutural', status: 'pending', expiryDate: null },
        ],
      },
      {
        type: 'Licenças',
        items: [
          { name: 'Alvará de Construção', status: 'pending', expiryDate: null },
          { name: 'Licença Ambiental', status: 'approved', expiryDate: '2024-12-31' },
        ],
      },
    ],
  },
];

export default function Projects({ data }) {
  const [projects, setProjects] = useState(initialProjects);
  const [activeTab, setActiveTab] = useState(TABS.OVERVIEW);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showPhotoUpload, setShowPhotoUpload] = useState(false);
  const [selectedTool, setSelectedTool] = useState('pen');
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [currentColor, setCurrentColor] = useState('#FF0000');
  const [currentWidth, setCurrentWidth] = useState(2);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const lastPointRef = useRef(null);

  const [newProject, setNewProject] = useState({
    name: '',
    address: '',
    startDate: '',
    estimatedEndDate: '',
    budget: '',
    description: '',
    status: 'planning',
    constructionType: '',
    totalArea: '',
    numberOfUnits: '',
    responsibleEngineer: '',
  });

  const [newPhoto, setNewPhoto] = useState({
    description: '',
    location: '',
    date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      const context = canvas.getContext('2d');
      context.lineCap = 'round';
      context.strokeStyle = currentColor;
      context.lineWidth = currentWidth;
      contextRef.current = context;

      if (currentImage) {
        context.drawImage(currentImage, 0, 0, canvas.width, canvas.height);
      }
    }
  }, [currentImage, currentColor, currentWidth]);

  const handlePhotoSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          setCurrentImage(img);
          if (canvasRef.current) {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0);
          }
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

    // Adicione após as declarações dos estados (useState)
  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    setActiveTab(TABS.OVERVIEW);
  };

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    setIsDrawing(true);
    lastPointRef.current = { x: offsetX, y: offsetY };
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;

    const { offsetX, offsetY } = nativeEvent;
    const context = contextRef.current;
    
    if (selectedTool === 'pen') {
      context.beginPath();
      context.moveTo(lastPointRef.current.x, lastPointRef.current.y);
      context.lineTo(offsetX, offsetY);
      context.stroke();
      lastPointRef.current = { x: offsetX, y: offsetY };
    } else if (selectedTool === 'arrow' && lastPointRef.current) {
      const canvas = canvasRef.current;
      context.clearRect(0, 0, canvas.width, canvas.height);
      if (currentImage) {
        context.drawImage(currentImage, 0, 0, canvas.width, canvas.height);
      }
      drawArrow(context, lastPointRef.current.x, lastPointRef.current.y, offsetX, offsetY);
    }
  };

  const drawArrow = (context, fromX, fromY, toX, toY) => {
    const headLength = 15;
    const angle = Math.atan2(toY - fromY, toX - fromX);
    
    context.beginPath();
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();

    context.beginPath();
    context.moveTo(toX, toY);
    context.lineTo(
      toX - headLength * Math.cos(angle - Math.PI / 6),
      toY - headLength * Math.sin(angle - Math.PI / 6)
    );
    context.moveTo(toX, toY);
    context.lineTo(
      toX - headLength * Math.cos(angle + Math.PI / 6),
      toY - headLength * Math.sin(angle + Math.PI / 6)
    );
    context.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handlePhotoUpload = (e) => {
    e.preventDefault();
    if (canvasRef.current) {
      const dataUrl = canvasRef.current.toDataURL('image/png');
      const newPhotoObj = {
        id: Date.now(),
        url: dataUrl,
        description: newPhoto.description,
        location: newPhoto.location,
        date: newPhoto.date,
      };

      setProjects(prevProjects => 
        prevProjects.map(p => 
          p.id === selectedProject.id
            ? { ...p, photos: [...p.photos, newPhotoObj] }
            : p
        )
      );

      setSelectedProject(prev => ({
        ...prev,
        photos: [...prev.photos, newPhotoObj],
      }));

      setShowPhotoUpload(false);
      setNewPhoto({
        description: '',
        location: '',
        date: new Date().toISOString().split('T')[0],
      });
      setCurrentImage(null);
    }
  };

  const handleProjectSubmit = (e) => {
    e.preventDefault();
    const projectToAdd = {
      id: Date.now(),
      ...newProject,
      progress: 0,
      spent: 0,
      photos: [],
      timeline: [],
      documents: [],
    };
    
    setProjects(prev => [...prev, projectToAdd]);
    setShowProjectForm(false);
    setNewProject({
      name: '',
      address: '',
      startDate: '',
      estimatedEndDate: '',
      budget: '',
      description: '',
      status: 'planning',
      constructionType: '',
      totalArea: '',
      numberOfUnits: '',
      responsibleEngineer: '',
    });
  };

  const renderTimeline = () => (
    <div className="space-y-6">
      {selectedProject.timeline.map((phase, index) => (
        <Card key={index} className="bg-gradient-to-br from-gray-50 to-gray-100">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              {phase.phase}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Início: {new Date(phase.startDate).toLocaleDateString()}</span>
                <span>Término: {new Date(phase.endDate).toLocaleDateString()}</span>
              </div>
              
              <div>
                <span className="text-sm text-gray-600">Progresso</span>
                <Progress value={phase.progress} className="mt-1" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Marcos</h4>
                  {phase.milestones.map((milestone, idx) => (
                    <div key={idx} className="flex items-center mb-2">
                      <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                      <div className="text-sm">
                        <p className="font-medium">{milestone.description}</p>
                        <p className="text-gray-500">{new Date(milestone.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <h4 className="font-medium mb-2">Tarefas</h4>
                  {phase.tasks.map((task, idx) => (
                    <div key={idx} className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <CheckSquare className={`h-4 w-4 mr-2 ${
                          task.status === 'completed' ? 'text-green-500' :
                          task.status === 'in_progress' ? 'text-yellow-500' :
                          'text-gray-400'
                        }`} />
                        <span className="text-sm">{task.name}</span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        task.status === 'completed' ? 'bg-green-100 text-green-800' :
                        task.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {task.progress}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderDocuments = () => (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-gray-50 to-gray-100">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Documentação
            </span>
            <Button className="bg-teal-500 hover:bg-teal-600 text-white">
              <Upload className="h-4 w-4 mr-2" />
              Novo Documento
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedProject.documents.map((category, index) => (
            <div key={index} className="mb-6 last:mb-0">
              <h4 className="text-lg font-semibold mb-4">{category.type}</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Documento</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Validade</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {category.items.map((doc, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{doc.name}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          doc.status === 'approved' ? 'bg-green-100 text-green-800' :
                          doc.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {doc.status === 'approved' ? 'Aprovado' :
                           doc.status === 'pending' ? 'Pendente' : 'Expirado'}
                        </span>
                      </TableCell>
                      <TableCell>
                        {doc.expiryDate ? new Date(doc.expiryDate).toLocaleDateString() : 'N/A'}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );

  const renderPhotos = () => (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-gray-50 to-gray-100">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span className="flex items-center">
              <Camera className="h-5 w-5 mr-2" />
              Fotos da Obra
            </span>
            <Button
              onClick={() => setShowPhotoUpload(true)}
              className="bg-teal-500 hover:bg-teal-600 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nova Foto
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedProject.photos.map((photo, index) => (
              <Card key={index} className="overflow-hidden bg-white">
                <img
                  src={photo.url}
                  alt={photo.description}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-800">{photo.description}</p>
                      <p className="text-sm text-gray-500">{photo.location}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(photo.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {showPhotoUpload && (
        <Card className="bg-gradient-to-br from-gray-50 to-gray-100">
          <CardHeader>
            <CardTitle>Upload e Anotação de Foto</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePhotoUpload} className="space-y-4">
              <div>
                <Label htmlFor="photo">Selecionar Foto</Label>
                <Input
                  id="photo"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoSelect}
                  className="border-gray-300"
                />
              </div>

              {currentImage && (
                <div className="space-y-4">
                  <div>
                    <Label>Ferramentas de Anotação</Label>
                    <div className="flex space-x-2 mb-2">
                      <Button
                        type="button"
                        onClick={() => setSelectedTool('pen')}
                        className={`${
                          selectedTool === 'pen'
                            ? 'bg-teal-500 text-white'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        <Pencil className="h-4 w-4 mr-2" />
                        Caneta
                      </Button>
                      <Button
                        type="button"
                        onClick={() => setSelectedTool('arrow')}
                        className={`${
                          selectedTool === 'arrow'
                            ? 'bg-teal-500 text-white'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        <ArrowRight className="h-4 w-4 mr-2" />
                        Seta
                      </Button>
                      <div className="flex items-center space-x-2">
                        <Label htmlFor="color" className="mr-2">
                          Cor:
                        </Label>
                        <input
                          type="color"
                          id="color"
                          value={currentColor}
                          onChange={(e) => setCurrentColor(e.target.value)}
                          className="w-8 h-8 rounded"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Label htmlFor="width" className="mr-2">
                          Espessura:
                        </Label>
                        <input
                          type="range"
                          id="width"
                          min="1"
                          max="10"
                          value={currentWidth}
                          onChange={(e) => setCurrentWidth(parseInt(e.target.value))}
                          className="w-24"
                        />
                      </div>
                    </div>

                    <div className="relative border border-gray-300 rounded-lg overflow-hidden">
                      <canvas
                        ref={canvasRef}
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseOut={stopDrawing}
                        className="w-full h-96 object-contain"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="description">Descrição</Label>
                <Input
                  id="description"
                  value={newPhoto.description}
                  onChange={(e) =>
                    setNewPhoto({ ...newPhoto, description: e.target.value })
                  }
                  placeholder="Descreva o que a foto mostra..."
                  className="border-gray-300"
                  required
                />
              </div>

              <div>
                <Label htmlFor="location">Localização</Label>
                <Input
                  id="location"
                  value={newPhoto.location}
                  onChange={(e) =>
                    setNewPhoto({ ...newPhoto, location: e.target.value })
                  }
                  placeholder="Ex: Pavimento 3, Área comum..."
                  className="border-gray-300"
                  required
                />
              </div>

              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  onClick={() => {
                    setShowPhotoUpload(false);
                    setCurrentImage(null);
                  }}
                  className="bg-gray-500 hover:bg-gray-600 text-white"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="bg-teal-500 hover:bg-teal-600 text-white"
                >
                  Salvar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-blue-50">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">Progresso Geral</p>
                <p className="text-2xl font-bold">{selectedProject.progress}%</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <CheckSquare className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <Progress value={selectedProject.progress} className="mt-2" />
          </CardContent>
        </Card>
  
        <Card className="bg-green-50">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">Orçamento Utilizado</p>
                <p className="text-2xl font-bold">
                  {((selectedProject.spent / selectedProject.budget) * 100).toFixed(1)}%
                </p>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <Progress value={(selectedProject.spent / selectedProject.budget) * 100} className="mt-2" />
          </CardContent>
        </Card>
  
        <Card className="bg-yellow-50">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">Tempo Decorrido</p>
                <p className="text-2xl font-bold">45%</p>
              </div>
              <div className="p-2 bg-yellow-100 rounded-full">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <Progress value={45} className="mt-2" />
          </CardContent>
        </Card>
  
        <Card className="bg-purple-50">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <p className="text-2xl font-bold">{getStatusText(selectedProject.status)}</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-full">
                <Building className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
  
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Informações Gerais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label>Endereço</Label>
                <p className="text-gray-700">{selectedProject.address}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Área Total</Label>
                  <p className="text-gray-700">{selectedProject.totalArea} m²</p>
                </div>
                <div>
                  <Label>Unidades</Label>
                  <p className="text-gray-700">{selectedProject.numberOfUnits}</p>
                </div>
              </div>
              <div>
                <Label>Engenheiro Responsável</Label>
                <p className="text-gray-700">{selectedProject.responsibleEngineer}</p>
              </div>
            </div>
          </CardContent>
        </Card>
  
        <Card>
          <CardHeader>
            <CardTitle>Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selectedProject.timeline.slice(0, 3).map((phase, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                  <div className="flex-1">
                    <p className="font-medium">{phase.phase}</p>
                    <p className="text-sm text-gray-500">{phase.progress}% concluído</p>
                  </div>
                  <Progress value={phase.progress} className="w-24" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
  
    const renderContent = () => {
      if (!selectedProject) return null;
  
      switch (activeTab) {
        case TABS.OVERVIEW:
          return renderOverview();
        case TABS.TIMELINE:
          return renderTimeline();
        case TABS.DOCUMENTS:
          return renderDocuments();
        case TABS.PHOTOS:
          return renderPhotos();
        default:
          return null;
      }
    };
  
    const ProjectForm = ({ onSubmit, onCancel }) => (
      <Card className="fixed inset-0 z-50 m-auto w-full max-w-2xl h-fit max-h-[90vh] overflow-y-auto bg-white shadow-lg">
        <CardHeader>
          <CardTitle>Nova Obra</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nome da Obra</Label>
                <Input
                  id="name"
                  value={newProject.name}
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  required
                />
              </div>
  
              <div>
                <Label htmlFor="constructionType">Tipo de Construção</Label>
                <select
                  id="constructionType"
                  value={newProject.constructionType}
                  onChange={(e) => setNewProject({ ...newProject, constructionType: e.target.value })}
                  className="w-full border border-gray-300 rounded px-2 py-1"
                  required
                >
                  <option value="">Selecione o tipo</option>
                  {constructionTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
  
              <div>
                <Label htmlFor="address">Endereço</Label>
                <Input
                  id="address"
                  value={newProject.address}
                  onChange={(e) => setNewProject({ ...newProject, address: e.target.value })}
                  required
                />
              </div>
  
              <div>
                <Label htmlFor="responsibleEngineer">Engenheiro Responsável</Label>
                <Input
                  id="responsibleEngineer"
                  value={newProject.responsibleEngineer}
                  onChange={(e) => setNewProject({ ...newProject, responsibleEngineer: e.target.value })}
                  required
                />
              </div>
  
              <div>
                <Label htmlFor="startDate">Data de Início</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={newProject.startDate}
                  onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
                  required
                />
              </div>
  
              <div>
                <Label htmlFor="estimatedEndDate">Previsão de Término</Label>
                <Input
                  id="estimatedEndDate"
                  type="date"
                  value={newProject.estimatedEndDate}
                  onChange={(e) => setNewProject({ ...newProject, estimatedEndDate: e.target.value })}
                  required
                />
              </div>
  
              <div>
                <Label htmlFor="totalArea">Área Total (m²)</Label>
                <Input
                  id="totalArea"
                  type="number"
                  value={newProject.totalArea}
                  onChange={(e) => setNewProject({ ...newProject, totalArea: e.target.value })}
                  required
                />
              </div>
  
              <div>
                <Label htmlFor="numberOfUnits">Número de Unidades</Label>
                <Input
                  id="numberOfUnits"
                  type="number"
                  value={newProject.numberOfUnits}
                  onChange={(e) => setNewProject({ ...newProject, numberOfUnits: e.target.value })}
                  required
                />
              </div>
  
              <div>
                <Label htmlFor="budget">Orçamento Previsto (R$)</Label>
                <Input
                  id="budget"
                  type="number"
                  value={newProject.budget}
                  onChange={(e) => setNewProject({ ...newProject, budget: e.target.value })}
                  required
                />
              </div>
  
              <div>
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  value={newProject.status}
                  onChange={(e) => setNewProject({ ...newProject, status: e.target.value })}
                  className="w-full border border-gray-300 rounded px-2 py-1"
                  required
                >
                  {projectStatuses.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
  
            <div>
              <Label htmlFor="description">Descrição do Projeto</Label>
              <textarea
                id="description"
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                className="w-full border border-gray-300 rounded px-2 py-1 h-32"
                required
              />
            </div>
  
            <div className="flex justify-end space-x-4">
              <Button type="button" onClick={onCancel} className="bg-gray-500 hover:bg-gray-600 text-white">
                Cancelar
              </Button>
              <Button type="submit" className="bg-teal-500 hover:bg-teal-600 text-white">
                Salvar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-800">Gerenciamento de Obras</h2>
          <Button
            onClick={() => setShowProjectForm(true)}
            className="bg-teal-500 hover:bg-teal-600 text-white"
          >
            <Plus className="h-5 w-5 mr-2" />
            Nova Obra
          </Button>
        </div>
  
        {selectedProject ? (
          <>
            <div className="flex items-center space-x-4 mb-6">
              <Button
                onClick={() => setSelectedProject(null)}
                variant="ghost"
                className="text-gray-600"
              >
                ← Voltar
              </Button>
              <h3 className="text-2xl font-bold text-gray-800">
                {selectedProject.name}
              </h3>
            </div>
  
            <div className="mb-6 border-b border-gray-200">
              <nav className="flex space-x-4">
                {Object.entries(TABS).map(([key, value]) => (
                  <Button
                    key={key}
                    onClick={() => setActiveTab(value)}
                    className={`px-4 py-2 font-medium rounded-t-lg transition-colors duration-300 ${
                      activeTab === value
                        ? 'bg-white text-teal-600 border-b-2 border-teal-500'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {key.charAt(0) + key.slice(1).toLowerCase()}
                  </Button>
                ))}
              </nav>
            </div>
  
            {renderContent()}
          </>
        ) : (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Card
                key={project.id}
                className="bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800">{project.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          getStatusColor(project.status)
                        }`}
                      >
                        {getStatusText(project.status)}
                      </span>
                    </div>
  
                    <div>
                      <p className="text-sm text-gray-500">Progresso Geral</p>
                      <Progress value={project.progress} className="mt-1" />
                    </div>
  
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Início</p>
                        <p className="font-medium">
                          {new Date(project.startDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Término Previsto</p>
                        <p className="font-medium">
                          {new Date(project.estimatedEndDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
  
                    <Button
                      onClick={() => handleProjectSelect(project)}
                      className="w-full bg-teal-500 hover:bg-teal-600 text-white"
                    >
                      Ver Detalhes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
  
        {showProjectForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
            <ProjectForm
              onSubmit={handleProjectSubmit}
              onCancel={() => setShowProjectForm(false)}
            />
          </div>
        )}
      </div>
    );
  }
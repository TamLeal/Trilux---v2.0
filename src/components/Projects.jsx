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
  XCircle,
  Home,
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

const documentTypes = [
  { value: 'Projeto', label: 'Projeto' },
  { value: 'Licenças', label: 'Licenças' },
  { value: 'Relatórios', label: 'Relatórios' },
  { value: 'Contratos', label: 'Contratos' },
  { value: 'Outros', label: 'Outros' },
];

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
  return projectStatuses.find((s) => s.value === status)?.label || status;
};

// Dados iniciais
const initialProjects = [
  {
    id: 1,
    name: 'Edifício Horizonte',
    address: 'Rua das Palmeiras, 123',
    startDate: '2024-01-15',
    estimatedEndDate: '2025-06-30',
    budget: 1500000,
    spent: 675000,
    progress: 0, // Será calculado
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
        progress: 0, // Será calculado
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
        progress: 0, // Será calculado
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
          {
            id: 1,
            name: 'Projeto Arquitetônico',
            status: 'approved',
            expiryDate: null,
            fileData: '/api/placeholder/doc1.pdf',
          },
          {
            id: 2,
            name: 'Projeto Estrutural',
            status: 'approved',
            expiryDate: null,
            fileData: '/api/placeholder/doc2.pdf',
          },
        ],
      },
      {
        type: 'Licenças',
        items: [
          {
            id: 3,
            name: 'Alvará de Construção',
            status: 'approved',
            expiryDate: '2025-01-15',
            fileData: '/api/placeholder/doc3.pdf',
          },
          {
            id: 4,
            name: 'Licença Ambiental',
            status: 'approved',
            expiryDate: '2024-12-31',
            fileData: '/api/placeholder/doc4.pdf',
          },
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
    progress: 0, // Será calculado
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
        progress: 0, // Será calculado
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
          {
            id: 5,
            name: 'Projeto Arquitetônico',
            status: 'approved',
            expiryDate: null,
            fileData: '/api/placeholder/doc5.pdf',
          },
          {
            id: 6,
            name: 'Projeto Estrutural',
            status: 'pending',
            expiryDate: null,
            fileData: '/api/placeholder/doc6.pdf',
          },
        ],
      },
      {
        type: 'Licenças',
        items: [
          {
            id: 7,
            name: 'Alvará de Construção',
            status: 'pending',
            expiryDate: null,
            fileData: '/api/placeholder/doc7.pdf',
          },
          {
            id: 8,
            name: 'Licença Ambiental',
            status: 'approved',
            expiryDate: '2024-12-31',
            fileData: '/api/placeholder/doc8.pdf',
          },
        ],
      },
    ],
  },
];

export default function Projects({ data }) {
  const [projects, setProjects] = useState(() => {
    const savedProjects = localStorage.getItem('projects');
    return savedProjects ? JSON.parse(savedProjects) : initialProjects;
  });
  const [activeTab, setActiveTab] = useState(TABS.OVERVIEW);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showPhotoUpload, setShowPhotoUpload] = useState(false);
  const [showDocumentUpload, setShowDocumentUpload] = useState(false);
  const [showTimelineForm, setShowTimelineForm] = useState(false);
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

  const [newDocument, setNewDocument] = useState({
    type: '',
    name: '',
    status: 'pending',
    expiryDate: '',
    file: null,
  });

  const [newTimeline, setNewTimeline] = useState({
    phase: '',
    startDate: '',
    endDate: '',
    progress: 0,
    milestones: [],
    tasks: [],
  });

  const [newMilestone, setNewMilestone] = useState({
    date: '',
    description: '',
  });

  const [newTask, setNewTask] = useState({
    name: '',
    status: 'pending',
    progress: 0,
  });

  const [editPhaseIndex, setEditPhaseIndex] = useState(null);
  const [editPhase, setEditPhase] = useState(null);

  const [editDocument, setEditDocument] = useState(null);
  const [editDocumentCategory, setEditDocumentCategory] = useState(null);

  const [editProject, setEditProject] = useState(null);
  const [editProjectStatus, setEditProjectStatus] = useState(null);

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

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  // Função para calcular o progresso de uma fase com base nas tarefas
  const calculatePhaseProgress = (phase) => {
    if (!phase.tasks || phase.tasks.length === 0) return 0;

    const totalProgress = phase.tasks.reduce(
      (acc, task) => acc + parseFloat(task.progress),
      0
    );
    return (totalProgress / phase.tasks.length).toFixed(2);
  };

  // Função para calcular o progresso geral com base nas fases
  const calculateOverallProgress = (project) => {
    if (!project.timeline || project.timeline.length === 0) return 0;

    const totalProgress = project.timeline.reduce(
      (acc, phase) => acc + parseFloat(phase.progress),
      0
    );
    return (totalProgress / project.timeline.length).toFixed(2);
  };

  const updateProjectProgress = (projectId) => {
    setProjects((prevProjects) =>
      prevProjects.map((p) => {
        if (p.id === projectId) {
          // Atualizar o progresso de cada fase
          const updatedTimeline = p.timeline.map((phase) => {
            const updatedProgress = calculatePhaseProgress(phase);
            return { ...phase, progress: updatedProgress };
          });

          // Atualizar o progresso geral
          const updatedOverallProgress = calculateOverallProgress({
            ...p,
            timeline: updatedTimeline,
          });

          return { ...p, timeline: updatedTimeline, progress: updatedOverallProgress };
        }
        return p;
      })
    );
  };

  useEffect(() => {
    projects.forEach((project) => {
      updateProjectProgress(project.id);
    });
  }, []);

  useEffect(() => {
    if (selectedProject) {
      const updatedProject = projects.find((p) => p.id === selectedProject.id);
      setSelectedProject(updatedProject);
    }
  }, [projects]);

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

      setProjects((prevProjects) =>
        prevProjects.map((p) =>
          p.id === selectedProject.id
            ? { ...p, photos: [...p.photos, newPhotoObj] }
            : p
        )
      );

      setSelectedProject((prev) => ({
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

  const handleDocumentUpload = (e) => {
    e.preventDefault();
    if (newDocument.file || newDocument.fileData) {
      const processDocument = (fileData) => {
        const newDoc = {
          id: Date.now(),
          name: newDocument.name,
          status: newDocument.status,
          expiryDate: newDocument.expiryDate || null,
          fileData: fileData,
        };

        const existingCategory = selectedProject.documents.find(
          (docCategory) => docCategory.type === newDocument.type
        );

        if (existingCategory) {
          existingCategory.items.push(newDoc);
        } else {
          selectedProject.documents.push({
            type: newDocument.type,
            items: [newDoc],
          });
        }

        setProjects((prevProjects) =>
          prevProjects.map((p) =>
            p.id === selectedProject.id ? selectedProject : p
          )
        );

        setShowDocumentUpload(false);
        setNewDocument({
          type: '',
          name: '',
          status: 'pending',
          expiryDate: '',
          file: null,
        });
      };

      if (newDocument.file) {
        const reader = new FileReader();
        reader.onload = () => {
          processDocument(reader.result);
        };
        reader.readAsDataURL(newDocument.file);
      } else {
        processDocument(newDocument.fileData);
      }
    }
  };

  const handleRemoveDocument = (docType, docId) => {
    const updatedDocuments = selectedProject.documents.map((docCategory) =>
      docCategory.type === docType
        ? {
            ...docCategory,
            items: docCategory.items.filter((doc) => doc.id !== docId),
          }
        : docCategory
    );

    setSelectedProject((prev) => ({
      ...prev,
      documents: updatedDocuments,
    }));

    setProjects((prevProjects) =>
      prevProjects.map((p) =>
        p.id === selectedProject.id ? { ...p, documents: updatedDocuments } : p
      )
    );
  };

  const handleEditDocument = (docType, doc) => {
    setEditDocument({ ...doc });
    setEditDocumentCategory(docType);
    setShowDocumentUpload(true);
  };

  const handleDocumentEditSubmit = (e) => {
    e.preventDefault();
    const updatedDocuments = selectedProject.documents.map((docCategory) => {
      if (docCategory.type === editDocumentCategory) {
        return {
          ...docCategory,
          items: docCategory.items.map((doc) =>
            doc.id === editDocument.id ? editDocument : doc
          ),
        };
      }
      return docCategory;
    });

    setSelectedProject((prev) => ({
      ...prev,
      documents: updatedDocuments,
    }));

    setProjects((prevProjects) =>
      prevProjects.map((p) =>
        p.id === selectedProject.id ? { ...p, documents: updatedDocuments } : p
      )
    );

    setEditDocument(null);
    setEditDocumentCategory(null);
    setShowDocumentUpload(false);
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

    setProjects((prev) => [...prev, projectToAdd]);
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

  const handleEditProjectName = (project) => {
    setEditProject(project);
  };

  const handleProjectNameSubmit = (e) => {
    e.preventDefault();
    setProjects((prevProjects) =>
      prevProjects.map((p) => (p.id === editProject.id ? editProject : p))
    );
    setEditProject(null);
  };

  const handleDeleteProject = (projectId) => {
    if (window.confirm('Tem certeza que deseja remover esta obra?')) {
      setProjects((prevProjects) => prevProjects.filter((p) => p.id !== projectId));
    }
  };

  const handleEditProjectStatus = (project) => {
    setEditProjectStatus(project);
  };

  const handleProjectStatusSubmit = (e) => {
    e.preventDefault();
    setProjects((prevProjects) =>
      prevProjects.map((p) => (p.id === editProjectStatus.id ? editProjectStatus : p))
    );
    setEditProjectStatus(null);
  };

  const handleTimelineSubmit = (e) => {
    e.preventDefault();

    const phaseToSave = editPhaseIndex !== null ? editPhase : newTimeline;

    setProjects((prevProjects) =>
      prevProjects.map((p) =>
        p.id === selectedProject.id
          ? editPhaseIndex !== null
            ? {
                ...p,
                timeline: p.timeline.map((phase, index) =>
                  index === editPhaseIndex ? phaseToSave : phase
                ),
              }
            : { ...p, timeline: [...p.timeline, phaseToSave] }
          : p
      )
    );

    setSelectedProject((prev) => ({
      ...prev,
      timeline:
        editPhaseIndex !== null
          ? prev.timeline.map((phase, index) =>
              index === editPhaseIndex ? phaseToSave : phase
            )
          : [...prev.timeline, phaseToSave],
    }));

    updateProjectProgress(selectedProject.id);

    setShowTimelineForm(false);
    setNewTimeline({
      phase: '',
      startDate: '',
      endDate: '',
      progress: 0,
      milestones: [],
      tasks: [],
    });
    setEditPhaseIndex(null);
    setEditPhase(null);
  };

  const handleAddMilestone = () => {
    const timelineState = editPhaseIndex !== null ? editPhase : newTimeline;
    const setTimelineState = editPhaseIndex !== null ? setEditPhase : setNewTimeline;

    setTimelineState({
      ...timelineState,
      milestones: [...timelineState.milestones, newMilestone],
    });
    setNewMilestone({ date: '', description: '' });
  };

  const handleRemoveMilestone = (index) => {
    const timelineState = editPhaseIndex !== null ? editPhase : newTimeline;
    const setTimelineState = editPhaseIndex !== null ? setEditPhase : setNewTimeline;

    const updatedMilestones = timelineState.milestones.filter((_, idx) => idx !== index);
    setTimelineState({
      ...timelineState,
      milestones: updatedMilestones,
    });
  };

  const handleAddTask = () => {
    const timelineState = editPhaseIndex !== null ? editPhase : newTimeline;
    const setTimelineState = editPhaseIndex !== null ? setEditPhase : setNewTimeline;

    setTimelineState({
      ...timelineState,
      tasks: [...timelineState.tasks, newTask],
    });
    setNewTask({ name: '', status: 'pending', progress: 0 });
  };

  const handleRemoveTask = (index) => {
    const timelineState = editPhaseIndex !== null ? editPhase : newTimeline;
    const setTimelineState = editPhaseIndex !== null ? setEditPhase : setNewTimeline;

    const updatedTasks = timelineState.tasks.filter((_, idx) => idx !== index);
    setTimelineState({
      ...timelineState,
      tasks: updatedTasks,
    });
  };

  const handleTaskChange = (index, field, value) => {
    const timelineState = editPhaseIndex !== null ? editPhase : newTimeline;
    const setTimelineState = editPhaseIndex !== null ? setEditPhase : setNewTimeline;

    const updatedTasks = timelineState.tasks.map((task, idx) =>
      idx === index ? { ...task, [field]: value } : task
    );

    setTimelineState({
      ...timelineState,
      tasks: updatedTasks,
    });
  };

  const handleMilestoneChange = (index, field, value) => {
    const timelineState = editPhaseIndex !== null ? editPhase : newTimeline;
    const setTimelineState = editPhaseIndex !== null ? setEditPhase : setNewTimeline;

    const updatedMilestones = timelineState.milestones.map((milestone, idx) =>
      idx === index ? { ...milestone, [field]: value } : milestone
    );

    setTimelineState({
      ...timelineState,
      milestones: updatedMilestones,
    });
  };

  const handleRemovePhoto = (photoId) => {
    const updatedPhotos = selectedProject.photos.filter(
      (photo) => photo.id !== photoId
    );

    setSelectedProject((prev) => ({
      ...prev,
      photos: updatedPhotos,
    }));

    setProjects((prevProjects) =>
      prevProjects.map((p) =>
        p.id === selectedProject.id ? { ...p, photos: updatedPhotos } : p
      )
    );
  };

  const handleEditPhase = (index) => {
    setEditPhaseIndex(index);
    setEditPhase({ ...selectedProject.timeline[index] });
    setShowTimelineForm(true);
  };

  const handleRemovePhase = (index) => {
    if (window.confirm('Tem certeza que deseja remover esta fase?')) {
      const updatedTimeline = selectedProject.timeline.filter((_, idx) => idx !== index);

      setSelectedProject((prev) => ({
        ...prev,
        timeline: updatedTimeline,
      }));

      setProjects((prevProjects) =>
        prevProjects.map((p) =>
          p.id === selectedProject.id ? { ...p, timeline: updatedTimeline } : p
        )
      );

      updateProjectProgress(selectedProject.id);
    }
  };

  const renderTimeline = () => (
    <div className="space-y-6">
      <Button
        onClick={() => {
          setEditPhaseIndex(null);
          setEditPhase(null);
          setShowTimelineForm(true);
        }}
        className="bg-teal-500 hover:bg-teal-600 text-white"
      >
        <Plus className="h-4 w-4 mr-2" />
        Nova Fase
      </Button>

      {selectedProject.timeline.map((phase, index) => (
        <Card key={index} className="bg-gradient-to-br from-gray-50 to-gray-100">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                {phase.phase}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEditPhase(index)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-600"
                  onClick={() => handleRemovePhase(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
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
                <div className="flex items-center mt-1">
                  <Progress value={phase.progress} className="flex-1" />
                  <span className="ml-2 text-sm font-semibold text-gray-700">
                    {phase.progress}%
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Marcos</h4>
                  {phase.milestones.map((milestone, idx) => (
                    <div key={idx} className="flex items-center mb-2">
                      <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                      <div className="text-sm">
                        <p className="font-medium">{milestone.description}</p>
                        <p className="text-gray-500">
                          {new Date(milestone.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <h4 className="font-medium mb-2">Tarefas</h4>
                  {phase.tasks.map((task, idx) => (
                    <div key={idx} className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <CheckSquare
                          className={`h-4 w-4 mr-2 ${
                            task.status === 'completed'
                              ? 'text-green-500'
                              : task.status === 'in_progress'
                              ? 'text-yellow-500'
                              : 'text-gray-400'
                          }`}
                        />
                        <span className="text-sm">{task.name}</span>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          task.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : task.status === 'in_progress'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
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

      {showTimelineForm && (
        <TimelineForm
          onSubmit={handleTimelineSubmit}
          onCancel={() => {
            setShowTimelineForm(false);
            setNewTimeline({
              phase: '',
              startDate: '',
              endDate: '',
              progress: 0,
              milestones: [],
              tasks: [],
            });
            setEditPhaseIndex(null);
            setEditPhase(null);
          }}
          newTimeline={editPhaseIndex !== null ? editPhase : newTimeline}
          setNewTimeline={editPhaseIndex !== null ? setEditPhase : setNewTimeline}
          newMilestone={newMilestone}
          setNewMilestone={setNewMilestone}
          newTask={newTask}
          setNewTask={setNewTask}
          handleAddMilestone={handleAddMilestone}
          handleAddTask={handleAddTask}
          handleRemoveMilestone={handleRemoveMilestone}
          handleRemoveTask={handleRemoveTask}
          handleTaskChange={handleTaskChange}
          handleMilestoneChange={handleMilestoneChange}
        />
      )}
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
            <Button
              className="bg-teal-500 hover:bg-teal-600 text-white"
              onClick={() => {
                setEditDocument(null);
                setShowDocumentUpload(true);
              }}
            >
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
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            doc.status === 'approved'
                              ? 'bg-green-100 text-green-800'
                              : doc.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {doc.status === 'approved'
                            ? 'Aprovado'
                            : doc.status === 'pending'
                            ? 'Pendente'
                            : 'Expirado'}
                        </span>
                      </TableCell>
                      <TableCell>
                        {doc.expiryDate
                          ? new Date(doc.expiryDate).toLocaleDateString()
                          : 'N/A'}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              // Lógica para download
                              const link = document.createElement('a');
                              link.href = doc.fileData;
                              link.download = doc.name;
                              link.click();
                            }}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditDocument(category.type, doc)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600"
                            onClick={() => handleRemoveDocument(category.type, doc.id)}
                          >
                            <Trash2 className="h-4 w-4" />
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

      {showDocumentUpload && (
        <DocumentForm
          onSubmit={editDocument ? handleDocumentEditSubmit : handleDocumentUpload}
          onCancel={() => {
            setShowDocumentUpload(false);
            setEditDocument(null);
          }}
          newDocument={editDocument || newDocument}
          setNewDocument={editDocument ? setEditDocument : setNewDocument}
        />
      )}
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
                      {/* Botão para editar (se necessário) */}
                      {/* <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button> */}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600"
                        onClick={() => handleRemovePhoto(photo.id)}
                      >
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
        <PhotoUploadForm
          onSubmit={handlePhotoUpload}
          onCancel={() => {
            setShowPhotoUpload(false);
            setCurrentImage(null);
          }}
          newPhoto={newPhoto}
          setNewPhoto={setNewPhoto}
          handlePhotoSelect={handlePhotoSelect}
          canvasRef={canvasRef}
          startDrawing={startDrawing}
          draw={draw}
          stopDrawing={stopDrawing}
          selectedTool={selectedTool}
          setSelectedTool={setSelectedTool}
          currentColor={currentColor}
          setCurrentColor={setCurrentColor}
          currentWidth={currentWidth}
          setCurrentWidth={setCurrentWidth}
          currentImage={currentImage}
        />
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
            <div className="mt-2">
              <Progress value={selectedProject.progress} className="w-full" />
            </div>
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
            <div className="mt-2">
              <Progress
                value={(selectedProject.spent / selectedProject.budget) * 100}
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-yellow-50">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">Tempo Decorrido</p>
                <p className="text-2xl font-bold">
                  {calculateElapsedTime(selectedProject)}%
                </p>
              </div>
              <div className="p-2 bg-yellow-100 rounded-full">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-2">
              <Progress
                value={calculateElapsedTime(selectedProject)}
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <p className="text-2xl font-bold">{getStatusText(selectedProject.status)}</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-purple-100 rounded-full">
                  <Building className="h-6 w-6 text-purple-600" />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEditProjectStatus(selectedProject)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
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
                  <div className="flex items-center">
                    <Progress value={phase.progress} className="w-24" />
                    <span className="ml-2 text-sm font-semibold text-gray-700">
                      {phase.progress}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const calculateElapsedTime = (project) => {
    const start = new Date(project.startDate);
    const end = new Date(project.estimatedEndDate);
    const now = new Date();

    if (now < start) return 0;
    if (now > end) return 100;

    const totalDuration = end - start;
    const elapsed = now - start;

    return ((elapsed / totalDuration) * 100).toFixed(2);
  };

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
            <h3 className="text-2xl font-bold text-gray-800">{selectedProject.name}</h3>
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
        <div>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Card
                key={project.id}
                className="bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800 flex justify-between items-center">
                    <div className="flex items-center">
                      <Home className="h-5 w-5 mr-2" />
                      {project.name}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditProjectName({ ...project })}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditProjectStatus({ ...project })}
                      >
                        <Building className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600"
                        onClick={() => handleDeleteProject(project.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <div className="flex items-center">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            getStatusColor(project.status)
                          }`}
                        >
                          {getStatusText(project.status)}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditProjectStatus({ ...project })}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Progresso Geral</p>
                      <div className="flex items-center mt-1">
                        <Progress value={project.progress} className="flex-1" />
                        <span className="ml-2 text-sm font-semibold text-gray-700">
                          {project.progress}%
                        </span>
                      </div>
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
        </div>
      )}

      {showProjectForm && (
        <ProjectForm
          onSubmit={handleProjectSubmit}
          onCancel={() => setShowProjectForm(false)}
          newProject={newProject}
          setNewProject={setNewProject}
        />
      )}

      {editProject && (
        <EditProjectNameForm
          project={editProject}
          setProject={setEditProject}
          onSubmit={handleProjectNameSubmit}
          onCancel={() => setEditProject(null)}
        />
      )}

      {editProjectStatus && (
        <EditProjectStatusForm
          project={editProjectStatus}
          setProject={setEditProjectStatus}
          onSubmit={handleProjectStatusSubmit}
          onCancel={() => setEditProjectStatus(null)}
        />
      )}
    </div>
  );
}

// Componentes auxiliares

function ProjectForm({ onSubmit, onCancel, newProject, setNewProject }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center">
      <Card className="w-full max-w-2xl h-fit max-h-[90vh] overflow-y-auto bg-white shadow-lg">
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
                  onChange={(e) =>
                    setNewProject({ ...newProject, name: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="constructionType">Tipo de Construção</Label>
                <select
                  id="constructionType"
                  value={newProject.constructionType}
                  onChange={(e) =>
                    setNewProject({ ...newProject, constructionType: e.target.value })
                  }
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
                  onChange={(e) =>
                    setNewProject({ ...newProject, address: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="responsibleEngineer">Engenheiro Responsável</Label>
                <Input
                  id="responsibleEngineer"
                  value={newProject.responsibleEngineer}
                  onChange={(e) =>
                    setNewProject({
                      ...newProject,
                      responsibleEngineer: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="startDate">Data de Início</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={newProject.startDate}
                  onChange={(e) =>
                    setNewProject({ ...newProject, startDate: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="estimatedEndDate">Previsão de Término</Label>
                <Input
                  id="estimatedEndDate"
                  type="date"
                  value={newProject.estimatedEndDate}
                  onChange={(e) =>
                    setNewProject({ ...newProject, estimatedEndDate: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="totalArea">Área Total (m²)</Label>
                <Input
                  id="totalArea"
                  type="number"
                  value={newProject.totalArea}
                  onChange={(e) =>
                    setNewProject({ ...newProject, totalArea: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="numberOfUnits">Número de Unidades</Label>
                <Input
                  id="numberOfUnits"
                  type="number"
                  value={newProject.numberOfUnits}
                  onChange={(e) =>
                    setNewProject({ ...newProject, numberOfUnits: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="budget">Orçamento Previsto (R$)</Label>
                <Input
                  id="budget"
                  type="number"
                  value={newProject.budget}
                  onChange={(e) =>
                    setNewProject({ ...newProject, budget: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  value={newProject.status}
                  onChange={(e) =>
                    setNewProject({ ...newProject, status: e.target.value })
                  }
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
                onChange={(e) =>
                  setNewProject({ ...newProject, description: e.target.value })
                }
                className="w-full border border-gray-300 rounded px-2 py-1 h-32"
                required
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                onClick={onCancel}
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
    </div>
  );
}

function EditProjectNameForm({ project, setProject, onSubmit, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <Card className="w-full max-w-md bg-white shadow-lg">
        <CardHeader>
          <CardTitle>Editar Nome da Obra</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <Label htmlFor="projectName">Nome da Obra</Label>
              <Input
                id="projectName"
                value={project.name}
                onChange={(e) => setProject({ ...project, name: e.target.value })}
                required
              />
            </div>
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                onClick={onCancel}
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
    </div>
  );
}

function EditProjectStatusForm({ project, setProject, onSubmit, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <Card className="w-full max-w-md bg-white shadow-lg">
        <CardHeader>
          <CardTitle>Editar Status da Obra</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <Label htmlFor="projectStatus">Status</Label>
              <select
                id="projectStatus"
                value={project.status}
                onChange={(e) => setProject({ ...project, status: e.target.value })}
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
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                onClick={onCancel}
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
    </div>
  );
}

function DocumentForm({ onSubmit, onCancel, newDocument, setNewDocument }) {
  const [documentTypeOptions, setDocumentTypeOptions] = useState(documentTypes);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center">
      <Card className="w-full max-w-lg h-fit max-h-[90vh] overflow-y-auto bg-white shadow-lg">
        <CardHeader>
          <CardTitle>{newDocument.id ? 'Editar Documento' : 'Upload de Documento'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <Label htmlFor="docType">Tipo de Documento</Label>
              <select
                id="docType"
                value={newDocument.type}
                onChange={(e) =>
                  setNewDocument({ ...newDocument, type: e.target.value })
                }
                className="w-full border border-gray-300 rounded px-2 py-1"
                required
                disabled={!!newDocument.id}
              >
                <option value="">Selecione o tipo</option>
                {documentTypeOptions.map((docType) => (
                  <option key={docType.value} value={docType.value}>
                    {docType.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="docName">Nome do Documento</Label>
              <Input
                id="docName"
                value={newDocument.name}
                onChange={(e) =>
                  setNewDocument({ ...newDocument, name: e.target.value })
                }
                required
              />
            </div>

            <div>
              <Label htmlFor="docStatus">Status</Label>
              <select
                id="docStatus"
                value={newDocument.status}
                onChange={(e) =>
                  setNewDocument({ ...newDocument, status: e.target.value })
                }
                className="w-full border border-gray-300 rounded px-2 py-1"
                required
              >
                <option value="pending">Pendente</option>
                <option value="approved">Aprovado</option>
                <option value="expired">Expirado</option>
              </select>
            </div>

            <div>
              <Label htmlFor="expiryDate">Data de Validade (se aplicável)</Label>
              <Input
                id="expiryDate"
                type="date"
                value={newDocument.expiryDate}
                onChange={(e) =>
                  setNewDocument({ ...newDocument, expiryDate: e.target.value })
                }
              />
            </div>

            {!newDocument.id && (
              <div>
                <Label htmlFor="docFile">Arquivo</Label>
                <Input
                  id="docFile"
                  type="file"
                  onChange={(e) =>
                    setNewDocument({ ...newDocument, file: e.target.files[0] })
                  }
                  required
                />
              </div>
            )}

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                onClick={onCancel}
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
    </div>
  );
}

function TimelineForm({
  onSubmit,
  onCancel,
  newTimeline,
  setNewTimeline,
  newMilestone,
  setNewMilestone,
  newTask,
  setNewTask,
  handleAddMilestone,
  handleAddTask,
  handleRemoveMilestone,
  handleRemoveTask,
  handleTaskChange,
  handleMilestoneChange,
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center">
      <Card className="w-full max-w-2xl h-fit max-h-[90vh] overflow-y-auto bg-white shadow-lg">
        <CardHeader>
          <CardTitle>{newTimeline.phase ? 'Editar Fase' : 'Nova Fase da Timeline'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <Label htmlFor="phase">Fase</Label>
              <Input
                id="phase"
                value={newTimeline.phase}
                onChange={(e) =>
                  setNewTimeline({ ...newTimeline, phase: e.target.value })
                }
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Data de Início</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={newTimeline.startDate}
                  onChange={(e) =>
                    setNewTimeline({ ...newTimeline, startDate: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="endDate">Data de Término</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={newTimeline.endDate}
                  onChange={(e) =>
                    setNewTimeline({ ...newTimeline, endDate: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="progress">Progresso (%)</Label>
                <Input
                  id="progress"
                  type="number"
                  value={newTimeline.progress}
                  onChange={(e) =>
                    setNewTimeline({ ...newTimeline, progress: e.target.value })
                  }
                  required
                  disabled
                />
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Marcos</h4>
              <div className="space-y-2">
                {newTimeline.milestones.map((milestone, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div>
                          <Label>Data do Marco</Label>
                          <Input
                            type="date"
                            value={milestone.date}
                            onChange={(e) =>
                              handleMilestoneChange(idx, 'date', e.target.value)
                            }
                            required
                          />
                        </div>
                        <div>
                          <Label>Descrição</Label>
                          <Input
                            value={milestone.description}
                            onChange={(e) =>
                              handleMilestoneChange(idx, 'description', e.target.value)
                            }
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600"
                      onClick={() => handleRemoveMilestone(idx)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="milestoneDate">Data do Marco</Label>
                    <Input
                      id="milestoneDate"
                      type="date"
                      value={newMilestone.date}
                      onChange={(e) =>
                        setNewMilestone({ ...newMilestone, date: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="milestoneDescription">Descrição</Label>
                    <Input
                      id="milestoneDescription"
                      value={newMilestone.description}
                      onChange={(e) =>
                        setNewMilestone({
                          ...newMilestone,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <Button
                  type="button"
                  onClick={handleAddMilestone}
                  className="mt-2 bg-teal-500 hover:bg-teal-600 text-white"
                >
                  Adicionar Marco
                </Button>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Tarefas</h4>
              <div className="space-y-2">
                {newTimeline.tasks.map((task, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <div>
                          <Label>Nome da Tarefa</Label>
                          <Input
                            value={task.name}
                            onChange={(e) =>
                              handleTaskChange(idx, 'name', e.target.value)
                            }
                            required
                          />
                        </div>
                        <div>
                          <Label>Status</Label>
                          <select
                            value={task.status}
                            onChange={(e) =>
                              handleTaskChange(idx, 'status', e.target.value)
                            }
                            className="w-full border border-gray-300 rounded px-2 py-1"
                            required
                          >
                            <option value="pending">Pendente</option>
                            <option value="in_progress">Em Progresso</option>
                            <option value="completed">Concluída</option>
                          </select>
                        </div>
                        <div>
                          <Label>Progresso (%)</Label>
                          <Input
                            type="number"
                            value={task.progress}
                            onChange={(e) =>
                              handleTaskChange(idx, 'progress', e.target.value)
                            }
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600"
                      onClick={() => handleRemoveTask(idx)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="taskName">Nome da Tarefa</Label>
                    <Input
                      id="taskName"
                      value={newTask.name}
                      onChange={(e) =>
                        setNewTask({ ...newTask, name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="taskStatus">Status</Label>
                    <select
                      id="taskStatus"
                      value={newTask.status}
                      onChange={(e) =>
                        setNewTask({ ...newTask, status: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded px-2 py-1"
                    >
                      <option value="pending">Pendente</option>
                      <option value="in_progress">Em Progresso</option>
                      <option value="completed">Concluída</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="taskProgress">Progresso (%)</Label>
                    <Input
                      id="taskProgress"
                      type="number"
                      value={newTask.progress}
                      onChange={(e) =>
                        setNewTask({ ...newTask, progress: e.target.value })
                      }
                    />
                  </div>
                </div>
                <Button
                  type="button"
                  onClick={handleAddTask}
                  className="mt-2 bg-teal-500 hover:bg-teal-600 text-white"
                >
                  Adicionar Tarefa
                </Button>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                onClick={onCancel}
                className="bg-gray-500 hover:bg-gray-600 text-white"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-teal-500 hover:bg-teal-600 text-white"
              >
                Salvar Fase
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function PhotoUploadForm({
  onSubmit,
  onCancel,
  newPhoto,
  setNewPhoto,
  handlePhotoSelect,
  canvasRef,
  startDrawing,
  draw,
  stopDrawing,
  selectedTool,
  setSelectedTool,
  currentColor,
  setCurrentColor,
  currentWidth,
  setCurrentWidth,
  currentImage,
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center">
      <Card className="w-full max-w-3xl h-fit max-h-[90vh] overflow-y-auto bg-white shadow-lg">
        <CardHeader>
          <CardTitle>Upload e Anotação de Foto</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
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
                onClick={onCancel}
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
    </div>
  );
}

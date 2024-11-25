import { useState } from 'react';
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
  Package,
  AlertTriangle,
  Trash2,
  Plus,
  TrendingUp,
  ArrowUpCircle,
  ArrowDownCircle,
} from 'lucide-react';

export default function Materials({ data }) {
  const [activeProject, setActiveProject] = useState('overview');
  const [newMaterial, setNewMaterial] = useState({
    name: '',
    quantity: '',
    unit: '',
    unitPrice: '',
    minQuantity: '',
    supplier: '',
    category: '',
    projectId: '',
  });

  // Mock data - em produção, viria das props
  const projects = [
    {
      id: 1,
      name: 'Edifício Horizonte',
      materials: [
        { id: 1, name: 'Cimento', quantity: 100, unit: 'sacos', unitPrice: 25, minQuantity: 20, supplier: 'Votorantim', category: 'Básico' },
        { id: 2, name: 'Vergalhões', quantity: 50, unit: 'barras', unitPrice: 45, minQuantity: 10, supplier: 'Gerdau', category: 'Ferro' },
      ],
      budget: 200000,
      spent: 150000,
    },
    {
      id: 2,
      name: 'Residencial Parque Verde',
      materials: [
        { id: 3, name: 'Tijolos', quantity: 5000, unit: 'unidades', unitPrice: 0.5, minQuantity: 1000, supplier: 'Cerâmica Silva', category: 'Alvenaria' },
        { id: 4, name: 'Areia', quantity: 30, unit: 'm³', unitPrice: 120, minQuantity: 5, supplier: 'Areial Central', category: 'Básico' },
      ],
      budget: 150000,
      spent: 80000,
    },
  ];

  const categories = [
    'Básico',
    'Ferro',
    'Alvenaria',
    'Hidráulica',
    'Elétrica',
    'Acabamento',
    'Outros',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Novo material:', newMaterial);
    setNewMaterial({
      name: '',
      quantity: '',
      unit: '',
      unitPrice: '',
      minQuantity: '',
      supplier: '',
      category: '',
      projectId: '',
    });
  };

  const renderMaterialsTable = (materials) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Material</TableHead>
          <TableHead>Categoria</TableHead>
          <TableHead>Quantidade</TableHead>
          <TableHead>Unidade</TableHead>
          <TableHead>Preço Unit.</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {materials.map((material) => (
          <TableRow key={material.id}>
            <TableCell className="font-medium">{material.name}</TableCell>
            <TableCell>{material.category}</TableCell>
            <TableCell>{material.quantity}</TableCell>
            <TableCell>{material.unit}</TableCell>
            <TableCell>R$ {material.unitPrice.toFixed(2)}</TableCell>
            <TableCell>R$ {(material.quantity * material.unitPrice).toFixed(2)}</TableCell>
            <TableCell>
              {material.quantity <= material.minQuantity ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  Baixo Estoque
                </span>
              ) : (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Regular
                </span>
              )}
            </TableCell>
            <TableCell>
              <Button
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
        {/* Resumo do Orçamento */}
        <Card className="bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg rounded-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800">Orçamento de Materiais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-gray-800 mb-2">
              R$ {project.spent.toLocaleString()} / R$ {project.budget.toLocaleString()}
            </div>
            <Progress value={(project.spent / project.budget) * 100} className="h-2" />
            <p className="text-base text-gray-600 mt-2">
              {(((project.spent / project.budget) * 100).toFixed(1))}% do orçamento utilizado
            </p>
          </CardContent>
        </Card>

        {/* Formulário de Novo Material */}
        <Card className="bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg rounded-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800">Adicionar Novo Material</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="name">Nome do Material</Label>
                  <Input
                    id="name"
                    value={newMaterial.name}
                    onChange={(e) => setNewMaterial({ ...newMaterial, name: e.target.value })}
                    className="border-gray-300"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="category">Categoria</Label>
                  <select
                    id="category"
                    value={newMaterial.category}
                    onChange={(e) => setNewMaterial({ ...newMaterial, category: e.target.value })}
                    className="w-full border border-gray-300 rounded px-2 py-1"
                    required
                  >
                    <option value="">Selecione uma categoria</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="quantity">Quantidade</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={newMaterial.quantity}
                    onChange={(e) => setNewMaterial({ ...newMaterial, quantity: e.target.value })}
                    className="border-gray-300"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="unit">Unidade</Label>
                  <Input
                    id="unit"
                    value={newMaterial.unit}
                    onChange={(e) => setNewMaterial({ ...newMaterial, unit: e.target.value })}
                    className="border-gray-300"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="unitPrice">Preço Unitário (R$)</Label>
                  <Input
                    id="unitPrice"
                    type="number"
                    step="0.01"
                    value={newMaterial.unitPrice}
                    onChange={(e) => setNewMaterial({ ...newMaterial, unitPrice: e.target.value })}
                    className="border-gray-300"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="minQuantity">Quantidade Mínima</Label>
                  <Input
                    id="minQuantity"
                    type="number"
                    value={newMaterial.minQuantity}
                    onChange={(e) => setNewMaterial({ ...newMaterial, minQuantity: e.target.value })}
                    className="border-gray-300"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="supplier">Fornecedor</Label>
                  <Input
                    id="supplier"
                    value={newMaterial.supplier}
                    onChange={(e) => setNewMaterial({ ...newMaterial, supplier: e.target.value })}
                    className="border-gray-300"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
              >
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Material
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Lista de Materiais */}
        <Card className="bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg rounded-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800">Materiais da Obra</CardTitle>
          </CardHeader>
          <CardContent>
            {renderMaterialsTable(project.materials)}
          </CardContent>
        </Card>

        {/* Alertas de Estoque */}
        <Card className="bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg rounded-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800">Alertas de Estoque</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {project.materials.filter(m => m.quantity <= m.minQuantity).map((material) => (
                <div
                  key={material.id}
                  className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-100"
                >
                  <div className="flex items-center">
                    <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                    <div>
                      <p className="font-medium text-red-800">{material.name}</p>
                      <p className="text-sm text-red-600">
                        Quantidade atual: {material.quantity} {material.unit}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-red-600">
                    Mínimo: {material.minQuantity} {material.unit}
                  </p>
                </div>
              ))}
              {project.materials.filter(m => m.quantity <= m.minQuantity).length === 0 && (
                <p className="text-center text-gray-500">Nenhum alerta de estoque no momento.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Cards de Resumo */}
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
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Orçamento Utilizado:</span>
                  <span>{(((project.spent / project.budget) * 100).toFixed(1))}%</span>
                </div>
                <Progress value={(project.spent / project.budget) * 100} className="h-2" />
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center text-green-600">
                    <Package className="h-4 w-4 mr-1" />
                    <span>{project.materials.length} itens</span>
                  </div>
                  <div className="flex items-center text-red-600">
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    <span>
                      {project.materials.filter(m => m.quantity <= m.minQuantity).length} alertas
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabela Geral de Materiais */}
      <Card className="bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg rounded-lg hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-xl text-gray-800">Todos os Materiais</CardTitle>
        </CardHeader>
        <CardContent>
          {renderMaterialsTable(projects.flatMap(project =>
            project.materials.map(material => ({
              ...material,
              projectName: project.name,
            }))
          ))}
        </CardContent>
      </Card>

      {/* Resumo de Gastos */}
      <Card className="bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg rounded-lg hover:shadow-xl transition-all duration-300">
      <CardHeader>
          <CardTitle className="text-xl text-gray-800">Resumo de Gastos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-4">
              <ArrowUpCircle className="h-8 w-8 text-red-500" />
              <div>
                <p className="text-sm text-gray-600">Total Gasto</p>
                <p className="text-2xl font-bold text-gray-800">
                  R$ {projects.reduce((sum, p) => sum + p.spent, 0).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <ArrowDownCircle className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Orçamento Disponível</p>
                <p className="text-2xl font-bold text-gray-800">
                  R$ {(projects.reduce((sum, p) => sum + p.budget, 0) - 
                      projects.reduce((sum, p) => sum + p.spent, 0)).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <>
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Gerenciamento de Materiais</h2>

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
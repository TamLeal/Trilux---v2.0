import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Progress } from "@/components/ui/Progress";
import { Home, DollarSign, CalendarDays, LineChart, Percent, Timer, Package, Zap } from "lucide-react";



export default function Dashboard({ data }) {
  return (
    <>
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h2>
      <h3 className="text-xl font-semibold mb-4 text-gray-700">Visão Geral do Projeto</h3>
      {/* Top Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Obras Ativas</CardTitle>
            <Home className="h-6 w-6 opacity-75" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{data.activeProjects}</div>
            <p className="text-xs opacity-75 mt-1">3 em fase inicial</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Gastos Mensais</CardTitle>
            <DollarSign className="h-6 w-6 opacity-75" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">R${data.monthlyExpenses.toLocaleString()}</div>
            <p className="text-xs opacity-75 mt-1">Meta: R$180.000</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Visitas Agendadas</CardTitle>
            <CalendarDays className="h-6 w-6 opacity-75" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{data.scheduledVisits}</div>
            <p className="text-xs opacity-75 mt-1">Próximos 7 dias</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Produtividade</CardTitle>
            <LineChart className="h-6 w-6 opacity-75" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">92%</div>
            <p className="text-xs opacity-75 mt-1">Aumento de 5% este mês</p>
          </CardContent>
        </Card>
      </div>

      <h3 className="text-xl font-semibold mb-4 mt-8 text-gray-700">Métricas de Desempenho</h3>
      {/* Middle Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-6">
        <Card className="bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium text-gray-800">Taxa de Conclusão</CardTitle>
            <Percent className="h-6 w-6 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2 text-gray-800">{data.completionRate}%</div>
            <Progress value={data.completionRate} className="h-2" />
            <p className="text-xs text-gray-600 mt-1">Média de todas as obras</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium text-gray-800">Tempo Médio</CardTitle>
            <Timer className="h-6 w-6 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-800">{data.averageTime} meses</div>
            <p className="text-xs text-gray-600 mt-1">Por projeto concluído</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium text-gray-800">Materiais em Falta</CardTitle>
            <Package className="h-6 w-6 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-800">{data.materialsNeeded.length}</div>
            <p className="text-xs text-gray-600 mt-1">Itens para reposição</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium text-gray-800">Eficiência Energética</CardTitle>
            <Zap className="h-6 w-6 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-800">85%</div>
            <p className="text-xs text-gray-600 mt-1">Economia de energia</p>
          </CardContent>
        </Card>
      </div>

      <h3 className="text-xl font-semibold mb-4 mt-8 text-gray-700">Informações Adicionais</h3>
      {/* Bottom Section */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-lg text-gray-800">Pagamentos Pendentes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base text-gray-600">
              Existem {data.pendingPayments} pagamentos pendentes para fornecedores. Total: R${data.pendingPaymentsTotal.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-lg text-gray-800">Material em Falta</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base text-gray-600">
              {data.materialsNeeded.length} obras precisam de reposição de:
            </p>
            <ul className="list-disc list-inside mt-2">
              {data.materialsNeeded.map((material, index) => (
                <li key={index} className="text-gray-700">{material}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-lg text-gray-800">Próximas Entregas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base text-gray-600">
              {data.upcomingDeliveries} entregas programadas para esta semana. Verificar cronograma.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-lg text-gray-800">Segurança no Trabalho</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base text-gray-600">
              30 dias sem acidentes. Próximo treinamento de segurança em 5 dias.
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

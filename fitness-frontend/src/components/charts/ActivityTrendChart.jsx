import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Pie,
  PieChart,
  Cell,
} from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '../ui/chart'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'

const chartConfig = {
  activities: {
    label: 'Activities',
    color: '#3b82f6',
  },
}

const ActivityTrendChart = ({
  trendData = [],
  typeData = [],
  title,
  description,
}) => {
  return (
    <div className="grid gap-6 xl:grid-cols-3">
      <Card className="border-slate-800 bg-slate-900 text-white xl:col-span-2">
        <CardHeader className="pb-2">
          <CardTitle>{title}</CardTitle>
          <CardDescription className="text-slate-400">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <ChartContainer config={chartConfig} className="h-[260px] w-full">
            <LineChart data={trendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke="#1e293b" />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                stroke="#94a3b8"
              />
              <YAxis
                allowDecimals={false}
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                stroke="#94a3b8"
              />
              <ChartTooltip
                cursor={{ stroke: '#475569', strokeWidth: 1 }}
                content={<ChartTooltipContent />}
              />
              <Line
                type="monotone"
                dataKey="activities"
                stroke="#3b82f6"
                strokeWidth={2.5}
                dot={{ r: 4, fill: '#3b82f6' }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="border-slate-800 bg-slate-900 text-white">
        <CardHeader className="pb-2">
          <CardTitle>Activity Types</CardTitle>
          <CardDescription className="text-slate-400">
            Distribution by type
          </CardDescription>
        </CardHeader>

        <CardContent>
          <ChartContainer config={chartConfig} className="h-[260px] w-full">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={typeData}
                dataKey="value"
                nameKey="type"
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={45}
                paddingAngle={4}
              >
                {typeData.map((entry, index) => (
                  <Cell key={index} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>

          <div className="mt-4 flex flex-wrap gap-2">
            {typeData.map((item) => (
              <div
                key={item.type}
                className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs text-slate-300"
              >
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: item.fill }}
                />
                <span>{item.type}</span>
                <span className="text-white">{item.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ActivityTrendChart
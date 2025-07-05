"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, LineChart, ResponsiveContainer, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import { Users, Search, LineChart as LineChartIcon, ThumbsUp, Target, ArrowUp, ArrowDown } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const trafficData = [
  { month: "Jan", traffic: 1200 },
  { month: "Feb", traffic: 1500 },
  { month: "Mar", traffic: 1300 },
  { month: "Apr", traffic: 1800 },
  { month: "May", traffic: 2100 },
  { month: "Jun", traffic: 2500 },
];

const keywordData = [
  { name: "Top 1-3", value: 15, fill: "var(--color-top)" },
  { name: "Top 4-10", value: 45, fill: "var(--color-top)" },
  { name: "Top 11-20", value: 80, fill: "var(--color-mid)" },
  { name: "Top 21-50", value: 120, fill: "var(--color-low)" },
];

const chartConfig = {
  traffic: {
    label: "Traffic",
    color: "hsl(var(--primary))",
  },
  top: {
    label: "Top Positions",
    color: "hsl(var(--chart-1))",
  },
  mid: {
    label: "Mid Positions",
    color: "hsl(var(--chart-2))",
  },
  low: {
    label: "Low Positions",
    color: "hsl(var(--chart-3))",
  },
}

export default function DashboardPage() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Website Score</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">88/100</div>
          <p className="text-xs text-muted-foreground flex items-center">
            <ArrowUp className="h-4 w-4 text-green-500" />
            +2.5 from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Organic Traffic</CardTitle>
          <LineChartIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12,543</div>
          <p className="text-xs text-muted-foreground flex items-center">
             <ArrowUp className="h-4 w-4 text-green-500" />
            +15.2% from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Keywords in Top 10</CardTitle>
          <Search className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">60</div>
           <p className="text-xs text-muted-foreground flex items-center">
            <ArrowDown className="h-4 w-4 text-red-500" />
            -5 from last week
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Social Engagement</CardTitle>
          <ThumbsUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+5,231</div>
          <p className="text-xs text-muted-foreground flex items-center">
            <ArrowUp className="h-4 w-4 text-green-500" />
            +8.1% from last month
          </p>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Traffic Overview</CardTitle>
          <CardDescription>Monthly organic traffic to digimediakomunika.cloud.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <LineChart data={trafficData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} />
              <Tooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" hideLabel />}
              />
              <Line dataKey="traffic" type="monotone" stroke="var(--color-traffic)" strokeWidth={2} dot={true} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Keyword Rankings</CardTitle>
          <CardDescription>Distribution of keyword rankings.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <BarChart data={keywordData} layout="vertical" margin={{ left: 10 }}>
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} tickMargin={8} width={80} />
              <Tooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Legend />
              <Bar dataKey="value" radius={5} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="lg:col-span-4">
        <CardHeader>
          <CardTitle>Top Keywords</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between items-center p-2 rounded-md hover:bg-secondary"><span>"digital marketing Indonesia"</span> <span className="font-bold">#1</span></li>
            <li className="flex justify-between items-center p-2 rounded-md hover:bg-secondary"><span>"jasa SEO terbaik"</span><span className="font-bold">#3</span></li>
            <li className="flex justify-between items-center p-2 rounded-md hover:bg-secondary"><span>"SMO strategy"</span><span className="font-bold">#5</span></li>
            <li className="flex justify-between items-center p-2 rounded-md hover:bg-secondary"><span>"iklan Google Adsense"</span><span className="font-bold">#8</span></li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

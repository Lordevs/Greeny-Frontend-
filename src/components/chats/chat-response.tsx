"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, AlertTriangle } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

interface ChatResponseProps {
  title: string;
  description: string;
  trendData: any[];
  indexData: any[];
}

export const ChatResponse: React.FC<ChatResponseProps> = ({
  title,
  description,
  trendData,
  indexData,
}) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Response Header */}
      <div className="flex items-start gap-4">
        <div className="w-9 h-9 shrink-0 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold shadow-lg">
          G
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-foreground mb-3 leading-tight">
            {title}
          </h3>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            {description}
          </p>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="shadow-sm border-border/50 hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <CardTitle className="text-sm font-semibold text-primary/80 uppercase tracking-wider">
                  Consumer Price Index Trend
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  Trade Balance vs. Current Account Balance, 2000-2024
                </p>
              </CardHeader>
              <CardContent>
                <div className="h-52 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trendData}>
                      <defs>
                        <linearGradient
                          id="colorValue"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1">
                          <stop
                            offset="5%"
                            stopColor="#f97316"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="#f97316"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#f0f0f0"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="year"
                        tick={{ fontSize: 10, fill: "#888" }}
                        axisLine={{ stroke: "#eee" }}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fontSize: 10, fill: "#888" }}
                        axisLine={{ stroke: "#eee" }}
                        tickLine={false}
                      />
                      <Tooltip
                        contentStyle={{
                          borderRadius: "8px",
                          border: "none",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#f97316"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorValue)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-border/50 hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <CardTitle className="text-sm font-semibold text-blue-600/80 uppercase tracking-wider">
                  CPI Index
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  Saudi Arabia CPI Index (2010=100) by Year
                </p>
              </CardHeader>
              <CardContent>
                <div className="h-52 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={indexData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#f0f0f0"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="year"
                        tick={{ fontSize: 10, fill: "#888" }}
                        axisLine={{ stroke: "#eee" }}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fontSize: 10, fill: "#888" }}
                        axisLine={{ stroke: "#eee" }}
                        tickLine={false}
                      />
                      <Tooltip
                        contentStyle={{
                          borderRadius: "8px",
                          border: "none",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#3b82f6"
                        strokeWidth={3}
                        dot={{
                          fill: "#3b82f6",
                          r: 4,
                          strokeWidth: 2,
                          stroke: "#fff",
                        }}
                        activeDot={{ r: 6, strokeWidth: 0 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Key Findings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-border/50 shadow-sm overflow-hidden">
              <div className="h-1 bg-primary w-full" />
              <CardContent className="pt-5">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <h4 className="font-bold text-foreground uppercase tracking-tight text-sm">
                    Key Findings
                  </h4>
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex gap-3">
                    <span className="text-primary font-bold mt-0.5">•</span>
                    <span className="text-muted-foreground focus:text-foreground transition-colors">
                      <strong className="text-foreground">2008 Crisis:</strong>{" "}
                      Inflation peaked at 11.1% globally.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold mt-0.5">•</span>
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">
                        Oil Correlation:
                      </strong>{" "}
                      Closely follows global oil movements.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold mt-0.5">•</span>
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">Vision 2030:</strong>{" "}
                      Economic stability improved significantly.
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-sm overflow-hidden">
              <div className="h-1 bg-amber-500 w-full" />
              <CardContent className="pt-5">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  <h4 className="font-bold text-foreground uppercase tracking-tight text-sm">
                    Notable Periods
                  </h4>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-start gap-4">
                    <div className="min-w-0">
                      <p className="font-bold text-xs text-foreground uppercase tracking-wider mb-1">
                        2008-2009
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        Financial crisis volatility
                      </p>
                    </div>
                    <div className="min-w-0 text-right">
                      <p className="font-bold text-xs text-foreground uppercase tracking-wider mb-1">
                        2016-17
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        VAT introduction effects
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-start gap-4">
                    <div className="min-w-0">
                      <p className="font-bold text-xs text-foreground uppercase tracking-wider mb-1">
                        2020
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        COVID-19 oil volatility
                      </p>
                    </div>
                    <div className="min-w-0 text-right">
                      <p className="font-bold text-xs text-foreground uppercase tracking-wider mb-1">
                        2022-24
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        Stable post-pandemic recovery
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

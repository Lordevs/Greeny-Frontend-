"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, AlertTriangle, Bot } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";
import { getFileIcon } from "@/lib/chat-utils";

interface ChatResponseProps {
  userMessage?: string;
  userFile?: File | null;
  title: string;
  description: string;
  trendData: any[];
  indexData: any[];
}

const trendChartConfig = {
  value: {
    label: "CPI Trend",
    color: "hsl(var(--primary))",
  },
};

const indexChartConfig = {
  value: {
    label: "CPI Index",
    color: "#3b82f6",
  },
};

export const ChatResponse: React.FC<ChatResponseProps> = ({
  userMessage,
  userFile,
  title,
  description,
  trendData,
  indexData,
}) => {
  const fileInfo = userFile ? getFileIcon(userFile.name) : null;
  const FileIconComponent = fileInfo?.icon;

  return (
    <div className="max-w-5xl mx-auto space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12 px-2 md:px-0">
      {/* User Message - Orange Box */}
      {(userMessage || userFile) && (
        <div className="flex justify-end pr-0">
          <div className="bg-primary-foreground text-destructive p-4 md:p-5 rounded-2xl rounded-tr-none shadow-lg max-w-[95%] md:max-w-[70%] text-sm md:text-base leading-relaxed animate-in zoom-in-95 duration-300 wrap-break-word whitespace-pre-wrap flex flex-col gap-3">
            {userFile && fileInfo && FileIconComponent && (
              <div
                className={`flex items-center gap-2 ${fileInfo.bgColor} p-2 rounded-lg border border-white/20`}>
                <FileIconComponent className={`w-5 h-5 ${fileInfo.color}`} />
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold truncate">
                    {userFile.name}
                  </span>
                  <span className="text-[10px] opacity-70">
                    {(userFile.size / 1024).toFixed(1)} KB
                  </span>
                </div>
              </div>
            )}
            {userMessage && <div>{userMessage}</div>}
          </div>
        </div>
      )}

      {/* Bot Response */}
      <div className="flex flex-col md:flex-row items-start gap-3 md:gap-4">
        {/* Bot Avatar Section */}
        <div className="flex items-center gap-2 md:block">
          <div className="w-8 h-8 md:w-10 md:h-10 shrink-0 rounded-full bg-primary-foreground flex items-center justify-center text-secondary shadow-lg md:mt-2 border border-white/20">
            <Bot className="w-5 h-5 md:w-6 md:h-6" />
          </div>
          <span className="md:hidden text-xs font-bold text-primary-foreground uppercase tracking-wider">
            AI Assistant
          </span>
        </div>

        {/* Main Content Box */}
        <div className="flex-1 w-full relative">
          <div className="bg-secondary p-5 md:p-8 rounded-2xl md:rounded-3xl space-y-5 md:space-y-8 shadow-xl overflow-hidden shadow-black/5 border border-white/5">
            <div className="flex-1">
              <h3 className="text-xl md:text-2xl font-bold text-primary-foreground mb-3 leading-tight">
                {title}
              </h3>
              <p className="text-base md:text-xl text-primary-foreground/90 leading-relaxed font-medium wrap-break-word whitespace-pre-wrap max-w-3xl">
                {description}
              </p>
            </div>

            {/* Charts Section */}
            {trendData.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-primary-foreground uppercase tracking-[0.2em]">
                    Statistical Overview
                  </h4>
                  <div className="h-px flex-1 bg-white/10 mx-6 hidden md:block" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="shadow-2xl bg-white gap-0 py-0 dark:bg-black/40 border-slate-200 dark:border-white/10 hover:shadow-primary/5 transition-all overflow-hidden">
                    <CardHeader className="p-6 pb-2">
                      <CardTitle className="text-lg font-bold text-slate-800 dark:text-white">
                        Consumer Price Index Trend
                      </CardTitle>
                      <p className="text-xs text-slate-500 font-medium italic">
                        Saudi Arabia: Trade Balance (line) vs. Current Account
                        Balance (area), 2000-2024
                      </p>
                    </CardHeader>
                    <CardContent className="p-6 pt-4">
                      <div className="h-64 md:h-72 w-full">
                        <ChartContainer
                          config={{
                            value: { label: "Trade Balance", color: "#3b82f6" },
                            area: {
                              label: "Current Account Balance",
                              color: "#fbbf24",
                            },
                          }}
                          className="h-full w-full">
                          <AreaChart
                            data={trendData}
                            margin={{
                              top: 10,
                              right: 10,
                              left: 20,
                              bottom: 20,
                            }}>
                            <defs>
                              <linearGradient
                                id="areaGradient"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1">
                                <stop
                                  offset="5%"
                                  stopColor="#fbbf24"
                                  stopOpacity={0.6}
                                />
                                <stop
                                  offset="95%"
                                  stopColor="#fbbf24"
                                  stopOpacity={0.1}
                                />
                              </linearGradient>
                            </defs>
                            <CartesianGrid
                              strokeDasharray="3 3"
                              className="stroke-slate-200 dark:stroke-slate-800"
                              vertical={true}
                            />
                            <XAxis
                              dataKey="year"
                              label={{
                                value: "Year",
                                position: "insideBottom",
                                offset: -10,
                                className:
                                  "fill-slate-500 text-[10px] font-bold",
                              }}
                              tick={{
                                fontSize: 10,
                                fill: "currentColor",
                                opacity: 0.6,
                              }}
                              axisLine={{ stroke: "#e2e8f0" }}
                              tickLine={false}
                            />
                            <YAxis
                              label={{
                                value: "Trade Balance (USD Billion)",
                                angle: -90,
                                position: "insideLeft",
                                offset: 10,
                                className:
                                  "fill-slate-500 text-[10px] font-bold",
                              }}
                              tick={{
                                fontSize: 10,
                                fill: "currentColor",
                                opacity: 0.6,
                              }}
                              axisLine={{ stroke: "#e2e8f0" }}
                              tickLine={false}
                            />
                            <ChartTooltip
                              content={
                                <ChartTooltipContent className="bg-white shadow-xl border-slate-200" />
                              }
                            />
                            <Area
                              type="monotone"
                              dataKey="value" // Using trendData value as area for visual match
                              stroke="none"
                              fill="url(#areaGradient)"
                            />
                            <Line
                              type="monotone"
                              dataKey="value"
                              stroke="#3b82f6"
                              strokeWidth={2}
                              dot={{
                                fill: "#3b82f6",
                                r: 4,
                                strokeWidth: 1,
                                stroke: "#fff",
                              }}
                              activeDot={{ r: 6 }}
                            />
                          </AreaChart>
                        </ChartContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-2xl gap-0 py-0 bg-white dark:bg-black/40 border-slate-200 dark:border-white/10 hover:shadow-primary/5 transition-all overflow-hidden">
                    <CardHeader className="p-6 pb-2">
                      <CardTitle className="text-lg font-bold text-slate-800 dark:text-white">
                        CPI Index
                      </CardTitle>
                      <p className="text-xs text-slate-500 font-medium italic">
                        Saudi Arabia CPI Index (2018=100) by Year
                      </p>
                    </CardHeader>
                    <CardContent className="p-6 pt-4">
                      <div className="h-64 md:h-72 w-full">
                        <ChartContainer
                          config={{
                            value: { label: "CPI Index", color: "#3b82f6" },
                          }}
                          className="h-full w-full">
                          <LineChart
                            data={indexData}
                            margin={{
                              top: 10,
                              right: 10,
                              left: 20,
                              bottom: 20,
                            }}>
                            <CartesianGrid
                              strokeDasharray="3 3"
                              className="stroke-slate-200 dark:stroke-slate-800"
                              vertical={true}
                            />
                            <XAxis
                              dataKey="year"
                              label={{
                                value: "Year",
                                position: "insideBottom",
                                offset: -10,
                                className:
                                  "fill-slate-500 text-[10px] font-bold",
                              }}
                              tick={{
                                fontSize: 10,
                                fill: "currentColor",
                                opacity: 0.6,
                              }}
                              axisLine={{ stroke: "#e2e8f0" }}
                              tickLine={false}
                            />
                            <YAxis
                              label={{
                                value: "CPI Index (2018=100)",
                                angle: -90,
                                position: "insideLeft",
                                offset: 10,
                                className:
                                  "fill-slate-500 text-[10px] font-bold",
                              }}
                              tick={{
                                fontSize: 10,
                                fill: "currentColor",
                                opacity: 0.6,
                              }}
                              axisLine={{ stroke: "#e2e8f0" }}
                              tickLine={false}
                            />
                            <ChartTooltip
                              content={
                                <ChartTooltipContent className="bg-white shadow-xl border-slate-200" />
                              }
                            />
                            <Line
                              type="monotone"
                              dataKey="value"
                              stroke="#3b82f6"
                              strokeWidth={2}
                              dot={{
                                fill: "#3b82f6",
                                r: 4,
                                strokeWidth: 1,
                                stroke: "#fff",
                              }}
                              activeDot={{ r: 6 }}
                            />
                          </LineChart>
                        </ChartContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Key Findings Section */}
            {trendData.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-primary-foreground uppercase tracking-[0.2em]">
                    Detailed Insights
                  </h4>
                  <div className="h-px flex-1 bg-white/10 mx-6 hidden md:block" />
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <Card className="border-white/5 gap-0 py-4 bg-primary-foreground backdrop-blur-sm overflow-hidden group/insight transition-colors">
                    <div className="h-1 bg-primary w-full" />
                    <CardContent className="p-6 md:p-8 text-left">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-lg bg-primary/20 text-primary">
                          <TrendingUp className="w-5 h-5" />
                        </div>
                        <h4 className="font-bold uppercase tracking-tight text-sm">
                          Key Performance Indicators
                        </h4>
                      </div>
                      <ul className="space-y-2 md:space-y-3 text-xs md:text-sm">
                        <li className="flex gap-2 md:gap-3">
                          <span className="text-primary font-bold mt-0.5">
                            •
                          </span>
                          <span className="text-muted-foreground focus:text-foreground transition-colors">
                            <strong className="text-foreground">
                              2008 Crisis:
                            </strong>{" "}
                            Inflation peaked at 11.1% globally.
                          </span>
                        </li>
                        <li className="flex gap-2 md:gap-3">
                          <span className="text-primary font-bold mt-0.5">
                            •
                          </span>
                          <span className="text-muted-foreground">
                            <strong className="text-foreground">
                              Oil Correlation:
                            </strong>{" "}
                            Closely follows global oil movements.
                          </span>
                        </li>
                        <li className="flex gap-2 md:gap-3">
                          <span className="text-primary font-bold mt-0.5">
                            •
                          </span>
                          <span className="text-muted-foreground">
                            <strong className="text-foreground">
                              Vision 2030:
                            </strong>{" "}
                            Economic stability improved significantly.
                          </span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-border/50 gap-0 py-4 bg-primary-foreground shadow-sm overflow-hidden">
                    <div className="h-1 bg-secondary w-full" />
                    <CardContent className="pt-4 md:pt-5 p-4 md:p-6">
                      <div className="flex items-center gap-2 mb-3 md:mb-4">
                        <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-secondary" />
                        <h4 className="font-bold text-foreground uppercase tracking-tight text-xs md:text-sm">
                          Notable Periods
                        </h4>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between items-start gap-4">
                          <div className="min-w-0">
                            <p className="font-bold text-[10px] md:text-xs text-foreground uppercase tracking-wider mb-1">
                              2008-2009
                            </p>
                            <p className="text-[10px] md:text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                              Financial crisis volatility
                            </p>
                          </div>
                          <div className="min-w-0 text-right">
                            <p className="font-bold text-[10px] md:text-xs text-foreground uppercase tracking-wider mb-1">
                              2016-17
                            </p>
                            <p className="text-[10px] md:text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                              VAT introduction effects
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-between items-start gap-4">
                          <div className="min-w-0">
                            <p className="font-bold text-[10px] md:text-xs text-foreground uppercase tracking-wider mb-1">
                              2020
                            </p>
                            <p className="text-[10px] md:text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                              COVID-19 oil volatility
                            </p>
                          </div>
                          <div className="min-w-0 text-right">
                            <p className="font-bold text-[10px] md:text-xs text-foreground uppercase tracking-wider mb-1">
                              2022-24
                            </p>
                            <p className="text-[10px] md:text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                              Stable post-pandemic recovery
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

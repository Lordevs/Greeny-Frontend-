"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, AlertTriangle, Bot } from "lucide-react";
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
import { getFileIcon } from "@/lib/chat-utils";

interface ChatResponseProps {
  userMessage?: string;
  userFile?: File | null;
  title: string;
  description: string;
  trendData: any[];
  indexData: any[];
}

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
          <div className="bg-secondary text-primary-foreground p-4 md:p-5 rounded-2xl rounded-tr-none shadow-lg max-w-[95%] md:max-w-[70%] text-sm md:text-base leading-relaxed animate-in zoom-in-95 duration-300 wrap-break-word whitespace-pre-wrap flex flex-col gap-3">
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
              <p className="text-base md:text-lg text-primary-foreground leading-relaxed mb-6 md:mb-8 wrap-break-word whitespace-pre-wrap">
                {description}
              </p>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
                <Card className="shadow-sm bg-primary-foreground border-border/50 hover:shadow-md transition-shadow overflow-hidden">
                  <CardHeader className="pb-3 md:pb-4 p-4 md:p-6">
                    <CardTitle className="text-xs md:text-sm font-semibold text-destructive uppercase tracking-wider">
                      Consumer Price Index Trend
                    </CardTitle>
                    <p className="text-[10px] md:text-xs text-muted-foreground">
                      Trade Balance vs. Current Account Balance, 2000-2024
                    </p>
                  </CardHeader>
                  <CardContent className="p-3 md:p-6 pt-0 md:pt-0">
                    <div className="h-40 md:h-52 w-full">
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
                            tick={{ fontSize: 9, fill: "#888" }}
                            axisLine={{ stroke: "#eee" }}
                            tickLine={false}
                          />
                          <YAxis
                            tick={{ fontSize: 9, fill: "#888" }}
                            axisLine={{ stroke: "#eee" }}
                            tickLine={false}
                          />
                          <Tooltip
                            contentStyle={{
                              borderRadius: "8px",
                              border: "none",
                              fontSize: "12px",
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

                <Card className="shadow-sm border-border/50 bg-primary-foreground hover:shadow-md transition-shadow overflow-hidden">
                  <CardHeader className="pb-3 md:pb-4 p-4 md:p-6">
                    <CardTitle className="text-xs md:text-sm font-semibold text-blue-600/80 uppercase tracking-wider">
                      CPI Index
                    </CardTitle>
                    <p className="text-[10px] md:text-xs text-muted-foreground">
                      Saudi Arabia CPI Index (2010=100) by Year
                    </p>
                  </CardHeader>
                  <CardContent className="p-3 md:p-6 pt-0 md:pt-0">
                    <div className="h-40 md:h-52 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={indexData}>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#f0f0f0"
                            vertical={false}
                          />
                          <XAxis
                            dataKey="year"
                            tick={{ fontSize: 9, fill: "#888" }}
                            axisLine={{ stroke: "#eee" }}
                            tickLine={false}
                          />
                          <YAxis
                            tick={{ fontSize: 9, fill: "#888" }}
                            axisLine={{ stroke: "#eee" }}
                            tickLine={false}
                          />
                          <Tooltip
                            contentStyle={{
                              borderRadius: "8px",
                              border: "none",
                              fontSize: "12px",
                              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                            }}
                          />
                          <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#3b82f6"
                            strokeWidth={2.5}
                            dot={{
                              fill: "#3b82f6",
                              r: 3,
                              strokeWidth: 2,
                              stroke: "#fff",
                            }}
                            activeDot={{ r: 5, strokeWidth: 0 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Key Findings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <Card className="border-border/50 bg-primary-foreground shadow-sm overflow-hidden">
                  <div className="h-1 bg-primary w-full" />
                  <CardContent className="pt-4 md:pt-5 p-4 md:p-6">
                    <div className="flex items-center gap-2 mb-3 md:mb-4">
                      <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                      <h4 className="font-bold text-foreground uppercase tracking-tight text-xs md:text-sm">
                        Key Findings
                      </h4>
                    </div>
                    <ul className="space-y-2 md:space-y-3 text-xs md:text-sm">
                      <li className="flex gap-2 md:gap-3">
                        <span className="text-primary font-bold mt-0.5">•</span>
                        <span className="text-muted-foreground focus:text-foreground transition-colors">
                          <strong className="text-foreground">
                            2008 Crisis:
                          </strong>{" "}
                          Inflation peaked at 11.1% globally.
                        </span>
                      </li>
                      <li className="flex gap-2 md:gap-3">
                        <span className="text-primary font-bold mt-0.5">•</span>
                        <span className="text-muted-foreground">
                          <strong className="text-foreground">
                            Oil Correlation:
                          </strong>{" "}
                          Closely follows global oil movements.
                        </span>
                      </li>
                      <li className="flex gap-2 md:gap-3">
                        <span className="text-primary font-bold mt-0.5">•</span>
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

                <Card className="border-border/50 bg-primary-foreground shadow-sm overflow-hidden">
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
          </div>
        </div>
      </div>
    </div>
  );
};

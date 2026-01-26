"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, AlertTriangle, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";

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
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import remarkBreaks from "remark-breaks";


interface ChatResponseProps {
  userMessage?: string;
  userFile?: File | null;
  title: string;
  description: string;
  plotImage?: string; // base64
  isVisualization?: boolean;
  hadError?: boolean;
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
  plotImage,
  isVisualization,
  hadError,
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
              <div className="markdown-content text-primary-foreground/95 leading-relaxed overflow-x-hidden">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm, remarkBreaks]}
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    p: ({ node, ...props }) => <p className="mb-4 last:mb-0 text-base md:text-xl font-medium" {...props} />,
                    h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mb-4 mt-8 text-primary-foreground first:mt-0" {...props} />,
                    h2: ({ node, ...props }) => <h2 className="text-xl font-bold mb-3 mt-6 text-primary-foreground border-b border-primary-foreground/10 pb-2 first:mt-0" {...props} />,
                    h3: ({ node, ...props }) => <h3 className="text-lg font-bold mb-2 mt-4 text-primary-foreground first:mt-0" {...props} />,
                    ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-4 space-y-1" {...props} />,
                    ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-4 space-y-1" {...props} />,
                    li: ({ node, ...props }) => <li className="mb-1 text-base md:text-lg" {...props} />,
                    blockquote: ({ node, ...props }) => (
                      <blockquote className="border-l-4 border-primary-foreground/30 pl-4 py-1 my-4 italic bg-white/5 rounded-r-lg" {...props} />
                    ),
                    table: ({ node, ...props }) => (
                      <div className="overflow-x-auto my-6 rounded-xl border border-primary-foreground/10 bg-white/5">
                        <table className="w-full border-collapse text-sm md:text-base text-left" {...props} />
                      </div>
                    ),
                    thead: ({ node, ...props }) => <thead className="bg-primary-foreground/10" {...props} />,
                    th: ({ node, ...props }) => <th className="p-3 font-bold border-b border-primary-foreground/10" {...props} />,
                    td: ({ node, ...props }) => <td className="p-3 border-b border-primary-foreground/5" {...props} />,
                    code: ({ node, inline, className, children, ...props }: any) => {
                      const [copied, setCopied] = useState(false);
                      const [showMore, setShowMore] = useState(false);
                      const content = String(children).replace(/\n$/, "");

                      const handleCopy = () => {
                        navigator.clipboard.writeText(content);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      };

                      if (inline) {
                        return (
                          <code className="bg-primary-foreground/15 px-1.5 py-0.5 rounded-md font-mono text-[0.85em] font-semibold text-primary-foreground">
                            {children}
                          </code>
                        );
                      }


                      if (content.trim().startsWith("{") && content.trim().endsWith("}")) {
                        try {
                          const formatVal = (v: string) => {
                            if (!v) return "";
                            return v
                              .replace(/np\.\w+\((.*?)\)/g, "$1") // Handle numpy types (e.g. np.int64(10)) -> 10
                              .replace(/Timestamp\(['"]?(.*?)['"]?\)/g, "$1") // Handle pandas timestamps
                              .replace(/['"()](.*?)['"()]/g, "$1") // Handle general quoted strings
                              .replace(/[{}()'"[\]]+/g, "") // Clean remaining punctuation
                              .replace(/^[,\s]+|[,\s]+$/g, "") // Clean leading/trailing commas
                              .trim();
                          };

                          const formatKey = (k: string) => {
                            return formatVal(k).replace(/_/g, " ");
                          };

                          const mainMetrics: Array<{ k: string; v: string }> = [];
                          const nestedMetrics: Array<{ k: string; items: Array<{ k: string; v: string }> }> = [];

                          // Helper to extract nested objects properly handling balanced braces and quotes
                          const extractKeyValuePairs = (str: string) => {
                            const pairs: Array<{ k: string; v: string }> = [];
                            let i = 0;
                            while (i < str.length) {
                              // 1. Skip whitespace, commas, and closing braces from previous iterations
                              while (i < str.length && /[\s,}]/.test(str[i])) i++;
                              if (i >= str.length) break;

                              // 2. Extract Key
                              let key = "";
                              let inQuote = false;
                              let quoteChar = "";
                              while (i < str.length) {
                                const char = str[i];
                                if (!inQuote && (char === "'" || char === '"')) {
                                  inQuote = true;
                                  quoteChar = char;
                                } else if (inQuote && char === quoteChar) {
                                  inQuote = false;
                                } else if (!inQuote && char === ":") {
                                  i++; // Step over colon
                                  break;
                                } else {
                                  key += char;
                                }
                                i++;
                              }

                              // 3. Extract Value (Handling nested structures)
                              let value = "";
                              let braceDepth = 0;
                              let bracketDepth = 0;
                              inQuote = false;
                              while (i < str.length) {
                                const char = str[i];
                                if ((char === "'" || char === '"') && str[i - 1] !== "\\") {
                                  inQuote = !inQuote;
                                }

                                if (!inQuote) {
                                  if (char === "{") braceDepth++;
                                  if (char === "}") braceDepth--;
                                  if (char === "[") bracketDepth++;
                                  if (char === "]") bracketDepth--;

                                  if (braceDepth === 0 && bracketDepth === -1) {
                                    // We hit a closing bracket for a list value
                                    break;
                                  }
                                  if (braceDepth === -1) {
                                    // We hit a closing brace for the parent object
                                    break;
                                  }
                                  if (braceDepth === 0 && bracketDepth === 0 && char === ",") {
                                    break;
                                  }
                                }
                                value += char;
                                i++;
                              }
                              if (key.trim()) pairs.push({ k: key.trim(), v: value.trim() });
                            }
                            return pairs;
                          };

                          const allPairs = extractKeyValuePairs(content.trim().slice(1, -1));


                          allPairs.forEach((pair) => {
                            const { k: key, v: rawValue } = pair;

                            if (rawValue.startsWith("{")) {
                              const items: Array<{ k: string; v: string }> = [];
                              const subPairs = extractKeyValuePairs(rawValue.slice(1, -1));

                              subPairs.forEach((sub) => {
                                if (sub.v.startsWith("{")) {
                                  // Two-level nesting (e.g., product_performance)
                                  const deepPairs = extractKeyValuePairs(sub.v.slice(1, -1));
                                  deepPairs.forEach((deep) => {
                                    items.push({
                                      k: `${formatVal(deep.k)} (${formatVal(sub.k)})`,
                                      v: formatVal(deep.v),
                                    });
                                  });
                                } else {
                                  // Single-level nesting
                                  items.push({ k: formatVal(sub.k), v: formatVal(sub.v) });
                                }
                              });

                              if (items.length > 0) {
                                nestedMetrics.push({ k: formatVal(key), items });
                              }
                            } else if (!rawValue.startsWith("[")) {
                              mainMetrics.push({ k: formatVal(key), v: formatVal(rawValue) });
                            }
                          });

                          if (mainMetrics.length > 0 || nestedMetrics.length > 0) {
                            return (
                              <div className="my-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
                                <div className="flex items-center gap-2 mb-4">
                                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                                  <span className="text-[10px] font-bold text-white/90 uppercase tracking-[0.2em]">Analytical Foundations</span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {mainMetrics.length > 0 && (
                                    <Card className="col-span-full bg-white/3 border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl">
                                      <h4 className="text-xs font-bold text-white/90 uppercase tracking-widest mb-6">Key Metrics Indicators</h4>
                                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 gap-x-4">
                                        {mainMetrics.map((m, idx) => (
                                          <div key={idx} className="flex flex-col gap-1.5">
                                            <span className="text-[10px] text-white/90 uppercase font-bold tracking-tight">
                                              {formatKey(m.k)}
                                            </span>
                                            <span className="text-xl md:text-2xl font-black text-primary-foreground tracking-tighter truncate">
                                              {m.v}
                                            </span>
                                          </div>
                                        ))}
                                      </div>
                                    </Card>
                                  )}

                                  {nestedMetrics.map((seg, idx) => (
                                    <div key={idx} className="bg-white/2 border border-white/5 rounded-2xl p-6 hover:bg-white/4 transition-all border-l-2 border-l-emerald-500/30 shadow-lg">
                                      <h4 className="text-[10px] font-bold text-white/90 mb-5 uppercase tracking-[0.2em]">{formatKey(seg.k)}</h4>
                                      <div className="space-y-3">
                                        {seg.items.slice(0, 15).map((p, i) => (

                                          <div key={i} className="flex justify-between items-center group/item">
                                            <span className="text-sm text-white/90 group-hover/item:text-white/60 transition-colors uppercase font-medium truncate mr-2">
                                              {formatVal(p.k)}
                                            </span>
                                            <span className="text-sm font-bold text-primary-foreground shrink-0">{p.v}</span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  ))}
                                </div>

                                <div className="mt-8 flex flex-col items-center gap-4">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setShowMore(!showMore)}
                                    className="text-[10px] font-bold text-white/75 hover:text-white/50 uppercase tracking-[0.3em]"
                                  >
                                    {showMore ? "Hide Raw Data Structures" : "View Raw Data Structures"}
                                  </Button>

                                  {showMore && (
                                    <pre className="w-full mt-4 p-6 bg-black/60 rounded-3xl font-mono text-xs text-emerald-500/40 border border-white/5 overflow-x-auto shadow-inner animate-in zoom-in-95 duration-300">
                                      {content}
                                    </pre>
                                  )}
                                </div>
                              </div>
                            );
                          }
                        } catch (e) {
                          console.warn("Custom data render failed, falling back to code block", e);
                        }
                      }



                      return (
                        <div className="my-6 relative bg-black/30 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden shadow-2xl group">
                          {/* Header */}
                          <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
                            <div className="flex gap-1.5">
                              <div className="w-2 h-2 rounded-full bg-red-400/50" />
                              <div className="w-2 h-2 rounded-full bg-amber-400/50" />
                              <div className="w-2 h-2 rounded-full bg-emerald-400/50" />
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={handleCopy}
                              className="h-6 px-2 text-[10px] font-bold text-white/40 hover:text-white hover:bg-white/10 transition-all uppercase tracking-wider"
                            >
                              {copied ? "Copied" : "Copy"}
                            </Button>
                          </div>

                          {/* Content */}
                          <div className="p-4 md:p-6 overflow-x-auto">
                            <pre className="m-0! p-0! bg-transparent! font-mono text-sm md:text-base leading-relaxed text-emerald-400/90 selection:bg-emerald-500/20">
                              <code className={className} {...props}>
                                {children}
                              </code>
                            </pre>
                          </div>

                        </div>
                      );
                    },

                  }}
                >
                  {description}
                </ReactMarkdown>
              </div>

            </div>

            {/* Visualization Section */}
            {isVisualization && plotImage && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-primary-foreground uppercase tracking-[0.2em]">
                    Visualization
                  </h4>
                  <div className="h-px flex-1 bg-white/10 mx-6 hidden md:block" />
                </div>
                <Card className="overflow-hidden border-none shadow-2xl bg-white/5 backdrop-blur-sm">
                  <img
                    src={`data:image/png;base64,${plotImage}`}
                    alt="Data Visualization"
                    className="w-full h-auto rounded-xl"
                  />
                </Card>
              </div>
            )}

            {hadError && (
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-xl flex items-start gap-3 text-destructive">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <div>
                  <h4 className="font-bold text-sm">Error during analysis</h4>
                  <p className="text-xs opacity-90">The agent encountered an issue while processing your request. See details above.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

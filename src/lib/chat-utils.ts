import {
  FileText,
  FileCode,
  FileImage,
  FileVideo,
  FileArchive,
  File as FileIcon,
  FileSpreadsheet,
} from "lucide-react";

export const getFileIcon = (fileName: string) => {
  const extension = fileName.split(".").pop()?.toLowerCase();

  switch (extension) {
    case "pdf":
      return {
        icon: FileText,
        color: "text-red-500",
        bgColor: "bg-red-500/10",
      };
    case "doc":
    case "docx":
      return {
        icon: FileText,
        color: "text-blue-500",
        bgColor: "bg-blue-500/10",
      };
    case "xls":
    case "xlsx":
    case "csv":


      return {
        icon: FileSpreadsheet,
        color: "text-emerald-500",
        bgColor: "bg-emerald-500/10",
      };
    case "png":
    case "jpg":
    case "jpeg":
    case "gif":
    case "svg":
    case "webp":
      return {
        icon: FileImage,
        color: "text-purple-500",
        bgColor: "bg-purple-500/10",
      };
    case "zip":
    case "rar":
    case "7z":
      return {
        icon: FileArchive,
        color: "text-orange-500",
        bgColor: "bg-orange-500/10",
      };
    default:
      return {
        icon: FileIcon,
        color: "text-gray-500",
        bgColor: "bg-gray-500/10",
      };
  }
};

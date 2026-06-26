import path from "node:path";
import type { ReferenceFile } from "./types.js";

const generatedImageExtensions = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif"]);
const rasterReferenceExtensions = new Set([".png", ".jpg", ".jpeg", ".webp"]);
const previewableReferenceExtensions = new Set([...generatedImageExtensions, ".svg"]);
const textReferenceExtensions = new Set([
  ".txt",
  ".md",
  ".markdown",
  ".csv",
  ".tsv",
  ".json",
  ".jsonl",
  ".html",
  ".htm",
  ".css",
  ".xml",
  ".yaml",
  ".yml"
]);
const documentReferenceExtensions = new Set([
  ".pdf",
  ".rtf",
  ".doc",
  ".docx",
  ".ppt",
  ".pptx",
  ".xls",
  ".xlsx"
]);
const designReferenceExtensions = new Set([".ai", ".eps", ".psd", ".fig", ".sketch"]);
const supportedReferenceExtensions = new Set([
  ...previewableReferenceExtensions,
  ...textReferenceExtensions,
  ...documentReferenceExtensions,
  ...designReferenceExtensions
]);

export function isGeneratedImagePath(filePath: string): boolean {
  return generatedImageExtensions.has(path.extname(filePath).toLowerCase());
}

export function isPreviewableReferenceFile(filePath: string): boolean {
  return previewableReferenceExtensions.has(path.extname(filePath).toLowerCase());
}

export function isRasterReferenceFile(filePath: string): boolean {
  return rasterReferenceExtensions.has(path.extname(filePath).toLowerCase());
}

export function isSvgReferenceFile(filePath: string): boolean {
  return path.extname(filePath).toLowerCase() === ".svg";
}

export function isTextReferenceFile(filePath: string): boolean {
  return textReferenceExtensions.has(path.extname(filePath).toLowerCase());
}

export function isSupportedReferenceFile(filePath: string): boolean {
  return supportedReferenceExtensions.has(path.extname(filePath).toLowerCase());
}

export function isOpenAiRasterReferenceFile(referenceFile: ReferenceFile): boolean {
  return ["image/png", "image/jpeg", "image/webp"].includes(referenceFile.mimeType) && isRasterReferenceFile(referenceFile.path);
}

export function canPrepareOpenAiImageReference(referenceFile: ReferenceFile): boolean {
  return isOpenAiRasterReferenceFile(referenceFile) || isSvgReferenceFile(referenceFile.path);
}

export function mimeTypeForReferenceFile(filePath: string): string {
  const extension = path.extname(filePath).toLowerCase();
  if (extension === ".png") return "image/png";
  if (extension === ".jpg" || extension === ".jpeg") return "image/jpeg";
  if (extension === ".webp") return "image/webp";
  if (extension === ".gif") return "image/gif";
  if (extension === ".svg") return "image/svg+xml";
  if (extension === ".pdf") return "application/pdf";
  if (extension === ".txt") return "text/plain";
  if (extension === ".md" || extension === ".markdown") return "text/markdown";
  if (extension === ".csv") return "text/csv";
  if (extension === ".tsv") return "text/tab-separated-values";
  if (extension === ".json") return "application/json";
  if (extension === ".jsonl") return "application/x-ndjson";
  if (extension === ".html" || extension === ".htm") return "text/html";
  if (extension === ".css") return "text/css";
  if (extension === ".xml") return "application/xml";
  if (extension === ".yaml" || extension === ".yml") return "application/yaml";
  if (extension === ".rtf") return "application/rtf";
  if (extension === ".doc") return "application/msword";
  if (extension === ".docx") return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  if (extension === ".ppt") return "application/vnd.ms-powerpoint";
  if (extension === ".pptx") return "application/vnd.openxmlformats-officedocument.presentationml.presentation";
  if (extension === ".xls") return "application/vnd.ms-excel";
  if (extension === ".xlsx") return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  if (extension === ".ai" || extension === ".eps") return "application/postscript";
  if (extension === ".psd") return "image/vnd.adobe.photoshop";
  return "application/octet-stream";
}

export function referenceFileTypeLabel(referenceFile: Pick<ReferenceFile, "path" | "mimeType">): string {
  const extension = path.extname(referenceFile.path).replace(".", "").toUpperCase();
  if (extension) return extension;
  if (referenceFile.mimeType.startsWith("image/")) return "Image";
  if (referenceFile.mimeType.startsWith("text/")) return "Text";
  if (referenceFile.mimeType === "application/pdf") return "PDF";
  return "Document";
}

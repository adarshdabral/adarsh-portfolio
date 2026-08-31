import { Download } from "lucide-react";
import socialLinks from "@/content/social-links.json";

export default function ResumeView() {
  const { resumeUrl } = socialLinks;

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-2 dark:border-neutral-800">
        <p className="font-pixel text-[10px] text-neutral-500">Resume.pdf</p>
        <a
          href={resumeUrl}
          download
          className="flex items-center gap-1.5 rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-blue-700"
        >
          <Download className="h-3.5 w-3.5" />
          Download
        </a>
      </div>
      <iframe
        src={resumeUrl}
        title="Resume preview"
        className="flex-1 bg-neutral-100 dark:bg-neutral-950"
      />
    </div>
  );
}

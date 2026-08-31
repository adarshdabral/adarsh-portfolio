export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string | null;
  highlights: string[];
}

export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string | null;
  honors: string[];
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface SocialLink {
  id: string;
  label: string;
  url: string;
  icon:
    | "github"
    | "linkedin"
    | "twitter"
    | "instagram"
    | "youtube"
    | "leetcode"
    | "book"
    | "journal";
  /** Defaults to true when absent — lets a link be hidden without losing its URL. */
  visible?: boolean;
}

export interface SocialLinksContent {
  email: string;
  resumeUrl: string;
  links: SocialLink[];
}

export interface IconVisibilityContent {
  /** AppId -> visible. A missing key defaults to visible. */
  apps: Record<string, boolean>;
}

export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  spotifyUrl: string;
}

export interface MusicContent {
  tracks: MusicTrack[];
}

export interface GalleryImage {
  id: string;
  src: string;
  caption: string;
}

export interface GalleryContent {
  images: GalleryImage[];
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  problem: string;
  stack: string[];
  screenshots: string[];
  liveUrl: string | null;
  repoUrl: string | null;
}

export interface ResearchPaper {
  id: string;
  title: string;
  venue: string;
  date: string;
  coAuthors: string[];
  abstract: string;
  doiUrl: string | null;
  pdfUrl: string | null;
}

export interface AuthoredBook {
  title: string;
  coverImage: string | null;
  description: string;
  publisher: string;
  buyUrl: string | null;
  excerpt: string;
}

export interface JournalEntryMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
}

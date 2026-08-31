import type { ComponentType } from "react";

import {
  BookGlyph,
  GithubGlyph,
  InstagramGlyph,
  JournalGlyph,
  LeetcodeGlyph,
  LinkedinGlyph,
  TwitterXGlyph,
  YoutubeGlyph,
} from "@/components/os/icons/BrandIcons";
import type { SocialLink } from "./content-types";

export const SOCIAL_ICONS: Record<
  SocialLink["icon"],
  ComponentType<{ className?: string }>
> = {
  github: GithubGlyph,
  linkedin: LinkedinGlyph,
  twitter: TwitterXGlyph,
  instagram: InstagramGlyph,
  youtube: YoutubeGlyph,
  leetcode: LeetcodeGlyph,
  book: BookGlyph,
  journal: JournalGlyph,
};

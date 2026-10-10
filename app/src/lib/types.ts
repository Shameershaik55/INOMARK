export type UserRole = 'creator' | 'brand';

export interface UserProfile {
  id: string;
  email: string;
  role: UserRole;
  full_name: string;
  created_at: string;
  updated_at: string;
}

export interface CreatorProfile {
  id: string;
  user_id: string;
  display_name: string;
  headline: string;
  bio: string;
  avatar_url: string | null;
  location: string | null;
  specializations: string[];
  content_types: string[];
  ai_tools: string[];
  skills: string[];
  visual_styles: string[];
  industries: string[];
  content_formats: string[];
  languages: string[];
  availability: string | null;
  portfolio_url: string | null;
  website_url: string | null;
  social_links: Record<string, string>;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface BrandProfile {
  id: string;
  user_id: string;
  company_name: string;
  logo_url: string | null;
  cover_url: string | null;
  industry: string;
  business_type: string;
  tagline: string | null;
  website: string | null;
  location: string | null;
  about: string | null;
  creative_preferences: string[];
  brand_guidelines_url: string | null;
  contact_email: string | null;
  contact_visible: boolean;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface PortfolioProject {
  id: string;
  creator_id: string;
  title: string;
  description: string;
  cover_url?: string | null;
  media_urls?: string[];
  media_url?: string;
  media_type?: 'image' | 'video' | string;
  content_type?: string;
  category?: string;
  aspect_ratio?: string;
  ai_tools?: string[];
  tools_used?: string[];
  skills?: string[];
  industry?: string | null;
  external_url?: string | null;
  format?: string | null;
  is_published?: boolean;
  is_featured?: boolean;
  created_at: string;
  updated_at?: string;
}

export interface Brief {
  id: string;
  brand_id: string;
  title: string;
  objective?: string;
  description: string;
  industry: string;
  target_audience?: string | null;
  content_types?: string[];
  deliverables?: BriefDeliverable[];
  creative_direction?: string | null;
  key_message?: string | null;
  call_to_action?: string | null;
  brand_guidelines?: string | null;
  required_elements?: string | null;
  elements_to_avoid?: string | null;
  target_platforms?: string[];
  aspect_ratio?: string | null;
  technical_specs?: Record<string, string>;
  category?: string;
  desired_style?: string | null;
  preferred_tools?: string[];
  start_date?: string | null;
  deadline?: string | null;
  timeline?: string;
  milestones?: BriefMilestone[];
  budget_type?: 'fixed' | 'range' | 'open' | 'discuss';
  budget_min?: number | null;
  budget_max?: number | null;
  currency?: string;
  budget_notes?: string | null;
  usage_rights?: string | null;
  licensing_duration?: string | null;
  geographic_territory?: string | null;
  exclusivity?: boolean;
  ai_disclosure?: string | null;
  desired_skills?: string[];
  desired_specialization?: string | null;
  language_requirements?: string[];
  application_questions?: string[];
  status?: 'draft' | 'published' | 'closed' | 'active' | 'open' | 'review' | 'completed';
  created_at: string;
  updated_at: string;
  // Joined data
  brand?: BrandProfile;
  application_count?: number;
  applications_count?: number;
}

export interface BriefDeliverable {
  id?: string;
  type?: string;
  title?: string;
  quantity?: number;
  description?: string;
}

export interface BriefMilestone {
  id?: string;
  title: string;
  date?: string;
  due_date?: string;
  payout_percentage?: number;
  description?: string;
}

export type BriefApplication = Application;

export interface Application {
  id: string;
  brief_id: string;
  creator_id: string;
  proposal?: string;
  pitch?: string;
  pitch_text?: string;
  proposed_rate?: number;
  proposed_fee?: number;
  bid_amount?: number;
  estimated_delivery_days?: number;
  estimated_timeline?: string;
  portfolio_project_ids?: string[];
  portfolio_sample_ids?: string[];
  answers?: Record<string, string>;
  status: 'new' | 'in_review' | 'accepted' | 'declined' | 'shortlisted' | 'under_review' | 'submitted' | 'review' | 'rejected';
  created_at: string;
  updated_at: string;
  // Joined data
  brief?: Brief;
  creator?: CreatorProfile;
  portfolio_projects?: PortfolioProject[];
}

export interface SavedCreator {
  id: string;
  brand_id: string;
  creator_id: string;
  created_at: string;
  // Joined data
  creator?: CreatorProfile;
}

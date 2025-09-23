// TypeScript interfaces for the Internship Management System

export type InternshipStatus = 
  | 'SEARCHING' 
  | 'SUBMITTED' 
  | 'ACCEPTED' 
  | 'REJECTED' 
  | 'JOURNAL_SUBMITTED' 
  | 'VALIDATED' 
  | 'INVALIDATED' 
  | 'ARCHIVED';

export type CommentAuthor = 'Company' | 'Coordinator';

export interface Period {
  startDate: string; // ISO date string, e.g., "2025-09-20"
  endDate: string;
}

export interface Comment {
  id: string;
  author: CommentAuthor;
  text: string;
  createdAt: string;
}

export interface InternshipWeekView {
  id: string;
  period: Period;
  description: string;
  workingHours: number;
  comments: Comment[];
}

export interface InternshipView {
  id: string;
  status: InternshipStatus;
  studentView: StudentView
  companyView: CompanyView | null;
  coordinatorView: CoordinatorView | null;
  period: Period | null;
}

export interface StudentView {
  id: string;
  index: string;
  name: string
}

export interface CompanyView {
  id: string;
  name: string
}

export interface CoordinatorView {
  id: string;
  name: string;
}

export interface InternshipDetailsView extends InternshipView {
  description: string;
  companyContactEmail: string;
  weeklyHours: number;
  weeks: InternshipWeekView[];
}

export interface CreateInternshipWeekPayload {
  internshipId: string;
  fromDate: string;     // ISO date string
  toDate: string;       // ISO date string
  description: string;
  workingWeeklyHours: number;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export type UserRole = 'Student' | 'Company' | 'Coordinator';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
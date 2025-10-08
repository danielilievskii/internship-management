// TypeScript interfaces for the Internship Management System

export type InternshipStatus = 
  | 'SEARCHING' 
  | 'SUBMITTED' 
  | 'ACCEPTED' 
  | 'REJECTED' 
  | 'JOURNAL_SUBMITTED' 
  | 'VALIDATED_BY_COMPANY'
  | 'VALIDATED_BY_COORDINATOR'
  | 'ARCHIVED';

export type CommentAuthor = 'Company' | 'Coordinator';

export interface Period {
  fromDate: string; // ISO date string, e.g., "2025-09-20"
  toDate: string;
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
  companyComment: string;
  coordinatorComment: string;
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
  email: string;
  credits: string
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

export interface InternshipStatusChangeView {
  id: string;
  internshipId: string;
  previousStatus: string
  newStatus: string;
  changedAt: string;
}

export interface CreateInternshipWeekPayload {
  internshipId: string;
  fromDate: string;
  toDate: string;
  description: string;
  workingHours: number;
}

export interface EditInternshipWeekPayload {
  internshipId: string;
  weekId: string;
  fromDate: string;
  toDate: string;
  description: string;
  workingHours: number;
}

export interface AddWeekCommentPayload {
  internshipId: string;
  weekId: string;
  comment: string;
}

export interface SubmitInternshipCommandPayload {
  internshipId: String;
  description: String;
  fromDate: String;
  toDate: String;
  weeklyHours: number;
  contactEmail: String;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export type UserRole = 'Student' | 'Company' | 'Coordinator' | 'Admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface StudentSnapshot {
  id: string,
  index: string,
  name: string,
  email: string,
  credits: number,
}
import { create } from 'zustand';
import { InternshipView, PaginatedResponse } from '@/types/internship.ts';

interface InternshipState {
  internships: InternshipView[];
  totalPages: number;
  currentPage: number;
  pageSize: number;
  loading: boolean;
  filters: {
    studentSearch: string;
    coordinatorSearch: string;
    companyFilter: string;
    statusFilter: string;
  };
  setInternships: (data: PaginatedResponse<InternshipView>) => void;
  setFilters: (filters: Partial<InternshipState['filters']>) => void;
  setCurrentPage: (page: number) => void;
  setLoading: (loading: boolean) => void;
}

export const useInternshipStore = create<InternshipState>((set) => ({
  internships: [],
  totalPages: 0,
  currentPage: 0,
  pageSize: 5,
  loading: false,
  filters: {
    studentSearch: '',
    coordinatorSearch: '',
    companyFilter: '',
    statusFilter: '',
  },
  setInternships: (data) => set({
    internships: data.content,
    totalPages: data.totalPages,
    currentPage: data.number,
  }),
  setFilters: (newFilters) => set((state) => ({
    filters: { ...state.filters, ...newFilters }
  })),
  setCurrentPage: (page) => set({ currentPage: page }),
  setLoading: (loading) => set({ loading }),
}));
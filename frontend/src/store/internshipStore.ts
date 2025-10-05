import { create } from 'zustand';
import { InternshipView, PaginatedResponse } from '@/types/internship.ts';

export interface InternshipState {
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
  setInternships: (data: InternshipView[]) => void;
  setFilters: (filters: Partial<InternshipState['filters']>) => void;
  resetFilters: () => void;
  setCurrentPage: (page: number) => void;
  setTotalPages: (page: number) => void;
  setPageSize: (page: number) => void;
  setLoading: (loading: boolean) => void;
}

export const useInternshipStore = create<InternshipState>((set) => ({
  internships: [],
  totalPages: 0,
  currentPage: 1,
  pageSize: 5,
  loading: false,
  filters: {
    studentSearch: '',
    coordinatorSearch: '',
    companyFilter: '',
    statusFilter: '',
  },
  setInternships: (internships) => set({
    internships: internships,
  }),
  setFilters: (newFilters) => set((state) => ({
    filters: { ...state.filters, ...newFilters }
  })),
  resetFilters: () => set({
    filters: {
      studentSearch: '',
      coordinatorSearch: '',
      companyFilter: '',
      statusFilter: '',
    },
  }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setTotalPages: (page) => set({ totalPages: page }),
  setPageSize: (page) => set({ pageSize: page }),
  setLoading: (loading) => set({ loading }),
}));
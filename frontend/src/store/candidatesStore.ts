import { create } from 'zustand';
import { InternshipView, PaginatedResponse } from '@/types/internship.ts';

export interface CandidateState {
  candidates: InternshipView[];
  totalPages: number;
  currentPage: number;
  pageSize: number;
  loading: boolean;
  filters: {
    studentSearch: string;
  };
  setCandidates: (data: InternshipView[]) => void;
  setFilters: (filters: Partial<CandidateState['filters']>) => void;
  resetFilters: () => void;
  setCurrentPage: (page: number) => void;
  setTotalPages: (page: number) => void;
  setPageSize: (page: number) => void;
  setLoading: (loading: boolean) => void;
}

export const useCandidateStore = create<CandidateState>((set) => ({
  candidates: [],
  totalPages: 0,
  currentPage: 1,
  pageSize: 10,
  loading: true,
  filters: {
    studentSearch: '',
  },
  setCandidates: (candidates) => set({
    candidates: candidates,
  }),
  setFilters: (newFilters) => set((state) => ({
    filters: { ...state.filters, ...newFilters },
    currentPage: 1
  })),
  resetFilters: () => set({
    filters: {
      studentSearch: '',
    },
    currentPage: 1
  }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setTotalPages: (page) => set({ totalPages: page }),
  setPageSize: (page) => set({ pageSize: page }),
  setLoading: (loading) => set({ loading }),
}));
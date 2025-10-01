import axios from 'axios';
import {
  InternshipView,
  InternshipDetailsView,
  PaginatedResponse,
  CreateInternshipWeekPayload,
  StudentSnapshot
} from '@/types/internship.ts';
import {mapApiInternship, mapPaginatedResponse} from "@/services/mappers/internshipMapper.ts";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  // headers: {
  //   'Content-Type': 'application/json',
  // },
});

// Add request interceptor for authentication
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (config.data instanceof FormData) {
    delete config.headers['Content-Type'];
  }
  else if (
      config.data &&
      typeof config.data === 'object' &&
      !(config.data instanceof Blob) &&
      !(config.data instanceof ArrayBuffer)
  ) {
    config.headers['Content-Type'] = 'application/json';
  }
  return config;
});

export const internshipApi = {

  getInternships: async (
    page: number = 0,
    size: number = 5,
    filters?: {
      studentSearch?: string;
      coordinatorSearch?: string;
      companyFilter?: string;
      statusFilter?: string;
    }
  ): Promise<PaginatedResponse<InternshipView>> => {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
    });

    if (filters?.studentSearch) params.append('studentSearch', filters.studentSearch);
    if (filters?.coordinatorSearch) params.append('coordinatorSearch', filters.coordinatorSearch);
    if (filters?.companyFilter) params.append('companyFilter', filters.companyFilter);
    if (filters?.statusFilter) params.append('statusFilter', filters.statusFilter);

    // TODO: Check if its /internships/paginated or if its ok
    const response = await api.get(`/internships?${params}`);
    return mapPaginatedResponse(response.data, mapApiInternship);
  },

  submitCV: async (payload: File): Promise<void> => {
    const formData = new FormData()
    formData.append("studentCV", payload)
    await api.post(`/student/submitCommand/CreateSearchingInternship`, formData)
  },

  // Get internship details
  getInternshipDetails: async (internshipId: string): Promise<InternshipDetailsView> => {
    const response = await api.get(`/internships/${internshipId}`);
    return response.data;
  },

  // Create new week entry
  createWeekEntry: async (payload: CreateInternshipWeekPayload): Promise<void> => {
    await api.post('/internships/weeks', payload);
  },

  // View CV
  viewCV: async (internshipId: string): Promise<Blob> => {
    const response = await api.get(`/internships/${internshipId}/view-cv`, {
      responseType: 'blob',
    });
    return response.data;
  },

  // Update internship status
  updateStatus: async (internshipId: string, status: string): Promise<void> => {
    await api.put(`/internships/${internshipId}/status`, { status });
  },

  deleteSearchingInternship: async (): Promise<void> => {
    await api.delete(`/student/submitCommand/DeleteSearchingInternship`);
  },

  getStudentInternships: async (page = 0, size = 5): Promise<PaginatedResponse<InternshipDetailsView>> => {
    const response = await api.get(`/student/internships/myInternships?page=${page}&size=${size}`);
    console.log(response.data)
    return response.data
  },

  getCV: async (): Promise<File> => {
    const response = await api.get(`/student/internships/cv`, {
      responseType: 'blob',
    });
    return response.data
  }
};

export default api;
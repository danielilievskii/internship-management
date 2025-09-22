import axios from 'axios';
import { 
  InternshipView, 
  InternshipDetailsView, 
  PaginatedResponse, 
  CreateInternshipWeekPayload 
} from '@/types/internship.ts';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const internshipApi = {
  // Get paginated internships
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

    const response = await api.get(`/internships/paginated?${params}`);
    return response.data;
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

  // Delete internship
  deleteInternship: async (internshipId: string): Promise<void> => {
    await api.delete(`/internships/${internshipId}`);
  },
};

export default api;
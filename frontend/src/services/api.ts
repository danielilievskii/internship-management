import axios from 'axios';
import {
  InternshipView,
  InternshipDetailsView,
  PaginatedResponse, InternshipStatusChangeView,

} from '@/types/internship.ts';
import {
  mapApiInternship,
  mapApiInternshipDetails,
  mapApiInternshipStatusChange,
  mapPaginatedResponse
} from "@/services/mappers/internshipMapper.ts";

export const api = axios.create({
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

  getInternships: async (): Promise<InternshipView[]> => {
    return await api.get(`/internships`)
      .then(response =>
        response.data.map(item => mapApiInternship(item))
      );
  },

  getInternshipDetails: async (internshipId: string): Promise<InternshipDetailsView> => {
    const response = await api.get(`/internships/${internshipId}`);
    return mapApiInternshipDetails(response.data);
  },

  getInternshipStatusChanges: async (internshipId: string): Promise<InternshipStatusChangeView[]> => {
    return await api.get(`/internships/${internshipId}/status-changes`)
      .then(response =>
        response.data.map(item => mapApiInternshipStatusChange(item))
      );
  },

  // View CV
  viewCV: async (internshipId: string): Promise<Blob> => {
    const response = await api.get(`/internships/${internshipId}/view-cv`, {
      responseType: 'blob',
    });
    return response.data;
  },
};

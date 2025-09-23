import axios from 'axios';
import { 
  InternshipView, 
  InternshipDetailsView, 
  PaginatedResponse, 
  CreateInternshipWeekPayload 
} from '@/types/internship.ts';
import {mapApiInternship, mapPaginatedResponse} from "@/services/mappers/internshipMapper.ts";

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
  config.headers.Authorization = `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJKV0lUdWpaWDctZUtVaXdJVUJyT3l2U0VYeWtNX0VnendHSVRCSFZGVXA0In0.eyJleHAiOjE3NTg2MzcwMTYsImlhdCI6MTc1ODYzNjcxNiwianRpIjoiNzQ4NWIzODItOGI3Yy00OGY4LWE5NTktMGM0ZGI2MzI0MDg5IiwiaXNzIjoiaHR0cDovL2tleWNsb2FrOjgwODAvcmVhbG1zL2ZpbmtpLXNlcnZpY2VzIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6ImRlYTJiMWQzLWY1NmEtNDg0ZC1hMjUyLTc1NjAxOTQxMTEwOSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImFwaS1nYXRld2F5Iiwic2Vzc2lvbl9zdGF0ZSI6Ijg3NmY1N2E4LWM4OGMtNGM3Mi1iM2NhLTc3ZjFmNDM5OTA2OCIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbInByb2Zlc3NvciIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJkZWZhdWx0LXJvbGVzLWZpbmtpLXNlcnZpY2VzIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIHByb2Zlc3NvciIsInNpZCI6Ijg3NmY1N2E4LWM4OGMtNGM3Mi1iM2NhLTc3ZjFmNDM5OTA2OCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoiR2VvcmdpbmEgTWlyY2V2YSIsInByZWZlcnJlZF91c2VybmFtZSI6Imdlb3JnaW5hLm1pcmNldmEiLCJnaXZlbl9uYW1lIjoiR2VvcmdpbmEiLCJmYW1pbHlfbmFtZSI6Ik1pcmNldmEiLCJlbWFpbCI6Imdlb3JnaW5hLm1pcmNldmFAZW1haWwuY29tIn0.BMOlQWzEJyqLEQMO83O3dVUBMqPmxmjl1UvM0knKKBdjoO8BPYUuyrOrI_kSoK-lUxooP4IRxZCLjDmx3JZHmBNaCXeIX0IGX_OOAfM7RQ-2S8vSDOzXyyyZUxcBjGDIwMJl3VKcK-r6Z-cBwSCyYsPoHHoSwkpfNUyYFJVii7o_BN4v--Nht3WgkTSCwvawOxkfCcGq1dodCJtN7zyGjIg8VG8MHQDMhFavHN17ke5wAEQXxKg8XEKSiRPimxdvi4upDTpb71mw6srreoDK4CohcJIsD93ffsPvgwce77fM5Z-poa2DGCB4xeKGO-XzJWgoXosGqZyyn3o7GSYnuA`
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
    return mapPaginatedResponse(response.data, mapApiInternship);
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
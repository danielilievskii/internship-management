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
  config.headers.Authorization = `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJKV0lUdWpaWDctZUtVaXdJVUJyT3l2U0VYeWtNX0VnendHSVRCSFZGVXA0In0.eyJleHAiOjE3NTg2NDgxMzksImlhdCI6MTc1ODY0NzgzOSwianRpIjoiNGY3ODBlYWYtZDljMS00NjI5LWE4NGItNjQzZGI5Y2U2MDRjIiwiaXNzIjoiaHR0cDovL2tleWNsb2FrOjgwODAvcmVhbG1zL2ZpbmtpLXNlcnZpY2VzIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6ImU0OTU2MTRhLWZmMTYtNDE5MC04YmQ5LTQyM2I5NGVkMWI2NSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImFwaS1nYXRld2F5Iiwic2Vzc2lvbl9zdGF0ZSI6IjJlNzNiNTFiLTU1NjgtNGRjZC05MjYxLWNkNjFiMTFjNjQ0YyIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwiY29tcGFueSIsInVtYV9hdXRob3JpemF0aW9uIiwiZGVmYXVsdC1yb2xlcy1maW5raS1zZXJ2aWNlcyJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCBjb21wYW55Iiwic2lkIjoiMmU3M2I1MWItNTU2OC00ZGNkLTkyNjEtY2Q2MWIxMWM2NDRjIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiJOZXRjZXRlcmEgQ29tcGFueSIsInByZWZlcnJlZF91c2VybmFtZSI6Im5jYSIsImdpdmVuX25hbWUiOiJOZXRjZXRlcmEiLCJmYW1pbHlfbmFtZSI6IkNvbXBhbnkiLCJlbWFpbCI6Im5ldGNldGVyYUBlbWFpbC5jb20ifQ.DOw9VYtQEfh-3OUmte8VIu0bezHfR_BCAHTPJ3lhEw-WwbVcWOrLeGhMsxnG7YVtZgzpKCjFGbNXkYODfc-PCUz8QzxNoBglQF16HcA1tL-jeeA_PQGdkejnwwUzwcGSsPYBFs7uz1pGzztSOCCvv3rXTrItzqq5j7zRCfikGp6grujEs-hQPhz4VeP5KGJzKtrfhN3iBdwdEOUXJN7zeygcBAc2tqBOIIntP7ZCxw1j88UNO0iwOfxeLY-y2F-srjd52T0JuF4AYaRHhuIQopK2sV_3Z8pvaHOp0B3VJQqYbQMkrBFASMopB0KGvwCykfOgdrkodH-GOEdyjFfLOQ`
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
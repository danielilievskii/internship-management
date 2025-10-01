import {api} from "@/services/api.ts";
import {CreateInternshipWeekPayload, EditInternshipWeekPayload} from "@/types/internship.ts";

export const studentQueryApi = {

  getInternships: async (): Promise<void> => {
    return await api.get(`/student/internships/my`)
      .then((response) => response.data);
  },

  getCV: async (): Promise<void> => {
    return await api.get(`/student/internships/cv`, {
      responseType: 'blob',
    }).then((response) => response.data);
  }
}

export const studentCommandsApi = {

  createSearchingInternship: async (payload: File): Promise<void> => {
    const formData = new FormData()
    formData.append("studentCV", payload)
    await api.post(`/student/submitCommand/CreateSearchingInternship`, formData)
  },

  deleteSearchingInternship: async (): Promise<void> => {
    await api.delete(`/student/submitCommand/DeleteSearchingInternship`);
  },

  createInternshipWeek: async (payload: CreateInternshipWeekPayload): Promise<void> => {
    await api.post('/student/submitCommand/CreateInternshipWeek', payload);
  },

  editInternshipWeek: async (payload: EditInternshipWeekPayload): Promise<void> => {
    await api.post('/student/submitCommand/EditInternshipWeek', payload);
  },

  updateStatus: async (internshipId: string, status: string): Promise<void> => {
    await api.put(`/internships/${internshipId}/status`, { status });
  },
}



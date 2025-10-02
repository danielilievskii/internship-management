import {api} from "@/services/api.ts";
import {CreateInternshipWeekPayload, EditInternshipWeekPayload, InternshipView} from "@/types/internship.ts";
import {AcceptInternshipCommandDto, RejectInternshipCommandDto} from "@/types/InternshipCommands.ts";

export const studentQueryApi = {

  getInternships: async (): Promise<InternshipView[]> => {
    return await api.get(`/student/internships`)
      .then((response) => response.data);
  },

  getCV: async (): Promise<File> => {
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

  acceptInternship: async(internshipId: string): Promise<void> => {
    let acceptInternshipCommandDto : AcceptInternshipCommandDto = { internshipId }
    await api.post(`/student/submitCommand/AcceptInternship`, acceptInternshipCommandDto)
  },

  rejectInternship: async(internshipId: string): Promise<void> => {
    let rejectInternshipCommandDto : RejectInternshipCommandDto = { internshipId }
    await api.post(`/student/submitCommand/RejectInternship`, rejectInternshipCommandDto)
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



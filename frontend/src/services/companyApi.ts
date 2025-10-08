import {
  AddWeekCommentPayload,
  InternshipView,
  SubmitAgreedInternshipPayload,
  SubmitInternshipCommandPayload
} from "@/types/internship.ts";
import {api} from "@/services/api.ts";
import {mapApiInternship} from "@/services/mappers/internshipMapper.ts";

export const companyQueryApi = {

  getInternships: async (): Promise<InternshipView[]> => {
    return await api.get(`/company/internships`)
        .then(response =>
            response.data.map(item => mapApiInternship(item))
        )
  }
}

export const companyCommandsApi = {
  submitInternship: async (payload: SubmitInternshipCommandPayload): Promise<void> => {
    await api.post(`/company/submitCommand/SubmitInternship`, payload)
  },

  submitAgreedInternship: async (payload: SubmitAgreedInternshipPayload): Promise<void> => {
    await api.post(`/company/submitCommand/SubmitAgreedInternship`, payload)
  },

  addWeekComment: async (payload: AddWeekCommentPayload): Promise<void> => {
    await api.post('/company/submitCommand/AddWeekComment', payload);
  },
}
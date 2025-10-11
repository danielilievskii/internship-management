import {
  AddWeekCommentPayload,
  InternshipView,
  InvalidateJournalCommandPayload,
  ValidateJournalCommandPayload
} from "@/types/internship.ts";
import {api} from "@/services/api.ts";
import {mapApiInternship} from "@/services/mappers/internshipMapper.ts";

export const coordinatorQueryApi = {

  getInternships: async (): Promise<InternshipView[]> => {
    return await api.get(`/coordinator/internships`)
        .then(response =>
            response.data.map(item => mapApiInternship(item))
        );
  }
}

export const coordinatorCommandsApi = {
  addWeekComment: async (payload: AddWeekCommentPayload): Promise<void> => {
    await api.post('/coordinator/submitCommand/AddWeekComment', payload);
  },

  validateJournal: async(payload : ValidateJournalCommandPayload): Promise<void> => {
    await api.post(`/coordinator/submitCommand/ValidateJournal`, payload)
  },

  invalidateJournal: async(payload : InvalidateJournalCommandPayload): Promise<void> => {
    await api.post(`/coordinator/submitCommand/InvalidateJournal`, payload)
  },
}
import {AddWeekCommentPayload} from "@/types/internship.ts";
import {api} from "@/services/api.ts";

export const companyCommandsApi = {
  addWeekComment: async (payload: AddWeekCommentPayload): Promise<void> => {
    await api.post('/company/submitCommand/CompanyAddWeekComment', payload);
  },
}
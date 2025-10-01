import {AddWeekCommentPayload} from "@/types/internship.ts";
import {api} from "@/services/api.ts";

export const coordinatorCommandsApi = {
  addWeekComment: async (payload: AddWeekCommentPayload): Promise<void> => {
    await api.post('/internship/submitCommand/CoordinatorAddWeekComment', payload);
  },
}
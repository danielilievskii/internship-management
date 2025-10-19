import {api} from "@/services/api.ts";
import {ArchiveInternshipCommandDto} from "@/types/InternshipCommands.ts";

export const adminCommandsApi = {
  archiveInternship: async(internshipId: string): Promise<void> => {
    let archiveInternshipCommandDto : ArchiveInternshipCommandDto = { internshipId }
    await api.post(`/admin/submitCommand/ArchiveInternship`, archiveInternshipCommandDto)
  },
}



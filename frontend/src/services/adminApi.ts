import {api} from "@/services/api.ts";
import {ArchiveInternshipCommandDto} from "@/types/InternshipCommands.ts";
import {InternshipView} from "@/types/internship.ts";
import {mapApiInternship} from "@/services/mappers/internshipMapper.ts";

export const adminQueryApi = {

  getNumberOfCompanies : async (): Promise<number> => {
    const response =  await api.get(`/admin/total`)
    return response.data
  }
}

export const adminCommandsApi = {
  archiveInternship: async(internshipId: string): Promise<void> => {
    let archiveInternshipCommandDto : ArchiveInternshipCommandDto = { internshipId }
    await api.post(`/admin/submitCommand/ArchiveInternship`, archiveInternshipCommandDto)
  },
}



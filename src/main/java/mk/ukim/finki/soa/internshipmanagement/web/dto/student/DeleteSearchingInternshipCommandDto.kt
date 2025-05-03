package mk.ukim.finki.soa.internshipmanagement.web.dto.student

import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.StudentCV

data class DeleteSearchingInternshipCommandDto(
    val internshipId: InternshipId,
)
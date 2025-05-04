package mk.ukim.finki.soa.internshipmanagement.web.dto.student

import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipWeekId

data class DeleteInternshipWeekCommandDto(
    val internshipId: InternshipId,
    val internshipWeekId: InternshipWeekId
)

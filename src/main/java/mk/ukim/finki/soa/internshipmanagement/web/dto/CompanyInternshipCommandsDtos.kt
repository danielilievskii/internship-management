package mk.ukim.finki.soa.internshipmanagement.web.dto

import mk.ukim.finki.soa.internshipmanagement.model.valueobject.Description
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId

data class SubmitInternshipCommandDto(
    val internshipId: InternshipId,
    val description: Description,
)
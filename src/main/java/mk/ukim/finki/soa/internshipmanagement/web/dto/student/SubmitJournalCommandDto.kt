package mk.ukim.finki.soa.internshipmanagement.web.dto.student

import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId

data class SubmitJournalCommandDto(
    val internshipId: InternshipId
)

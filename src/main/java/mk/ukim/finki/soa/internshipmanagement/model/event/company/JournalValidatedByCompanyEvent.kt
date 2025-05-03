package mk.ukim.finki.soa.internshipmanagement.model.event.company

import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipStatus

data class JournalValidatedByCompanyEvent(
    val internshipId: InternshipId,
    val newStatus: InternshipStatus
)
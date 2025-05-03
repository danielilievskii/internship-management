package mk.ukim.finki.soa.internshipmanagement.model.event.company

import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipStatus

data class JournalInvalidatedByCompanyEvent(
    val internshipId: InternshipId,
    val newStatus: InternshipStatus
)

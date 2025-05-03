package mk.ukim.finki.soa.internshipmanagement.model.event.coordinator

import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipStatus

data class JournalInvalidatedByCoordinatorEvent(
    val internshipId: InternshipId,
    val newStatus: InternshipStatus
)

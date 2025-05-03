package mk.ukim.finki.soa.internshipmanagement.model.event.coordinator

import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipStatus

data class InternshipArchivedEvent(
    val internshipId: InternshipId,
    val newStatus: InternshipStatus
)

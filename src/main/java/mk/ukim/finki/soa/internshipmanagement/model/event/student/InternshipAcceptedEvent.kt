package mk.ukim.finki.soa.internshipmanagement.model.event.student

import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipStatus

data class InternshipAcceptedEvent(
    val internshipId: InternshipId,
    val status: InternshipStatus
)
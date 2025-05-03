package mk.ukim.finki.soa.internshipmanagement.model.event.student

import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipStatus

data class InternshipRejectedEvent(
    val internshipId: InternshipId,
    val status: InternshipStatus
)
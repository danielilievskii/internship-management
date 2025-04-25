package mk.ukim.finki.soa.internshipmanagement.model.event

import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipStatus

data class InternshipSubmittedEvent(
    val internshipId: InternshipId,
    val description: String,
    val status: InternshipStatus
)
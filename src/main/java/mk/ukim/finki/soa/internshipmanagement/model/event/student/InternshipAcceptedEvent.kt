package mk.ukim.finki.soa.internshipmanagement.model.event.student

import mk.ukim.finki.soa.internshipmanagement.model.event.InternshipStatusChangedEvent
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipStatus
import java.time.LocalDateTime

data class InternshipAcceptedEvent(
    override val internshipId: InternshipId,
    override val previousStatus: InternshipStatus,
    override val newStatus: InternshipStatus,
    override val changedAt: LocalDateTime
) : InternshipStatusChangedEvent(
    internshipId,
    previousStatus,
    newStatus,
    changedAt
)
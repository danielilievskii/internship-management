package mk.ukim.finki.soa.internshipmanagement.model.event.company

import mk.ukim.finki.soa.internshipmanagement.model.InternshipWeek
import mk.ukim.finki.soa.internshipmanagement.model.event.InternshipStatusChangedEvent
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.*
import java.time.LocalDateTime

data class InternshipSubmittedEvent(
    override val internshipId: InternshipId,
    override val previousStatus: InternshipStatus,
    override val newStatus: InternshipStatus,
    override val changedAt: LocalDateTime,
    val description: Description,
    val period: InternshipDateRange,
    val weeklyHours: WeeklyHours,
    val weeks: MutableList<InternshipWeek>,
    val contactEmail: Email,
) : InternshipStatusChangedEvent(
    internshipId,
    previousStatus,
    newStatus,
    changedAt
)
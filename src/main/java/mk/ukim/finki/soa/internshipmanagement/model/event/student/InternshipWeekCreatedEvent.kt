package mk.ukim.finki.soa.internshipmanagement.model.event.student

import mk.ukim.finki.soa.internshipmanagement.model.valueobject.*

data class InternshipWeekCreatedEvent(
    val internshipId: InternshipId,
    val weekId: InternshipWeekId,
    val period: InternshipWeekDateRange,
    val description: Description,
    val workingHours: WeeklyHours
)

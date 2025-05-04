package mk.ukim.finki.soa.internshipmanagement.model.command.student

import mk.ukim.finki.soa.internshipmanagement.model.valueobject.*

data class CreateInternshipWeekCommand(
    val internshipId: InternshipId,
    val period: InternshipWeekDateRange,
    val description: Description,
    val workingHours: WeeklyHours
)
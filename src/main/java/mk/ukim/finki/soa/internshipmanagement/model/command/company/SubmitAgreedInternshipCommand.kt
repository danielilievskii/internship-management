package mk.ukim.finki.soa.internshipmanagement.model.command.company

import mk.ukim.finki.soa.internshipmanagement.model.valueobject.*

data class SubmitAgreedInternshipCommand(
    val studentIndex: StudentIndex,
    val description: Description,
    val period: InternshipDateRange,
    val weeklyHours: WeeklyHours,
    val contactEmail: Email
)

package mk.ukim.finki.soa.internshipmanagement.model.command.company

import mk.ukim.finki.soa.internshipmanagement.model.valueobject.*

data class SubmitInternshipCommand(
    val internshipId: InternshipId,
    val companyId: CompanyId,
    val description: Description,
    val period: InternshipDateRange,
    val weeklyHours: WeeklyHours,
    val contactEmail: Email
)

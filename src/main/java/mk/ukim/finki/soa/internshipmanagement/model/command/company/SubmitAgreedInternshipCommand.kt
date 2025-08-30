package mk.ukim.finki.soa.internshipmanagement.model.command.company

import mk.ukim.finki.soa.internshipmanagement.model.valueobject.*

data class SubmitAgreedInternshipCommand(
    val studentId: StudentId,
    val companyId: CompanyId,
    val description: Description,
    val period: InternshipDateRange,
    val weeklyHours: WeeklyHours,
    val contactEmail: Email
)

package mk.ukim.finki.soa.internshipmanagement.web.dto.company

import mk.ukim.finki.soa.internshipmanagement.model.valueobject.*

data class SubmitAgreedInternshipCommandDto(
    val studentIndex: StudentIndex,
    val description: Description,
    val internshipDateRange: InternshipDateRange,
    val weeklyHours: WeeklyHours,
    val contactEmail: Email
)
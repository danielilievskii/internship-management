package mk.ukim.finki.soa.internshipmanagement.web.dto.company

import java.time.LocalDate

data class SubmitInternshipCommandDto(
    val internshipId: String,
    val description: String,
    val fromDate: LocalDate,
    val toDate: LocalDate,
    val weeklyHours: Int,
    val contactEmail: String
)

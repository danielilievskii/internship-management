package mk.ukim.finki.soa.internshipmanagement.web.dto.student

import java.time.LocalDate

data class CreateInternshipWeekCommandDto(
    val internshipId: String,
    val fromDate: LocalDate,
    val toDate: LocalDate,
    val description: String,
    val workingHours: Int
)

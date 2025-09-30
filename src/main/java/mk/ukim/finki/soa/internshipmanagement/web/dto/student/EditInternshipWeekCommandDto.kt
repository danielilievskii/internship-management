package mk.ukim.finki.soa.internshipmanagement.web.dto.student

import java.time.LocalDate

data class EditInternshipWeekCommandDto(
    val internshipId: String,
    val weekId: String,
    val fromDate: LocalDate,
    val toDate: LocalDate,
    val description: String,
    val workingHours: Int
)

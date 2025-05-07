package mk.ukim.finki.soa.internshipmanagement.web.dto.student

data class EditInternshipWeekCommandDto(
    val internshipId: String,
    val weekId: String,
    val newDescription: String,
    val newWorkingHours: Int
)

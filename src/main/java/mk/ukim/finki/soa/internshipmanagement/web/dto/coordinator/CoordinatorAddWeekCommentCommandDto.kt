package mk.ukim.finki.soa.internshipmanagement.web.dto.coordinator

data class CoordinatorAddWeekCommentCommandDto(
    val internshipId: String,
    val weekId: String,
    val comment: String
)

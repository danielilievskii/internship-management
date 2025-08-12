package mk.ukim.finki.soa.internshipmanagement.web.dto.company

data class CompanyAddWeekCommentCommandDto (
    val internshipId: String,
    val weekId: String,
    val comment: String
)
package mk.ukim.finki.soa.internshipmanagement.web.dto.admin

data class ChangeCoordinatorCommandDto(
    val internshipId: String,
    val newCoordinatorId: String
)

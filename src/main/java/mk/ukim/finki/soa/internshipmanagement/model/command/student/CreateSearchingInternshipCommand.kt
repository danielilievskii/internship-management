package mk.ukim.finki.soa.internshipmanagement.model.command.student

data class CreateSearchingInternshipCommand(
    val studentCV: ByteArray,
)

package mk.ukim.finki.soa.internshipmanagement.model.command

data class CreateSearchingInternshipCommand(
    val studentCV: ByteArray,
)
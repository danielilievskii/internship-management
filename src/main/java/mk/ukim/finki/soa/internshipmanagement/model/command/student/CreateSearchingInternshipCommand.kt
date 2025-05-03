package mk.ukim.finki.soa.internshipmanagement.model.command.student

import mk.ukim.finki.soa.internshipmanagement.model.valueobject.StudentCV

data class CreateSearchingInternshipCommand(
    val studentCV: StudentCV,
)

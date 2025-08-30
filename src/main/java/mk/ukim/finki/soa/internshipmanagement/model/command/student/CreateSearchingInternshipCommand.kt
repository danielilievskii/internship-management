package mk.ukim.finki.soa.internshipmanagement.model.command.student

import mk.ukim.finki.soa.internshipmanagement.model.valueobject.StudentCV
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.StudentId

data class CreateSearchingInternshipCommand(
    val studentId: StudentId,
    val studentCV: StudentCV,
)

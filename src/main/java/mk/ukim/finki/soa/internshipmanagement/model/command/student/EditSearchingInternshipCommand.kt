package mk.ukim.finki.soa.internshipmanagement.model.command.student

import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.StudentCV

data class EditSearchingInternshipCommand(
    val internshipId: InternshipId,
    val newCV: StudentCV
)

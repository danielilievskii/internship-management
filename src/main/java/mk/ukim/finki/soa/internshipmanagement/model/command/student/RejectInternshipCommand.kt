package mk.ukim.finki.soa.internshipmanagement.model.command.student

import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId

data class RejectInternshipCommand(
    val internshipId: InternshipId
)
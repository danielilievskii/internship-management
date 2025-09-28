package mk.ukim.finki.soa.internshipmanagement.model.command

import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId

data class ArchiveInternshipCommand(
    val internshipId: InternshipId
)
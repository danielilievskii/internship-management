package mk.ukim.finki.soa.internshipmanagement.model.command.company

import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId

data class InvalidateJournalByCompanyCommand(
    val internshipId: InternshipId
)
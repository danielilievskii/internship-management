package mk.ukim.finki.soa.internshipmanagement.model.command.company

import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId

data class ValidateJournalByCompanyCommand(
    val internshipId: InternshipId
)
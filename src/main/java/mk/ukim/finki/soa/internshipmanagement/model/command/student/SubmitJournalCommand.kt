package mk.ukim.finki.soa.internshipmanagement.model.command.student

import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId

data class SubmitJournalCommand(
    val internshipId: InternshipId
)
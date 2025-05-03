package mk.ukim.finki.soa.internshipmanagement.model.command.coordinator

import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId

data class InvalidateJournalByCoordinatorCommand(
    val internshipId: InternshipId
)

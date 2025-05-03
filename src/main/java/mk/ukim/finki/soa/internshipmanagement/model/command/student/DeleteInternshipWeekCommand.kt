package mk.ukim.finki.soa.internshipmanagement.model.command.student

import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipWeekId

data class DeleteInternshipWeekCommand(
    val internshipId: InternshipId,
    val weekId: InternshipWeekId
)
package mk.ukim.finki.soa.internshipmanagement.model.event.student

import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipWeekId

data class InternshipWeekDeletedEvent(
    val internshipId: InternshipId,
    val weekId: InternshipWeekId
)
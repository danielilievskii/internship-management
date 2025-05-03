package mk.ukim.finki.soa.internshipmanagement.model.event.student

import mk.ukim.finki.soa.internshipmanagement.model.valueobject.Description
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipWeekId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.WeeklyHours

data class InternshipWeekEditedEvent(
    val internshipId: InternshipId,
    val weekId: InternshipWeekId,
    val newDescription: Description,
    val newWorkingHours: WeeklyHours
)
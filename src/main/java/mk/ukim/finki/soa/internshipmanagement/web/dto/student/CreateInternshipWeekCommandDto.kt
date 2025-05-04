package mk.ukim.finki.soa.internshipmanagement.web.dto.student

import mk.ukim.finki.soa.internshipmanagement.model.valueobject.Description
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipWeekDateRange
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.WeeklyHours

data class CreateInternshipWeekCommandDto(
    val internshipId: InternshipId,
    val internshipWeekDateRange: InternshipWeekDateRange,
    val description: Description,
    val workingWeeklyHours: WeeklyHours
)

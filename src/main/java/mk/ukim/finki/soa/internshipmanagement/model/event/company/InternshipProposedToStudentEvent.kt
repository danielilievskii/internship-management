package mk.ukim.finki.soa.internshipmanagement.model.event.company
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.*

data class InternshipProposedToStudentEvent(
    val internshipId: InternshipId,
    val description: Description,
    val period: InternshipDateRange,
    val weeklyHours: WeeklyHours,
    val contactEmail: Email,
    val status: InternshipStatus
)
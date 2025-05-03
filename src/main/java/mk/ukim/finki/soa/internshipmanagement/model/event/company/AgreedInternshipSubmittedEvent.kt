package mk.ukim.finki.soa.internshipmanagement.model.event.company
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.*

data class AgreedInternshipSubmittedEvent(
    val internshipId: InternshipId,
    val description: Description,
    val period: InternshipDateRange,
    val weeklyHours: WeeklyHours,
    val contactEmail: Email,
    val status: InternshipStatus
)
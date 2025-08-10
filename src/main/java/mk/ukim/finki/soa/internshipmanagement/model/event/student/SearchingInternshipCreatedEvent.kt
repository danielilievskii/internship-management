package mk.ukim.finki.soa.internshipmanagement.model.event.student

import mk.ukim.finki.soa.internshipmanagement.model.event.InternshipStatusChangedEvent
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipStatus
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.StudentCV
import java.time.LocalDateTime

data class SearchingInternshipCreatedEvent(
    override val internshipId: InternshipId,
    override val previousStatus: InternshipStatus?,
    override val newStatus: InternshipStatus,
    override val changedAt: LocalDateTime,
    val studentCV: StudentCV,
) : InternshipStatusChangedEvent(
    internshipId,
    previousStatus,
    newStatus,
    changedAt
)
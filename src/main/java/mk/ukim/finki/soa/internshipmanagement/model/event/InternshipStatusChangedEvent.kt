package mk.ukim.finki.soa.internshipmanagement.model.event
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipStatus
import java.time.LocalDateTime

abstract class InternshipStatusChangedEvent(
    open val internshipId: InternshipId,
    open val previousStatus: InternshipStatus?,
    open val newStatus: InternshipStatus,
    open val changedAt: LocalDateTime
)
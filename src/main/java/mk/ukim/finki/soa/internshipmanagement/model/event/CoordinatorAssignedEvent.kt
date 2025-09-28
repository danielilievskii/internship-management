package mk.ukim.finki.soa.internshipmanagement.model.event

import mk.ukim.finki.soa.internshipmanagement.model.valueobject.CoordinatorId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId
import java.time.LocalDateTime

data class CoordinatorAssignedEvent(
    val internshipId: InternshipId,
    val coordinatorId: CoordinatorId,
    val changedAt: LocalDateTime
)
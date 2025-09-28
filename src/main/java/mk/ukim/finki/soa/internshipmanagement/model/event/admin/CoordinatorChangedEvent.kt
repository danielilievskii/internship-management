package mk.ukim.finki.soa.internshipmanagement.model.event.admin

import mk.ukim.finki.soa.internshipmanagement.model.valueobject.CoordinatorId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId
import java.time.LocalDateTime

data class CoordinatorChangedEvent(
    val internshipId: InternshipId,
    val oldCoordinatorId: CoordinatorId,
    val newCoordinatorId: CoordinatorId,
    val changedAt: LocalDateTime
)
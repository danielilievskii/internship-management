package mk.ukim.finki.soa.internshipmanagement.model.command.admin

import mk.ukim.finki.soa.internshipmanagement.model.valueobject.CoordinatorId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId

data class ChangeCoordinatorCommand(
    val internshipId: InternshipId,
    val newCoordinatorId: CoordinatorId
)

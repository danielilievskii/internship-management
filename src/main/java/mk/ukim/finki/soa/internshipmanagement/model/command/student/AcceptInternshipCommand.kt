package mk.ukim.finki.soa.internshipmanagement.model.command.student

import mk.ukim.finki.soa.internshipmanagement.model.valueobject.CoordinatorId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId

data class AcceptInternshipCommand(
    val internshipId: InternshipId,
    val coordinatorId: CoordinatorId
)
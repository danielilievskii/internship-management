package mk.ukim.finki.soa.internshipmanagement.model.command

import mk.ukim.finki.soa.internshipmanagement.model.valueobject.CoordinatorId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId
import org.axonframework.modelling.command.TargetAggregateIdentifier

data class AssignCoordinatorCommand(
    @TargetAggregateIdentifier val internshipId: InternshipId,
    val coordinatorId: CoordinatorId
)

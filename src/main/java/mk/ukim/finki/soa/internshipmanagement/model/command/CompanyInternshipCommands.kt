package mk.ukim.finki.soa.internshipmanagement.model.command

import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId
import org.axonframework.modelling.command.TargetAggregateIdentifier

data class SubmitInternshipCommand(
    @TargetAggregateIdentifier
    val internshipId: InternshipId,
    val description: String,
)
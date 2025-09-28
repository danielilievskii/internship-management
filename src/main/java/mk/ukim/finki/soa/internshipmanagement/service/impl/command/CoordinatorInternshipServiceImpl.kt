package mk.ukim.finki.soa.internshipmanagement.service.impl.command

import mk.ukim.finki.soa.internshipmanagement.model.command.coordinator.ArchiveInternshipCommand
import mk.ukim.finki.soa.internshipmanagement.model.command.coordinator.CoordinatorAddWeekCommentCommand
import mk.ukim.finki.soa.internshipmanagement.model.command.coordinator.InvalidateJournalByCoordinatorCommand
import mk.ukim.finki.soa.internshipmanagement.model.command.coordinator.ValidateJournalByCoordinatorCommand
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId
import mk.ukim.finki.soa.internshipmanagement.service.CoordinatorInternshipService
import org.axonframework.commandhandling.gateway.CommandGateway
import org.springframework.stereotype.Service
import java.util.concurrent.CompletableFuture

@Service
class CoordinatorInternshipServiceImpl(
    val commandGateway: CommandGateway
) : CoordinatorInternshipService {
    override fun archiveInternship(command: ArchiveInternshipCommand): CompletableFuture<InternshipId> {
        return commandGateway.send(command)
    }

    override fun addWeekComment(command: CoordinatorAddWeekCommentCommand): CompletableFuture<InternshipId> {
        return commandGateway.send(command)
    }

    override fun invalidateJournalByCoordinator(command: InvalidateJournalByCoordinatorCommand): CompletableFuture<InternshipId> {
        return commandGateway.send(command)
    }

    override fun validateJournalByCoordinator(command: ValidateJournalByCoordinatorCommand): CompletableFuture<InternshipId> {
        return commandGateway.send(command)
    }
}
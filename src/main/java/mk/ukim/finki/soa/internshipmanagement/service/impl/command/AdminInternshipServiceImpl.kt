package mk.ukim.finki.soa.internshipmanagement.service.impl.command

import mk.ukim.finki.soa.internshipmanagement.model.command.ArchiveInternshipCommand
import mk.ukim.finki.soa.internshipmanagement.model.command.admin.ChangeCoordinatorCommand
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId
import mk.ukim.finki.soa.internshipmanagement.service.AdminInternshipService
import org.axonframework.commandhandling.gateway.CommandGateway
import org.springframework.stereotype.Service
import java.util.concurrent.CompletableFuture

@Service
class AdminInternshipServiceImpl(
    private val commandGateway: CommandGateway
) : AdminInternshipService {

    override fun archiveInternship(command: ArchiveInternshipCommand): CompletableFuture<InternshipId> {
        return commandGateway.send(command)
    }

    override fun changeCoordinator(command: ChangeCoordinatorCommand): CompletableFuture<InternshipId> {
        return commandGateway.send(command)
    }
}

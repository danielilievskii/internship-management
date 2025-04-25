package mk.ukim.finki.soa.internshipmanagement.service.impl.command

import mk.ukim.finki.soa.internshipmanagement.model.command.CreateSearchingInternshipCommand
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId
import mk.ukim.finki.soa.internshipmanagement.service.StudentInternshipService
import org.axonframework.commandhandling.gateway.CommandGateway
import org.springframework.stereotype.Service
import java.util.concurrent.CompletableFuture

@Service
class StudentInternshipServiceImpl(
    val commandGateway: CommandGateway
) : StudentInternshipService {
    override fun createSearchingInternship(command: CreateSearchingInternshipCommand): CompletableFuture<InternshipId> {
        return commandGateway.send(command)
    }
}
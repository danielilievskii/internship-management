package mk.ukim.finki.soa.internshipmanagement.service.impl.command

import mk.ukim.finki.soa.internshipmanagement.model.command.company.ProposeInternshipToStudentCommand
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId
import mk.ukim.finki.soa.internshipmanagement.service.CompanyInternshipService
import org.axonframework.commandhandling.gateway.CommandGateway
import org.springframework.stereotype.Service
import java.util.concurrent.CompletableFuture

@Service
class CompanyInternshipServiceImpl(val commandGateway: CommandGateway) : CompanyInternshipService {
    override fun proposeInternship(command: ProposeInternshipToStudentCommand): CompletableFuture<InternshipId> {
        return commandGateway.send(command)
    }
}
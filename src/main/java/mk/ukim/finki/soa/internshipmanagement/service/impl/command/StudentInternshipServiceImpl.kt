package mk.ukim.finki.soa.internshipmanagement.service.impl.command

import mk.ukim.finki.soa.internshipmanagement.model.command.student.*
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId
import mk.ukim.finki.soa.internshipmanagement.service.StudentInternshipService
import org.axonframework.commandhandling.gateway.CommandGateway
import org.springframework.stereotype.Service
import java.util.concurrent.CompletableFuture

@Service
class StudentInternshipServiceImpl(
    val commandGateway: CommandGateway,
) : StudentInternshipService {
    override fun createSearchingInternship(command: CreateSearchingInternshipCommand): CompletableFuture<InternshipId> {
        return commandGateway.send(command)
    }

    override fun editSearchingInternship(command: EditSearchingInternshipCommand): CompletableFuture<InternshipId> {
        return commandGateway.send(command)
    }

    override fun deleteSearchingInternship(command: DeleteSearchingInternshipCommand): CompletableFuture<InternshipId> {
        return commandGateway.send(command)
    }


    override fun acceptInternship(command: AcceptInternshipCommand): CompletableFuture<InternshipId> {
        return commandGateway.send(command)
    }


    override fun rejectInternship(command: RejectInternshipCommand): CompletableFuture<InternshipId> {
        return commandGateway.send(command)
    }

    override fun createInternshipWeek(command: CreateInternshipWeekCommand): CompletableFuture<InternshipId> {
        return commandGateway.send(command)
    }

    override fun deleteInternshipWeek(command: DeleteInternshipWeekCommand): CompletableFuture<InternshipId> {
        return commandGateway.send(command)
    }

    override fun editInternshipWeek(command: EditInternshipWeekCommand): CompletableFuture<InternshipId> {
        return commandGateway.send(command)
    }

    override fun submitJournal(command: SubmitJournalCommand): CompletableFuture<InternshipId> {
        return commandGateway.send(command)
    }
}
package mk.ukim.finki.soa.internshipmanagement.model.command.handler

import mk.ukim.finki.soa.internshipmanagement.model.Internship
import mk.ukim.finki.soa.internshipmanagement.model.command.student.*
import org.axonframework.commandhandling.CommandHandler
import org.axonframework.modelling.command.Repository
import org.springframework.stereotype.Component

@Component
class StudentInternshipCommandHandler(
    private val repository: Repository<Internship>
) {

    @CommandHandler
    fun handle(command: CreateSearchingInternshipCommand) {
        repository.newInstance {
            Internship().apply { handle(command) }
        }
    }

    @CommandHandler
    fun handle(command: DeleteSearchingInternshipCommand) {
        repository.load(command.internshipId.toString()).execute {
            it.handle(command)
        }
    }

    @CommandHandler
    fun handle(command: AcceptInternshipCommand) {
        repository.load(command.internshipId.toString()).execute {
            it.handle(command)
        }
    }

    @CommandHandler
    fun handle(command: SubmitJournalCommand) {
        repository.load(command.internshipId.toString()).execute {
            it.handle(command)
        }
    }

    @CommandHandler
    fun handle(command: EditSearchingInternshipCommand) {
        repository.load(command.internshipId.toString()).execute {
            it.handle(command)
        }
    }

    @CommandHandler
    fun handle(command: RejectInternshipCommand) {
        repository.load(command.internshipId.toString()).execute {
            it.handle(command)
        }
    }

    @CommandHandler
    fun handle(command: CreateInternshipWeekCommand) {
        repository.load(command.internshipId.toString()).execute {
            it.handle(command)
        }
    }

    @CommandHandler
    fun handle(command: EditInternshipWeekCommand) {
        repository.load(command.internshipId.toString()).execute {
            it.handle(command)
        }
    }

    @CommandHandler
    fun handle(command: DeleteInternshipWeekCommand) {
        repository.load(command.internshipId.toString()).execute {
            it.handle(command)
        }
    }


}

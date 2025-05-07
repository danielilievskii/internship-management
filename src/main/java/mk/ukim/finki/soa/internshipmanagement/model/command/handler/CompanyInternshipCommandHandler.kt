package mk.ukim.finki.soa.internshipmanagement.model.command.handler

import mk.ukim.finki.soa.internshipmanagement.model.Internship
import mk.ukim.finki.soa.internshipmanagement.model.command.company.*
import org.axonframework.commandhandling.CommandHandler
import org.axonframework.modelling.command.Repository
import org.springframework.stereotype.Component

@Component
class CompanyInternshipCommandHandler(
    private val repository: Repository<Internship>
) {

    @CommandHandler
    fun handle(command: SubmitInternshipCommand) {
        repository.load(command.internshipId.toString()).execute {
            it.handle(command)
        }
    }

    @CommandHandler
    fun handle(command: SubmitAgreedInternshipCommand) {
        repository.newInstance {
            Internship().apply { handle(command) }
        }
    }

    @CommandHandler
    fun handle(command: ValidateJournalByCompanyCommand) {
        repository.load(command.internshipId.toString()).execute {
            it.handle(command)
        }
    }

    @CommandHandler
    fun handle(command: InvalidateJournalByCompanyCommand) {
        repository.load(command.internshipId.toString()).execute {
            it.handle(command)
        }
    }

    @CommandHandler
    fun handle(command: CompanyAddWeekCommentCommand) {
        repository.load(command.internshipId.toString()).execute {
            it.handle(command)
        }
    }

}

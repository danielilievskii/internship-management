package mk.ukim.finki.soa.internshipmanagement.model.command.handler

import mk.ukim.finki.soa.internshipmanagement.model.Internship
import mk.ukim.finki.soa.internshipmanagement.model.command.company.CompanyAddWeekCommentCommand
import mk.ukim.finki.soa.internshipmanagement.model.command.company.InvalidateJournalByCompanyCommand
import mk.ukim.finki.soa.internshipmanagement.model.command.company.ProposeInternshipToStudentCommand
import mk.ukim.finki.soa.internshipmanagement.model.command.company.ValidateJournalByCompanyCommand
import org.axonframework.commandhandling.CommandHandler
import org.axonframework.modelling.command.Repository
import org.springframework.stereotype.Component

@Component
class CompanyInternshipCommandHandler(
    private val repository: Repository<Internship>
) {

    @CommandHandler
    fun handle(command: ProposeInternshipToStudentCommand) {
        repository.load(command.internshipId.toString()).execute {
            it.handle(command)
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

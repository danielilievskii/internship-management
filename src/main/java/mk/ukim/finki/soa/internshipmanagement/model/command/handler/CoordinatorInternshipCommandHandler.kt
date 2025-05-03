package mk.ukim.finki.soa.internshipmanagement.model.command.handler

import mk.ukim.finki.soa.internshipmanagement.model.Internship
import mk.ukim.finki.soa.internshipmanagement.model.command.coordinator.ArchiveInternshipCommand
import mk.ukim.finki.soa.internshipmanagement.model.command.coordinator.CoordinatorAddWeekCommentCommand
import mk.ukim.finki.soa.internshipmanagement.model.command.coordinator.InvalidateJournalByCoordinatorCommand
import mk.ukim.finki.soa.internshipmanagement.model.command.coordinator.ValidateJournalByCoordinatorCommand
import org.axonframework.commandhandling.CommandHandler
import org.axonframework.modelling.command.Repository
import org.springframework.stereotype.Component

@Component
class CoordinatorInternshipCommandHandler(
    private val repository: Repository<Internship>
) {

    @CommandHandler
    fun handle(command: ValidateJournalByCoordinatorCommand) {
        repository.load(command.internshipId.toString()).execute {
            it.handle(command)
        }
    }

    @CommandHandler
    fun handle(command: InvalidateJournalByCoordinatorCommand) {
        repository.load(command.internshipId.toString()).execute {
            it.handle(command)
        }
    }

    @CommandHandler
    fun handle(command: ArchiveInternshipCommand) {
        repository.load(command.internshipId.toString()).execute {
            it.handle(command)
        }
    }

    @CommandHandler
    fun handle(command: CoordinatorAddWeekCommentCommand) {
        repository.load(command.internshipId.toString()).execute {
            it.handle(command)
        }
    }

}

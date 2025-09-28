import mk.ukim.finki.soa.internshipmanagement.model.Internship
import mk.ukim.finki.soa.internshipmanagement.model.command.ArchiveInternshipCommand
import mk.ukim.finki.soa.internshipmanagement.model.command.admin.ChangeCoordinatorCommand
import org.axonframework.commandhandling.CommandHandler
import org.axonframework.modelling.command.Repository
import org.springframework.stereotype.Component

@Component
class AdminInternshipCommandHandler(
    private val repository: Repository<Internship>
) {
    @CommandHandler
    fun handle(command: ArchiveInternshipCommand) {
        repository.load(command.internshipId.toString()).execute {
            it.handle(command)
        }
    }

    @CommandHandler
    fun handle(command: ChangeCoordinatorCommand) {
        repository.load(command.internshipId.toString()).execute {
            it.handle(command)
        }
    }
}

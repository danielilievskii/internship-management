package mk.ukim.finki.soa.internshipmanagement.web

import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.tags.Tag
import mk.ukim.finki.soa.internshipmanagement.model.command.coordinator.ArchiveInternshipCommand
import mk.ukim.finki.soa.internshipmanagement.model.command.coordinator.CoordinatorAddWeekCommentCommand
import mk.ukim.finki.soa.internshipmanagement.model.command.coordinator.InvalidateJournalByCoordinatorCommand
import mk.ukim.finki.soa.internshipmanagement.model.command.coordinator.ValidateJournalByCoordinatorCommand
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.Comment
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipWeekId
import mk.ukim.finki.soa.internshipmanagement.service.CoordinatorInternshipService
import mk.ukim.finki.soa.internshipmanagement.web.dto.coordinator.InvalidateJournalByCoordinatorCommandDto
import mk.ukim.finki.soa.internshipmanagement.web.dto.coordinator.ArchiveInternshipCommandDto
import mk.ukim.finki.soa.internshipmanagement.web.dto.coordinator.CoordinatorAddWeekCommentCommandDto
import mk.ukim.finki.soa.internshipmanagement.web.dto.coordinator.ValidateJournalByCoordinatorCommandDto
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/internship/submitCommand")
@Tag(
    name = "Coordinator Internship Command API",
    description = "Handles coordinator commands related to internship journal management."
)
class CoordinatorInternshipCommandDispatcherRestApi(
    val coordinatorInternshipService : CoordinatorInternshipService
) {

    @Operation(
        summary = "Submit a command to submit internship",
        description = "Populates the specified internship by processing the provided details and sets its status to SUBMITTED."
    )
    @PostMapping("/SubmitInternship")
    fun archiveInternship(
        @RequestBody commandDto: ArchiveInternshipCommandDto
    ): ResponseEntity<Any> {
        val command = ArchiveInternshipCommand(
            internshipId = InternshipId(commandDto.internshipId)
        )

        return ResponseEntity.ok(coordinatorInternshipService.archiveInternship(command))
    }

    @Operation(
        summary = "Submit a command to add a week comment",
        description = "Adds a comment for a specific week in the internship journal."
    )
    @PostMapping("/AddWeekComment")
    fun addWeekComment(
        @RequestBody commandDto: CoordinatorAddWeekCommentCommandDto
    ): ResponseEntity<Any> {
        val command = CoordinatorAddWeekCommentCommand(
            internshipId = InternshipId(commandDto.internshipId),
            weekId = InternshipWeekId(commandDto.weekId),
            comment = Comment(commandDto.comment)
        )

        return ResponseEntity.ok(coordinatorInternshipService.addWeekComment(command))
    }

    @Operation(
        summary = "Submit a command to submit an internship journal",
        description = "Submits the internship journal for review by the coordinator."
    )
    @PostMapping("/InvalidateJournal")
    fun invalidateJournal(
        @RequestBody commandDto: InvalidateJournalByCoordinatorCommandDto
    ): ResponseEntity<Any> {
        val command = InvalidateJournalByCoordinatorCommand(
            internshipId = InternshipId(commandDto.internshipId)
        )

        return ResponseEntity.ok(coordinatorInternshipService.invalidateJournalByCoordinator(command))
    }

    @Operation(
        summary = "Submit a command to validate an internship journal",
        description = "Validates the internship journal and marks it as approved."
    )
    @PostMapping("/ValidateJournal")
    fun validateJournal(
        @RequestBody commandDto: ValidateJournalByCoordinatorCommandDto
    ): ResponseEntity<Any> {
        val command = ValidateJournalByCoordinatorCommand(
            internshipId = InternshipId(commandDto.internshipId)
        )

        return ResponseEntity.ok(coordinatorInternshipService.validateJournalByCoordinator(command))
    }
}
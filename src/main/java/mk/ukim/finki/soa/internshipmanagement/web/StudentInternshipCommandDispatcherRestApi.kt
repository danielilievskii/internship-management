package mk.ukim.finki.soa.internshipmanagement.web

import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.tags.Tag
import mk.ukim.finki.soa.internshipmanagement.model.command.student.*
import mk.ukim.finki.soa.internshipmanagement.model.snapshot.StudentSnapshot
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.*
import mk.ukim.finki.soa.internshipmanagement.service.AuthService
import mk.ukim.finki.soa.internshipmanagement.service.StudentInternshipService
import mk.ukim.finki.soa.internshipmanagement.web.dto.student.*
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile

@RestController
@RequestMapping("/student/submitCommand")
@Tag(
    name = "Student Internship Command API",
    description = "Handles student commands related to internship and journal management."
)
class StudentInternshipCommandDispatcherRestApi(
    private val studentInternshipService: StudentInternshipService,
    private val authService: AuthService
) {
    @Operation(
        summary = "Submit a command to create a new searching internship",
        description = "Creates a new internship entry with status SEARCHING by processing the provided student CV."
    )
    @PostMapping("/CreateSearchingInternship", consumes = ["multipart/form-data"])
    fun createSearchingInternship(
        @RequestParam("studentCV") studentCVFile: MultipartFile
    ): ResponseEntity<Any> {

        val authStudent: StudentSnapshot = authService.getAuthStudent()

        val command = CreateSearchingInternshipCommand(
            studentId = authStudent.id,
            studentCV = StudentCV(studentCVFile.bytes)
        )

        return ResponseEntity.ok(studentInternshipService.createSearchingInternship(command))
    }

    @Operation(
        summary = "Submit a command to update a searching internship",
        description = "Updates the specified searching internship by processing the provided student CV."
    )
    @PostMapping("/EditSearchingInternship", consumes = ["multipart/form-data"])
    fun editSearchingInternship(
        @RequestParam("internshipId") internshipId: String,
        @RequestParam("studentCV") studentCVFile: MultipartFile
    ): ResponseEntity<Any> {
        val command = EditSearchingInternshipCommand(
            internshipId = InternshipId(internshipId),
            newCV = StudentCV(studentCVFile.bytes),
        )

        return ResponseEntity.ok(studentInternshipService.editSearchingInternship(command))
    }

    @Operation(
        summary = "Submit a command to delete a searching internship",
        description = "Deletes the specified searching internship."
    )
    @DeleteMapping("/DeleteSearchingInternship")
    fun deleteSearchingInternship(
        @RequestBody commandDto: DeleteSearchingInternshipCommandDto
    ): ResponseEntity<Any> {
        val command = DeleteSearchingInternshipCommand(
            internshipId = InternshipId(commandDto.internshipId)
        )

        return ResponseEntity.ok(studentInternshipService.deleteSearchingInternship(command))
    }

    @Operation(
        summary = "Submit a command to accept an internship",
        description = "Sets the status of the specified internship to ACCEPTED."
    )
    @PostMapping("/AcceptInternship")
    fun acceptInternship(
        @RequestBody commandDto: AcceptInternshipCommandDto
    ): ResponseEntity<Any> {
        val command = AcceptInternshipCommand(
            internshipId = InternshipId(commandDto.internshipId)
        )
        return ResponseEntity.ok(studentInternshipService.acceptInternship(command))
    }

    @Operation(
        summary = "Submit a command to reject an internship",
        description = "Sets the status of the specified internship to REJECTED."
    )
    @PostMapping("/RejectInternship")
    fun rejectInternship(
        @RequestBody commandDto: RejectInternshipCommandDto
    ): ResponseEntity<Any> {
        val command = RejectInternshipCommand(
            internshipId = InternshipId(commandDto.internshipId)
        )

        return ResponseEntity.ok(studentInternshipService.rejectInternship(command))
    }

    @Operation(
        summary = "Submit a command to create a new internship week",
        description = "Creates a new internship week for the specified internship by processing the provided details."
    )
    @PostMapping("/CreateInternshipWeek")
    fun createInternshipWeek(
        @RequestBody commandDto: CreateInternshipWeekCommandDto
    ): ResponseEntity<Any> {
        val command = CreateInternshipWeekCommand(
            internshipId = InternshipId(commandDto.internshipId),
            period = InternshipWeekDateRange(commandDto.fromDate, commandDto.toDate),
            description = Description(commandDto.description),
            workingHours = WeeklyHours(commandDto.workingWeeklyHours)
        )
        return ResponseEntity.ok(studentInternshipService.createInternshipWeek(command))
    }

    @Operation(
        summary = "Submit a command to delete an internship week",
        description = "Deletes an internship week for the specified internship."
    )
    @DeleteMapping("/DeleteInternshipWeek")
    fun deleteInternshipWeek(
        @RequestBody commandDto: DeleteInternshipWeekCommandDto
    ) : ResponseEntity<Any> {
        val command = DeleteInternshipWeekCommand(
            internshipId = InternshipId(commandDto.internshipId),
            weekId = InternshipWeekId(commandDto.internshipWeekId)
        )
        return ResponseEntity.ok(studentInternshipService.deleteInternshipWeek(command))
    }

    @Operation(
        summary = "Submit a command to edit an internship week",
        description = "Edits an internship week for the specified internship by processing the provided details."
    )
    @PostMapping("/EditInternshipWeek")
    fun editInternshipWeek(
        @RequestBody commandDto: EditInternshipWeekCommandDto
    ) : ResponseEntity<Any> {
        val command = EditInternshipWeekCommand(
            internshipId = InternshipId(commandDto.internshipId),
            weekId = InternshipWeekId(commandDto.weekId),
            newDescription = Description(commandDto.newDescription),
            newWorkingHours = WeeklyHours(commandDto.newWorkingHours)
        )
        return ResponseEntity.ok(studentInternshipService.editInternshipWeek(command))
    }

    @Operation(
        summary = "Submit a command to submit an internship journal for validation",
        description = "Sets the status of the specified internship to JOURNAL SUBMITTED."
    )
    @PostMapping("/submitJournal")
    fun submitJournal(
        @RequestBody commandDto: SubmitJournalCommandDto
    ) : ResponseEntity<Any> {
        val command = SubmitJournalCommand(
            internshipId = InternshipId(commandDto.internshipId),
        )
        return ResponseEntity.ok(studentInternshipService.submitJournal(command))
    }
}

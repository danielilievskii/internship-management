package mk.ukim.finki.soa.internshipmanagement.web

import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.tags.Tag
import mk.ukim.finki.soa.internshipmanagement.model.command.company.*
import mk.ukim.finki.soa.internshipmanagement.model.snapshot.CompanySnapshot
import mk.ukim.finki.soa.internshipmanagement.model.snapshot.StudentSnapshot
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.*
import mk.ukim.finki.soa.internshipmanagement.service.AuthService
import mk.ukim.finki.soa.internshipmanagement.service.CompanyInternshipService
import mk.ukim.finki.soa.internshipmanagement.service.StudentSnapshotReadService
import mk.ukim.finki.soa.internshipmanagement.web.dto.company.*
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/company/submitCommand")
@Tag(
    name = "Company Internship Command API",
    description = "Handles company commands related to internship and journal management."
)
class CompanyInternshipCommandDispatcherRestApi(
    val companyInternshipService: CompanyInternshipService,
    val studentSnapshotReadService: StudentSnapshotReadService,
    val authService: AuthService
) {

    @Operation(
        summary = "Submit a command to submit internship",
        description = "Populates the specified internship by processing the provided details and sets its status to SUBMITTED."
    )
    @PostMapping("/SubmitInternship")
    fun submitInternship(
        @RequestBody commandDto: SubmitInternshipCommandDto
    ): ResponseEntity<Any> {

        val authCompany: CompanySnapshot = authService.getAuthCompany()

        val command = SubmitInternshipCommand(
            internshipId = InternshipId(commandDto.internshipId),
            companyId = authCompany.id,
            description = Description(commandDto.description),
            period = InternshipDateRange(
                commandDto.fromDate,
                commandDto.toDate
            ),
            weeklyHours = WeeklyHours(commandDto.weeklyHours),
            contactEmail = Email(commandDto.contactEmail)
        )

        return ResponseEntity.ok(companyInternshipService.submitInternship(command))
    }

    @Operation(
        summary = "Submit a command to submit an agreed internship",
        description = "Creates a new internship entry with status SUBMITTED by processing the provided student index and details."
    )
    @PostMapping("/SubmitAgreedInternship")
    fun submitInternship(
        @RequestBody commandDto: SubmitAgreedInternshipCommandDto
    ): ResponseEntity<Any> {

        val authCompany: CompanySnapshot = authService.getAuthCompany()
        val student: StudentSnapshot = studentSnapshotReadService.findByIndex(commandDto.studentIndex)

        val command = SubmitAgreedInternshipCommand(
            studentId = student.id,
            companyId = authCompany.id,
            description = Description(commandDto.description),
            period = InternshipDateRange(
                commandDto.fromDate,
                commandDto.toDate
            ),
            weeklyHours = WeeklyHours(commandDto.weeklyHours),
            contactEmail = Email(commandDto.contactEmail)
        )

        return ResponseEntity.ok(companyInternshipService.submitAgreedInternship(command))
    }

    @Operation(
        summary = "As a Company allows sends a submit command to add a week comment",
        description = "Allows a company to add a comment for a specific week in the internship journal."
    )
    @PostMapping("/CompanyAddWeekComment")
    fun companyAddWeekComment(
        @RequestBody commandDto: CompanyAddWeekCommentCommandDto
    ): ResponseEntity<Any> {
        val command = CompanyAddWeekCommentCommand(
            internshipId = InternshipId(commandDto.internshipId),
            weekId = InternshipWeekId(commandDto.weekId),
            comment = Comment(commandDto.comment)
        )
        return ResponseEntity.ok(companyInternshipService.addWeekComment(command))
    }

    @Operation(
        summary = "Invalidate a journal by company",
        description = "Allows a company to invalidate a journal for a specific internship."
    )
    @PostMapping("/InvalidateJournalByCompany")
    fun invalidateJournalByCompany(
        @RequestBody commandDto: InvalidateJournalByCompanyCommandDto
    ): ResponseEntity<Any> {
        val command = InvalidateJournalByCompanyCommand(
            internshipId = InternshipId(commandDto.internshipId)
        )
        return ResponseEntity.ok(companyInternshipService.invalidateJournalByCompany(command))
    }

    @Operation(
        summary = "Validate a journal by company",
        description = "Allows a company to validate a journal for a specific internship."
    )
    @PostMapping("/ValidateJournalByCompany")
    fun validateJournalByCompany(
        @RequestBody commandDto: ValidateJournalByCompanyCommandDto
    ): ResponseEntity<Any> {
        val command = ValidateJournalByCompanyCommand(
            internshipId = InternshipId(commandDto.internshipId)
        )
        return ResponseEntity.ok(companyInternshipService.validateJournalByCompany(command))
    }
}
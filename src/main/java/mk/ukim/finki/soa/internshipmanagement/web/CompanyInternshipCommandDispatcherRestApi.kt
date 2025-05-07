package mk.ukim.finki.soa.internshipmanagement.web

import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.tags.Tag
import mk.ukim.finki.soa.internshipmanagement.model.command.company.SubmitInternshipCommand
import mk.ukim.finki.soa.internshipmanagement.model.command.company.SubmitAgreedInternshipCommand
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.*
import mk.ukim.finki.soa.internshipmanagement.service.CompanyInternshipService
import mk.ukim.finki.soa.internshipmanagement.web.dto.company.SubmitInternshipCommandDto
import mk.ukim.finki.soa.internshipmanagement.web.dto.company.SubmitAgreedInternshipCommandDto
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
    val companyInternshipService: CompanyInternshipService
) {

    @Operation(
        summary = "Submit a command to submit internship",
        description = "Populates the specified internship by processing the provided details and sets its status to SUBMITTED."
    )
    @PostMapping("/SubmitInternship")
    fun submitInternship(
        @RequestBody commandDto: SubmitInternshipCommandDto
    ): ResponseEntity<Any> {
        val command = SubmitInternshipCommand(
            internshipId = InternshipId(commandDto.internshipId),
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
        val command = SubmitAgreedInternshipCommand(
            studentIndex = StudentIndex(commandDto.studentIndex),
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

    // TODO:
    //  CompanyAddWeekCommentCommand
    //  InvalidateJournalByCompanyCommand
    //  ValidateJournalByCompanyCommand
}
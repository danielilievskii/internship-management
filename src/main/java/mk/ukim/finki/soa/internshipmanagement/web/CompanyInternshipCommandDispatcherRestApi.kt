package mk.ukim.finki.soa.internshipmanagement.web

import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.tags.Tag
import mk.ukim.finki.soa.internshipmanagement.model.command.company.ProposeInternshipToStudentCommand
import mk.ukim.finki.soa.internshipmanagement.model.command.company.SubmitAgreedInternshipCommand
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.*
import mk.ukim.finki.soa.internshipmanagement.service.CompanyInternshipService
import mk.ukim.finki.soa.internshipmanagement.web.dto.company.ProposeInternshipToStudentCommandDto
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
    description = "Handles company commands related to internship offers and journal management."
)
class CompanyInternshipCommandDispatcherRestApi(
    val companyInternshipService: CompanyInternshipService
) {

    @Operation(
        summary = "Submit a command to propose an internship to a student",
        description = "Proposes an internship to a student by submitting internship details along with the internship ID."
    )
    @PostMapping("/ProposeInternshipToStudent")
    fun proposeInternship(
        @RequestBody commandDto: ProposeInternshipToStudentCommandDto
    ): ResponseEntity<Any> {
        val command = ProposeInternshipToStudentCommand(
            internshipId = commandDto.internshipId,
            description = Description(commandDto.description.value),
            period = InternshipDateRange(
                commandDto.internshipDateRange.fromDate,
                commandDto.internshipDateRange.toDate
            ),
            weeklyHours = WeeklyHours(commandDto.weeklyHours.value),
            contactEmail = Email(commandDto.contactEmail.value)
        )

        return ResponseEntity.ok(companyInternshipService.proposeInternship(command))
    }

    @Operation(
        summary = "Submit an agreed internship proposal to a student",
        description = "Submits an agreed internship proposal to a student providing internship details along with the student index."
    )
    @PostMapping("/SubmitAgreedInternship")
    fun submitInternship(
        @RequestBody commandDto: SubmitAgreedInternshipCommandDto
    ): ResponseEntity<Any> {
        val command = SubmitAgreedInternshipCommand(
            studentIndex = StudentIndex(commandDto.studentIndex.value),
            description = Description(commandDto.description.value),
            period = InternshipDateRange(
                commandDto.internshipDateRange.fromDate,
                commandDto.internshipDateRange.toDate
            ),
            weeklyHours = WeeklyHours(commandDto.weeklyHours.value),
            contactEmail = Email(commandDto.contactEmail.value)
        )

        return ResponseEntity.ok(companyInternshipService.submitAgreedInternship(command))
    }

    // TODO:
    //  CompanyAddWeekCommentCommand
    //  InvalidateJournalByCompanyCommand
    //  ValidateJournalByCompanyCommand
}
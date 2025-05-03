package mk.ukim.finki.soa.internshipmanagement.web

import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.tags.Tag
import mk.ukim.finki.soa.internshipmanagement.model.command.company.ProposeInternshipToStudentCommand
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.Description
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.Email
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipDateRange
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.WeeklyHours
import mk.ukim.finki.soa.internshipmanagement.service.CompanyInternshipService
import mk.ukim.finki.soa.internshipmanagement.web.dto.company.ProposeInternshipToStudentCommandDto
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
}
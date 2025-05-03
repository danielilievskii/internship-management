package mk.ukim.finki.soa.internshipmanagement.web

import mk.ukim.finki.soa.internshipmanagement.model.command.company.SubmitInternshipCommand
import mk.ukim.finki.soa.internshipmanagement.service.CompanyInternshipService
import mk.ukim.finki.soa.internshipmanagement.web.dto.SubmitInternshipCommandDto
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/company/internships")
class CompanyInternshipCommandDispatcherRestApi(
    val companyInternshipService: CompanyInternshipService
) {

    @PostMapping("/submit")
    fun submitInternship(@RequestBody commandDto: SubmitInternshipCommandDto
    ): ResponseEntity<Any> {
        return ResponseEntity.ok(
            companyInternshipService.submitInternship(
                SubmitInternshipCommand(
                    internshipId = commandDto.internshipId,
                    description = commandDto.description
                )
            )
        )}
}
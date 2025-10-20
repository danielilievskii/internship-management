package mk.ukim.finki.soa.internshipmanagement.web

import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.tags.Tag

import mk.ukim.finki.soa.internshipmanagement.model.view.InternshipCompositeView
import mk.ukim.finki.soa.internshipmanagement.service.AuthService
import mk.ukim.finki.soa.internshipmanagement.service.InternshipViewReadService

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@Tag(
    name = "Company Internship Query API",
    description = "Handles queries related to internships."
)
@RestController
@RequestMapping("/api/company/internships")
class CompanyInternshipQueryRestApi(
    val internshipViewReadService: InternshipViewReadService,
    val authService: AuthService,
) {

    @Operation(
        summary = "Fetches all internships for the currently logged company",
        description = "Retrieves a list of all internships."
    )
    @GetMapping
    fun findAll(): ResponseEntity<List<InternshipCompositeView>> {
        val company = authService.getAuthCompany()
        val internships = internshipViewReadService.findAllByCompanyId(company.id)

        return ResponseEntity.ok(internships)
    }
}
package mk.ukim.finki.soa.internshipmanagement.web

import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.tags.Tag
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.CompanyId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.StatusType
import mk.ukim.finki.soa.internshipmanagement.model.view.InternshipCompositeView
import mk.ukim.finki.soa.internshipmanagement.service.AuthService
import mk.ukim.finki.soa.internshipmanagement.service.InternshipViewReadService
import org.springframework.data.domain.Page
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
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
        description = "Retrieves a paginated list of all internships."
    )
    @GetMapping
    fun findAll(
        @RequestParam(defaultValue = "0") pageNum: Int,
        @RequestParam(defaultValue = "5") pageSize: Int,
        @RequestParam(required = false) studentId: String?,
        @RequestParam(required = false) coordinatorId: String?,
        @RequestParam(required = false) internshipStatus: StatusType?,
    ): ResponseEntity<Page<InternshipCompositeView>> {

        val (role, userId) = authService.getCurrentUser()
        val companyId = CompanyId(userId)

        val internshipsPage = internshipViewReadService.findAll(
            pageNum, pageSize, studentId, coordinatorId, internshipStatus, companyId.value
        )

        return ResponseEntity.ok(internshipsPage)
    }
}
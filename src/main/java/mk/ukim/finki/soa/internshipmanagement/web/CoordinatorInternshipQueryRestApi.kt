package mk.ukim.finki.soa.internshipmanagement.web

import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.tags.Tag
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.CoordinatorId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.StatusType
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.StudentId
import mk.ukim.finki.soa.internshipmanagement.model.view.InternshipCompositeView
import mk.ukim.finki.soa.internshipmanagement.service.AuthService
import mk.ukim.finki.soa.internshipmanagement.service.InternshipViewReadService
import org.springframework.data.domain.Page
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@Tag(
    name = "Coordinator Internship Query API",
    description = "Handles queries related to internships."
)
@RestController
@RequestMapping("/api/coordinator/internships")
class CoordinatorInternshipQueryRestApi(
    val internshipViewReadService: InternshipViewReadService,
    val authService: AuthService,
) {

    @Operation(
        summary = "Fetches all internships for the currently logged coordinator",
        description = "Retrieves a paginated list of all internships."
    )
    @GetMapping
    fun findAll(
        @RequestParam(defaultValue = "0") pageNum: Int,
        @RequestParam(defaultValue = "5") pageSize: Int,
        @RequestParam(required = false) studentId: String?,
        @RequestParam(required = false) companyId: String?,
        @RequestParam(required = false) internshipStatus: StatusType?,
    ): ResponseEntity<Page<InternshipCompositeView>> {

        val (role, userId) = authService.getCurrentUser()
        val coordinatorId = CoordinatorId(userId)

        val internshipsPage = internshipViewReadService.findAll(
            pageNum, pageSize, studentId, coordinatorId.value, internshipStatus, companyId)

        return ResponseEntity.ok(internshipsPage)
    }
}
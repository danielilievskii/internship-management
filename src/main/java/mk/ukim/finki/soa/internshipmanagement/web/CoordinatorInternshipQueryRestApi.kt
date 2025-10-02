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
        description = "Retrieves a list of all internships."
    )
    @GetMapping()
    fun findAll(): ResponseEntity<List<InternshipCompositeView>> {
        val coordinator = authService.getAuthCoordinator()
        val internships = internshipViewReadService.findAllByCoordinatorId(coordinator.id)

        return ResponseEntity.ok(internships)
    }
}
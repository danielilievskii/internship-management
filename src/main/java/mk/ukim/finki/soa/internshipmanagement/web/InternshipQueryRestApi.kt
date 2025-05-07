package mk.ukim.finki.soa.internshipmanagement.web

import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.responses.ApiResponse
import io.swagger.v3.oas.annotations.responses.ApiResponses
import io.swagger.v3.oas.annotations.tags.Tag
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId
import mk.ukim.finki.soa.internshipmanagement.model.view.InternshipView
import mk.ukim.finki.soa.internshipmanagement.service.InternshipViewReadService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@Tag(
    name = "Internship Query API",
    description = "Handles queries related to internships."
)
@RestController
@RequestMapping("/api/internships")
class InternshipQueryRestApi(val internshipViewReadService: InternshipViewReadService) {

    @Operation(
        summary = "Fetch internship by ID",
        description = "Retrieves the internship with the specified ID."
    )
    @GetMapping("/{internshipId}")
    fun findById(
        @PathVariable internshipId: InternshipId
    ): InternshipView {
        return internshipViewReadService.findById(internshipId)
    }

    @Operation(
        summary = "Fetch all internships",
        description = "Retrieves a list of all internships."
    )
    @GetMapping("/all")
    fun findAll(): List<InternshipView> {
        return internshipViewReadService.findAll()
    }
}
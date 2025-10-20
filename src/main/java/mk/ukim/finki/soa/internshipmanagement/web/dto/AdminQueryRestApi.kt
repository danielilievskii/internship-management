package mk.ukim.finki.soa.internshipmanagement.web.dto

import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.tags.Tag
import mk.ukim.finki.soa.internshipmanagement.service.CompanySnapshotReadService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/admin/")
@Tag(
    name = "Admin Internship Command API",
    description = "Handles admin commands related to internship management."
)
class AdminQueryRestApi(
    private val companySnapshotReadService: CompanySnapshotReadService
) {

    @Operation(
        summary = "Fetches the number of companies",
        description = "Returns the number of companies in the database (used for statistics)."
    )
    @GetMapping("/total")
    fun getNumberOfCompanies(): ResponseEntity<Int> {
        val internships = companySnapshotReadService.findAll().size

        return ResponseEntity.ok(internships)
    }
}
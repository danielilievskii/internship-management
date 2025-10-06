package mk.ukim.finki.soa.internshipmanagement.web

import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.tags.Tag
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipStatus
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.StatusType
import mk.ukim.finki.soa.internshipmanagement.model.view.InternshipCompositeView
import mk.ukim.finki.soa.internshipmanagement.model.view.InternshipDetailsCompositeView
import mk.ukim.finki.soa.internshipmanagement.model.view.InternshipStatusChangeView
import mk.ukim.finki.soa.internshipmanagement.service.InternshipDetailsViewReadService
import mk.ukim.finki.soa.internshipmanagement.service.InternshipStatusChangeViewReadService
import mk.ukim.finki.soa.internshipmanagement.service.InternshipViewReadService
import org.springframework.http.HttpHeaders
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@Tag(
    name = "Internship Query API",
    description = "Handles queries related to internships."
)
@RestController
@RequestMapping("/api/internships")
class InternshipQueryRestApi(
    val internshipViewReadService: InternshipViewReadService,
    val internshipDetailsViewReadService: InternshipDetailsViewReadService,
    val internshipStatusChangeViewReadService: InternshipStatusChangeViewReadService,
) {

    @Operation(
        summary = "Fetch internship by ID",
        description = "Retrieves the internship with the specified ID."
    )
    @GetMapping("/{internshipId}")
    fun findById(
        @PathVariable internshipId: InternshipId
    ): InternshipDetailsCompositeView {
        return internshipDetailsViewReadService.findCompositeById(internshipId)
    }

    @Operation(
        summary = "Fetch all status changes for an internship",
        description = "Retrieves all status change records associated with the internship identified by the given ID."
    )
    @GetMapping("/{internshipId}/status-changes")
    fun findStatusChangesById(
        @PathVariable internshipId: String
    ): List<InternshipStatusChangeView> {
        val id = InternshipId(internshipId)

        return internshipStatusChangeViewReadService.getStatusChangesForInternship(id)
    }

    @Operation(
        summary = "Fetch all internships",
        description = "Retrieves a list of all internships."
    )
    @GetMapping
    fun findAll(@RequestParam("status", required = false) status: String?): List<InternshipCompositeView> {

        if(status != null) {
            val statusType = StatusType.valueOf(status)
            return internshipViewReadService.findAll(InternshipStatus(statusType))
        } else {
            return internshipViewReadService.findAll(null)
        }
    }

    @GetMapping("/{internshipId}/download-cv")
    fun downloadStudentCv(
        @PathVariable internshipId: String
    ): ResponseEntity<ByteArray> {

        val id = InternshipId(internshipId)
        val studentCV = internshipDetailsViewReadService.getStudentCV(id)

        return ResponseEntity.ok()
            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"CV_${id.value}.pdf\"")
            .contentType(MediaType.APPLICATION_OCTET_STREAM)
            .body(studentCV.content)
    }
}
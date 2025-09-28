package mk.ukim.finki.soa.internshipmanagement.web

import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.tags.Tag
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.CompanyId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.StatusType
import mk.ukim.finki.soa.internshipmanagement.model.view.InternshipCompositeView
import mk.ukim.finki.soa.internshipmanagement.model.view.InternshipDetailsView
import mk.ukim.finki.soa.internshipmanagement.model.view.InternshipStatusChangeView
import mk.ukim.finki.soa.internshipmanagement.service.AuthService
import mk.ukim.finki.soa.internshipmanagement.service.InternshipDetailsViewReadService
import mk.ukim.finki.soa.internshipmanagement.service.InternshipStatusChangeViewReadService
import mk.ukim.finki.soa.internshipmanagement.service.InternshipViewReadService
import org.springframework.core.io.ByteArrayResource
import org.springframework.core.io.Resource
import org.springframework.data.domain.Page
import org.springframework.http.HttpHeaders
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

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
    val authService: AuthService
) {

    @Operation(
        summary = "Fetch internship by ID",
        description = "Retrieves the internship with the specified ID."
    )
    @GetMapping("/{internshipId}")
    fun findById(
        @PathVariable internshipId: InternshipId
    ): InternshipDetailsView {
        return internshipDetailsViewReadService.findById(internshipId)
    }

    @Operation(
        summary = "Fetch all internships",
        description = "Retrieves a list of all internships."
    )
    @GetMapping("/all")
    fun findAll(): List<InternshipCompositeView> {
        return internshipViewReadService.findAll()
    }

    @Operation(
        summary = "Fetch all internships in a pagination format",
        description = "Retrieves a paginated list of all internships."
    )
    @GetMapping
    fun findAll(
        @RequestParam(defaultValue = "0") pageNum: Int,
        @RequestParam(defaultValue = "5") pageSize: Int,
        @RequestParam(required = false) studentId: String?,
        @RequestParam(required = false) coordinatorId: String?,
        @RequestParam(required = false) internshipStatus: StatusType?,
        @RequestParam(required = false) companyId: String?,
    ): ResponseEntity<Page<InternshipCompositeView>> {

        val internshipsPage = internshipViewReadService.findAll(
            pageNum, pageSize, studentId, coordinatorId, internshipStatus, companyId)

        return ResponseEntity.ok(internshipsPage)
    }

    @Operation(
        summary = "Fetch all status changes for an internship",
        description = "Retrieves all status change records associated with the internship identified by the given ID."
    )
    @GetMapping("/{internshipId}/status-changes")
    fun findStatusChangesByInternshipId(
        @PathVariable internshipId: String
    ): List<InternshipStatusChangeView> {
        val id = InternshipId(internshipId)

        return internshipStatusChangeViewReadService.getStatusChangesForInternship(id)
    }

    @GetMapping("/{internshipId}/view-cv")
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

    @GetMapping("/{internshipId}/download-cv")
    fun viewStudentCv(
        @PathVariable internshipId: String
    ): ResponseEntity<Resource> {

        val id = InternshipId(internshipId)
        val studentCV = internshipDetailsViewReadService.getStudentCV(id)

        return ResponseEntity.ok()
            .contentType(MediaType.APPLICATION_PDF)
            .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=cv.pdf")
            .body(ByteArrayResource(studentCV.content))
    }
}
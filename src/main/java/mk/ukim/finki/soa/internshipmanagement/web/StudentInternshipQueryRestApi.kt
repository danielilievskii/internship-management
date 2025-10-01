package mk.ukim.finki.soa.internshipmanagement.web

import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.tags.Tag
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipStatus
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.StatusType
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.StudentId
import mk.ukim.finki.soa.internshipmanagement.model.view.InternshipCompositeView
import mk.ukim.finki.soa.internshipmanagement.service.AuthService
import mk.ukim.finki.soa.internshipmanagement.service.CompanySnapshotReadService
import mk.ukim.finki.soa.internshipmanagement.service.InternshipDetailsViewReadService
import mk.ukim.finki.soa.internshipmanagement.service.InternshipViewReadService
import org.springframework.data.domain.Page
import org.springframework.http.HttpHeaders
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@Tag(
    name = "Student Internship Query API",
    description = "Handles queries related to internships."
)
@RestController
@RequestMapping("/api/student/internships")
class StudentInternshipQueryRestApi(
    val internshipViewReadService: InternshipViewReadService,
    val internshipDetailsViewReadService: InternshipDetailsViewReadService,
    val authService: AuthService,
    val companySnapshotReadService: CompanySnapshotReadService,
) {

    fun detectFileType(bytes: ByteArray): String {
        if (bytes.size >= 4) {
            return when {
                bytes[0] == 0x25.toByte() && bytes[1] == 0x50.toByte() && bytes[2] == 0x44.toByte() && bytes[3] == 0x46.toByte() -> "pdf"
                bytes[0] == 0xD0.toByte() && bytes[1] == 0xCF.toByte() && bytes[2] == 0x11.toByte() && bytes[3] == 0xE0.toByte() -> "doc"
                bytes[0] == 0x50.toByte() && bytes[1] == 0x4B.toByte() && bytes[2] == 0x03.toByte() && bytes[3] == 0x04.toByte() -> "docx" // ZIP-based
                else -> "bin"
            }
        }
        return "bin"
    }

    @Operation(
        summary = "Fetches all internships for the currently logged student",
        description = "Retrieves a paginated list of all internships."
    )
    @GetMapping
    fun findAll(
        @RequestParam(defaultValue = "0") pageNum: Int,
        @RequestParam(defaultValue = "5") pageSize: Int,
        @RequestParam(required = false) coordinatorId: String?,
        @RequestParam(required = false) internshipStatus: StatusType?,
        @RequestParam(required = false) companyId: String?,
    ): ResponseEntity<Page<InternshipCompositeView>> {

        val (role, userId) = authService.getCurrentUser()
        val studentId = StudentId(userId)

        val internshipsPage = internshipViewReadService.findAll(
            pageNum, pageSize, studentId.value, coordinatorId, internshipStatus, companyId)

        return ResponseEntity.ok(internshipsPage)
    }

    @Operation(
        summary = "Fetches the StudentCV for the currently logged student",
        description = "Retrieves the StudentCV by fetching the logged in student and after retrieving the student cv if there is an internship with the status searching"
    )
    @GetMapping("/cv", produces = [MediaType.APPLICATION_PDF_VALUE])
    fun findSearchingCV() : ResponseEntity<ByteArray> {
        val student = authService.getAuthStudent()
        val internship = internshipDetailsViewReadService.findByStatusAndStudentId(
            InternshipStatus(StatusType.SEARCHING),
            student.id
        )

        val cvBytes = internship?.studentCV?.content
            ?: return ResponseEntity.noContent().build()

        val fileExtension = detectFileType(cvBytes)
        val contentType = when (fileExtension) {
            "pdf" -> "application/pdf"
            "doc" -> "application/msword"
            "docx" -> "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            else -> "application/octet-stream"
        }

        val fileName = "${student.index.value}.$fileExtension"

        return ResponseEntity.ok()
            .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"$fileName\"")
            .contentType(MediaType.parseMediaType(contentType))
            .body(cvBytes)
    }

    @Operation(
        summary = "Fetches the StudentCV for the currently logged student",
        description = "Retrieves the StudentCV by fetching the logged in student and after retrieving the student cv if there is an internship with the status searching"
    )
    @GetMapping("/myInternships")
    fun findAllStudentInternships(
        @RequestParam(defaultValue = "0") pageNum: Int,
        @RequestParam(defaultValue = "5") pageSize: Int,
        @RequestParam(required = false) companyName: String?,
        @RequestParam(required = false) internshipStatus: StatusType?,
    ) : ResponseEntity<Page<InternshipCompositeView>> {
        val student = authService.getAuthStudent()
        val coordinatorId = null
        val companyId = if (companyName != null) companySnapshotReadService.findByName(companyName)?.id?.value else null
        if (companyName != null && companyId == null)
        {
            val emptyPage: Page<InternshipCompositeView> = Page.empty()
            return ResponseEntity.ok(emptyPage)
        }
        return ResponseEntity.ok(internshipViewReadService.findAll(pageNum, pageSize, student.id.value, coordinatorId, internshipStatus, companyId));
    }
}
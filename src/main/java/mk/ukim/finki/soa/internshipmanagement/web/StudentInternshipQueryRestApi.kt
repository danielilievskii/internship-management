package mk.ukim.finki.soa.internshipmanagement.web

import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.tags.Tag
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipStatus
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.StatusType
import mk.ukim.finki.soa.internshipmanagement.model.view.InternshipCompositeView
import mk.ukim.finki.soa.internshipmanagement.service.AuthService
import mk.ukim.finki.soa.internshipmanagement.service.InternshipDetailsViewReadService
import mk.ukim.finki.soa.internshipmanagement.service.InternshipViewReadService
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
        description = "Retrieves a list of all internships."
    )
    @GetMapping()
    fun findAll(): ResponseEntity<List<InternshipCompositeView>> {
        val student = authService.getAuthStudent()
        val internships = internshipViewReadService.findAllByStudentId(student.id)

        return ResponseEntity.ok(internships)
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
}
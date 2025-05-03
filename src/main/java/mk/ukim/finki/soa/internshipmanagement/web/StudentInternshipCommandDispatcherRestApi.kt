package mk.ukim.finki.soa.internshipmanagement.web

import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.tags.Tag
import mk.ukim.finki.soa.internshipmanagement.model.command.student.*
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.StudentCV
import mk.ukim.finki.soa.internshipmanagement.service.StudentInternshipService
import mk.ukim.finki.soa.internshipmanagement.web.dto.student.AcceptInternshipCommandDto
import mk.ukim.finki.soa.internshipmanagement.web.dto.student.DeleteSearchingInternshipCommandDto
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile

@RestController
@RequestMapping("/student/submitCommand")
@Tag(
    name = "Student Internship Command API",
    description = "Handles student commands related to internship applications and management."
)
class StudentInternshipCommandDispatcherRestApi(
    private val studentInternshipService: StudentInternshipService
) {
    @Operation(
        summary = "Submit a command to create a new searching internship",
        description = "Creates a new searching internship by submitting a student CV."
    )
    @PostMapping("/CreateSearchingInternship", consumes = ["multipart/form-data"])
    fun createSearchingInternship(
        @RequestParam("studentCV") studentCVFile: MultipartFile
    ): ResponseEntity<Any> {
        val studentCV = StudentCV(studentCVFile.bytes)

        val command = CreateSearchingInternshipCommand(
            studentCV = studentCV
        )

        return ResponseEntity.ok(studentInternshipService.createSearchingInternship(command))
    }

    @Operation(
        summary = "Submit a command to edit a searching internship",
        description = "Edits an existing searching internship by submitting a new student CV and the internship ID."
    )
    @PostMapping("/EditSearchingInternship", consumes = ["multipart/form-data"])
    fun editSearchingInternship(
        @RequestParam("internshipId") internshipId: String,
        @RequestParam("studentCV") studentCVFile: MultipartFile
    ): ResponseEntity<Any> {
        val studentCV = StudentCV(studentCVFile.bytes)

        val command = EditSearchingInternshipCommand(
            internshipId = InternshipId(internshipId),
            newCV = studentCV,
        )

        return ResponseEntity.ok(studentInternshipService.editSearchingInternship(command))
    }

    @Operation(
        summary = "Submit a command to delete a searching internship",
        description = "Deletes an existing searching internship by submitting the internship ID."
    )
    @DeleteMapping("/DeleteSearchingInternship")
    fun deleteSearchingInternship(
        @RequestBody commandDto: DeleteSearchingInternshipCommandDto
    ): ResponseEntity<Any> {
        val command = DeleteSearchingInternshipCommand(
            internshipId = commandDto.internshipId
        )

        return ResponseEntity.ok(studentInternshipService.deleteSearchingInternship(command))
    }

    @Operation(
        summary = "Submit a command to accept an internship",
        description = "Accepts an existing internship by submitting the internship ID."
    )
    @PostMapping("/AcceptInternship")
    fun acceptInternship(
        @RequestBody commandDto: AcceptInternshipCommandDto
    ): ResponseEntity<Any> {
        val command = AcceptInternshipCommand(
            internshipId = commandDto.internshipId
        )
        return ResponseEntity.ok(studentInternshipService.acceptInternship(command))
    }

    @Operation(
        summary = "Submit a command to reject an internship",
        description = "Rejects an existing internship by submitting the internship ID."
    )
    @PostMapping("/RejectInternship")
    fun rejectInternship(
        @RequestBody commandDto: DeleteSearchingInternshipCommandDto
    ): ResponseEntity<Any> {
        val command = RejectInternshipCommand(
            internshipId = commandDto.internshipId
        )

        return ResponseEntity.ok(studentInternshipService.rejectInternship(command))
    }
}

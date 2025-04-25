package mk.ukim.finki.soa.internshipmanagement.web

import mk.ukim.finki.soa.internshipmanagement.model.command.CreateSearchingInternshipCommand
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipStatus
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.StatusType
import mk.ukim.finki.soa.internshipmanagement.service.StudentInternshipService
import mk.ukim.finki.soa.internshipmanagement.web.dto.CreateSearchingInternshipCommandDto
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile

@RestController
@RequestMapping("/api/student/internships")
class StudentInternshipCommandDispatcherRestApi(
    val studentInternshipService: StudentInternshipService
) {
    @PostMapping("/create")
    fun createSearchingInternship(
        @RequestParam("studentCV") studentCV: MultipartFile
    ): ResponseEntity<Any> {
        return ResponseEntity.ok(
            studentInternshipService.createSearchingInternship(
                CreateSearchingInternshipCommand(
                    studentCV = studentCV.bytes,
                )
            )
        )}
}

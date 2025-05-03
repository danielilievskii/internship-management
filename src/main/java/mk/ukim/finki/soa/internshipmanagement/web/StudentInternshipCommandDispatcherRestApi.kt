package mk.ukim.finki.soa.internshipmanagement.web

import mk.ukim.finki.soa.internshipmanagement.model.command.student.CreateSearchingInternshipCommand
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.StudentCV
import mk.ukim.finki.soa.internshipmanagement.service.StudentInternshipService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.multipart.MultipartFile

@RestController
@RequestMapping("/api/student/internships")
class StudentInternshipCommandDispatcherRestApi(
    private val studentInternshipService: StudentInternshipService
) {

    @PostMapping("/create")
    fun createSearchingInternship(
        @RequestParam("studentCV") studentCVFile: MultipartFile
    ): ResponseEntity<Any> {
        val studentCV = StudentCV(studentCVFile.bytes)

        val command = CreateSearchingInternshipCommand(
            internshipId = InternshipId(),
            studentCV = studentCV
        )

        return ResponseEntity.ok(studentInternshipService.createSearchingInternship(command))
    }
}

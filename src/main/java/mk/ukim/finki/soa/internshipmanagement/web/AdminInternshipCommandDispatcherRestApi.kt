package mk.ukim.finki.soa.internshipmanagement.web

import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.tags.Tag
import mk.ukim.finki.soa.internshipmanagement.model.command.ArchiveInternshipCommand
import mk.ukim.finki.soa.internshipmanagement.model.command.admin.ChangeCoordinatorCommand
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.CoordinatorId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId
import mk.ukim.finki.soa.internshipmanagement.service.AdminInternshipService
import mk.ukim.finki.soa.internshipmanagement.web.dto.ArchiveInternshipCommandDto
import mk.ukim.finki.soa.internshipmanagement.web.dto.admin.ChangeCoordinatorCommandDto
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/admin/submitCommand")
@Tag(
    name = "Admin Internship Command API",
    description = "Handles admin commands related to internship management."
)
class AdminInternshipCommandDispatcherRestApi(
    private val adminInternshipService: AdminInternshipService
) {

    @Operation(
        summary = "Archive internship as an admin",
        description = "Allows an admin to archive any internship."
    )
    @PostMapping("/ArchiveInternship")
    fun archiveInternship(
        @RequestBody commandDto: ArchiveInternshipCommandDto
    ): ResponseEntity<Any> {
        val command = ArchiveInternshipCommand(
            internshipId = InternshipId(commandDto.internshipId)
        )
        return ResponseEntity.ok(adminInternshipService.archiveInternship(command))
    }

    @PostMapping("/changeCoordinator")
    fun changeCoordinator(@RequestBody dto: ChangeCoordinatorCommandDto): ResponseEntity<Any> {
        val command = ChangeCoordinatorCommand(
            internshipId = InternshipId(dto.internshipId),
            newCoordinatorId = CoordinatorId(dto.newCoordinatorId)
        )
        return ResponseEntity.ok(adminInternshipService.changeCoordinator(command))
    }
}

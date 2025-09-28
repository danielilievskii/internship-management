package mk.ukim.finki.soa.internshipmanagement.application.mapper.impl

import mk.ukim.finki.soa.internshipmanagement.application.mapper.CommandMapper
import mk.ukim.finki.soa.internshipmanagement.model.command.student.AcceptInternshipCommand
import mk.ukim.finki.soa.internshipmanagement.model.resolver.CoordinatorResolver
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId
import mk.ukim.finki.soa.internshipmanagement.service.AuthService
import mk.ukim.finki.soa.internshipmanagement.web.dto.student.AcceptInternshipCommandDto
import org.springframework.stereotype.Component

@Component
class AcceptInternshipCommandMapper(
    private val authService: AuthService,
    private val coordinatorResolver: CoordinatorResolver
) : CommandMapper<AcceptInternshipCommandDto, AcceptInternshipCommand> {
    override fun fromDto(dto: AcceptInternshipCommandDto): AcceptInternshipCommand {
        val authStudent = authService.getAuthStudent()
        val coordinatorId = coordinatorResolver.resolveFromStudentIndex(authStudent.index.value)

        return AcceptInternshipCommand(
            internshipId = InternshipId(dto.internshipId),
            coordinatorId = coordinatorId
        )
    }
}

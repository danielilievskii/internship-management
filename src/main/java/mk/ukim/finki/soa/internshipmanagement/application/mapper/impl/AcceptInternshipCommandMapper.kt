package mk.ukim.finki.soa.internshipmanagement.application.mapper.impl

import mk.ukim.finki.soa.internshipmanagement.application.mapper.CommandMapper
import mk.ukim.finki.soa.internshipmanagement.model.command.student.AcceptInternshipCommand
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId
import mk.ukim.finki.soa.internshipmanagement.web.dto.student.AcceptInternshipCommandDto
import org.springframework.stereotype.Component

@Component
class AcceptInternshipCommandMapper(
) : CommandMapper<AcceptInternshipCommandDto, AcceptInternshipCommand> {
    override fun fromDto(dto: AcceptInternshipCommandDto): AcceptInternshipCommand {
        return AcceptInternshipCommand(
            internshipId = InternshipId(dto.internshipId),
        )
    }
}

package mk.ukim.finki.soa.internshipmanagement.application.assembler

import mk.ukim.finki.soa.internshipmanagement.application.mapper.InternshipMapper
import mk.ukim.finki.soa.internshipmanagement.model.view.InternshipCompositeView
import mk.ukim.finki.soa.internshipmanagement.model.view.InternshipView
import mk.ukim.finki.soa.internshipmanagement.repository.CompanyViewJpaRepository
import mk.ukim.finki.soa.internshipmanagement.repository.CoordinatorViewJpaRepository
import mk.ukim.finki.soa.internshipmanagement.repository.StudentViewJpaRepository
import org.springframework.stereotype.Component

@Component
class InternshipAssembler(
    private val studentViewJpaRepository: StudentViewJpaRepository,
    private val companyViewJpaRepository: CompanyViewJpaRepository,
    private val coordinatorViewJpaRepository: CoordinatorViewJpaRepository,
    private val internshipMapper: InternshipMapper
) {

    fun assembleList(internships: List<InternshipView>): List<InternshipCompositeView> {

        val studentIds = internships.map { it.studentId }.toSet()
        val students = studentViewJpaRepository.findAllById(studentIds).associateBy { it.id }

        val companyIds = internships.map { it.companyId }.toSet()
        val companies = companyViewJpaRepository.findAllById(companyIds).associateBy { it.id }

        val coordinatorIds = internships.map { it.coordinatorId }.toSet()
        val coordinators = coordinatorViewJpaRepository.findAllById(coordinatorIds).associateBy { it.id }

        return internships.map { internship ->
            internshipMapper.toCompositeView(
                internship,
                students[internship.studentId]!!,
                companies[internship.companyId],
                coordinators[internship.coordinatorId]
            )
        }
    }
}
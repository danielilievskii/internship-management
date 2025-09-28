package mk.ukim.finki.soa.internshipmanagement.application.assembler

import mk.ukim.finki.soa.internshipmanagement.application.mapper.InternshipDetailsMapper
import mk.ukim.finki.soa.internshipmanagement.model.view.InternshipDetailsCompositeView
import mk.ukim.finki.soa.internshipmanagement.model.view.InternshipDetailsView
import mk.ukim.finki.soa.internshipmanagement.repository.CompanyViewJpaRepository
import mk.ukim.finki.soa.internshipmanagement.repository.CoordinatorViewJpaRepository
import mk.ukim.finki.soa.internshipmanagement.repository.StudentViewJpaRepository
import org.springframework.stereotype.Component

@Component
class InternshipDetailsAssembler(
    private val studentViewJpaRepository: StudentViewJpaRepository,
    private val companyViewJpaRepository: CompanyViewJpaRepository,
    private val coordinatorViewJpaRepository: CoordinatorViewJpaRepository,
    private val internshipDetailsMapper: InternshipDetailsMapper
) {
    fun assemble(internship: InternshipDetailsView): InternshipDetailsCompositeView {
        val student = studentViewJpaRepository.findById(internship.studentId).orElse(null)
        val company = internship.companyId?.let { companyViewJpaRepository.findById(it).orElse(null) }
        val coordinator = internship.coordinatorId?.let { coordinatorViewJpaRepository.findById(it).orElse(null) }

        return internshipDetailsMapper.toCompositeView(internship, student, company, coordinator)
    }
}
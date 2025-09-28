package mk.ukim.finki.soa.internshipmanagement.service.impl.query

import mk.ukim.finki.soa.internshipmanagement.application.assembler.InternshipDetailsAssembler
import mk.ukim.finki.soa.internshipmanagement.exception.InternshipNotFoundException
import mk.ukim.finki.soa.internshipmanagement.exception.InternshipStudentCVNotFoundException
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.StudentCV
import mk.ukim.finki.soa.internshipmanagement.model.view.InternshipDetailsCompositeView
import mk.ukim.finki.soa.internshipmanagement.model.view.InternshipDetailsView
import mk.ukim.finki.soa.internshipmanagement.repository.InternshipDetailsViewJpaRepository
import mk.ukim.finki.soa.internshipmanagement.service.AccessPolicyService
import mk.ukim.finki.soa.internshipmanagement.service.InternshipDetailsViewReadService
import org.springframework.stereotype.Service

@Service
class InternshipDetailsViewReadServiceImpl(
    val internshipDetailsViewJpaRepository: InternshipDetailsViewJpaRepository,
    val internshipDetailsAssembler: InternshipDetailsAssembler,
    val accessPolicyService: AccessPolicyService,
) : InternshipDetailsViewReadService {

    override fun findById(id: InternshipId): InternshipDetailsView {
        val internship: InternshipDetailsView = internshipDetailsViewJpaRepository.findByIdWithDetails(id)
            ?: throw InternshipNotFoundException(id)

        accessPolicyService.assertCanViewInternship(internship)

        return internship
    }

    override fun findCompositeById(id: InternshipId): InternshipDetailsCompositeView {
        val internship: InternshipDetailsView = findById(id)

        return internshipDetailsAssembler.assemble(internship)
    }

    override fun getStudentCV(id: InternshipId): StudentCV {
        val internship: InternshipDetailsView = findById(id)

        return internship.studentCV
            ?: throw InternshipStudentCVNotFoundException(id)
    }
}
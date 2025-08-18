package mk.ukim.finki.soa.internshipmanagement.service.impl.query

import mk.ukim.finki.soa.internshipmanagement.exception.InternshipNotFoundException
import mk.ukim.finki.soa.internshipmanagement.exception.InternshipStudentCVNotFoundException
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.StudentCV
import mk.ukim.finki.soa.internshipmanagement.model.view.InternshipDetailsView
import mk.ukim.finki.soa.internshipmanagement.repository.InternshipDetailsViewJpaRepository
import mk.ukim.finki.soa.internshipmanagement.service.InternshipDetailsViewReadService
import org.springframework.stereotype.Service

@Service
class InternshipDetailsViewServiceImpl(
    val internshipDetailsViewJpaRepository: InternshipDetailsViewJpaRepository
) : InternshipDetailsViewReadService {

    override fun findById(id: InternshipId): InternshipDetailsView {
        return internshipDetailsViewJpaRepository.findByIdWithDetails(id)
            ?: throw InternshipNotFoundException(id)
    }

    override fun getStudentCV(id: InternshipId): StudentCV {
        val internship = findById(id)

        return internship.studentCV
            ?: throw InternshipStudentCVNotFoundException(id)
    }
}
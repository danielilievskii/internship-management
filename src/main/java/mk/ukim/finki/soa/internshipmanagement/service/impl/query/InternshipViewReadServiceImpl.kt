package mk.ukim.finki.soa.internshipmanagement.service.impl.query

import mk.ukim.finki.soa.internshipmanagement.application.assembler.InternshipAssembler
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipStatus
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.StatusType
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.StudentId
import mk.ukim.finki.soa.internshipmanagement.model.view.InternshipCompositeView
import mk.ukim.finki.soa.internshipmanagement.model.view.InternshipView
import mk.ukim.finki.soa.internshipmanagement.repository.InternshipViewJpaRepository
import mk.ukim.finki.soa.internshipmanagement.service.InternshipViewReadService
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageImpl
import org.springframework.data.domain.PageRequest
import org.springframework.data.jpa.domain.Specification
import org.springframework.stereotype.Service

@Service
class InternshipViewReadServiceImpl(
    val internshipViewJpaRepository: InternshipViewJpaRepository,
    val internshipAssembler: InternshipAssembler,
) : InternshipViewReadService {

    override fun existsById(id: InternshipId): Boolean {
        return internshipViewJpaRepository.existsById(id)
    }

    override fun existsByStatusAndStudentId(status: InternshipStatus, studentId: StudentId): Boolean {
        return internshipViewJpaRepository.existsByStatusAndStudentId(status, studentId)
    }

    override fun findByStatusAndStudentId(status: InternshipStatus, id: StudentId): InternshipView? {
        val internships: List<InternshipView> = internshipViewJpaRepository.findAllByStatusAndStudentId(status, id)
        // We have to take all at first because we don't have constraints on the backend
        return internships.firstOrNull()
    }

    // TODO: This method is used for testing purposes and should be removed
    override fun findAll(): List<InternshipCompositeView> {
        val internshipViewList = internshipViewJpaRepository.findAll()

        val internshipCompositeViewList: List<InternshipCompositeView> =
            internshipAssembler.assembleList(internshipViewList)

        return internshipCompositeViewList
    }

    // TODO: Change all arguments with value objects and do a check if the student/coordinator/company exist
    override fun findAll(
        pageNum: Int,
        pageSize: Int,
        studentId: String?,
        coordinatorId: String?,
        internshipStatus: StatusType?,
        companyId: String?
    ): Page<InternshipCompositeView> {
        val pageable = PageRequest.of(pageNum, pageSize)

        val spec = Specification.where<InternshipView>(null)
            .and(studentId?.let {
                Specification { root, _, cb ->
                    cb.equal(root.get<String>("studentId").get<String>("value"), it)
                }
            })
            .and(coordinatorId?.let {
                Specification { root, _, cb ->
                    cb.equal(root.get<String>("coordinatorId").get<String>("value"), it)
                }
            })
            .and(internshipStatus?.let {
                Specification { root, _, cb ->
                    cb.equal(root.get<String>("status").get<String>("value"), it.name)
                }
            })
            .and(companyId?.let {
                Specification { root, _, cb ->
                    cb.equal(root.get<String>("companyId").get<String>("value"), it)
                }
            })

        val page: Page<InternshipView> = internshipViewJpaRepository.findAll(spec, pageable)

        val internshipCompositeViewList: List<InternshipCompositeView> =
            internshipAssembler.assembleList(page.content)

        return PageImpl(internshipCompositeViewList, page.pageable, page.totalElements)
    }
}
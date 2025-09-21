package mk.ukim.finki.soa.internshipmanagement.service.impl.query

import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipStatus
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.StatusType
import mk.ukim.finki.soa.internshipmanagement.model.view.InternshipCompositeView
import mk.ukim.finki.soa.internshipmanagement.model.view.InternshipView
import mk.ukim.finki.soa.internshipmanagement.repository.CompanyViewJpaRepository
import mk.ukim.finki.soa.internshipmanagement.repository.CoordinatorViewJpaRepository
import mk.ukim.finki.soa.internshipmanagement.repository.InternshipViewJpaRepository
import mk.ukim.finki.soa.internshipmanagement.repository.StudentViewJpaRepository
import mk.ukim.finki.soa.internshipmanagement.service.InternshipViewReadService
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageImpl
import org.springframework.data.domain.PageRequest
import org.springframework.data.jpa.domain.Specification
import org.springframework.stereotype.Service

@Service
class InternshipViewReadServiceImpl(
    val internshipViewJpaRepository: InternshipViewJpaRepository,
    val studentViewJpaRepository: StudentViewJpaRepository,
    val companyViewJpaRepository: CompanyViewJpaRepository,
    val coordinatorViewJpaRepository: CoordinatorViewJpaRepository
) : InternshipViewReadService {

    override fun existsById(id: InternshipId): Boolean {
        return internshipViewJpaRepository.existsById(id)
    }

    override fun findAll(): List<InternshipCompositeView> {
        val internshipViewList = internshipViewJpaRepository.findAll()

        val internshipCompositeViewList: List<InternshipCompositeView> =
            toInternshipCompositeViewList(internshipViewList)

        return internshipCompositeViewList
    }

    override fun findAll(pageNum: Int, pageSize: Int): Page<InternshipCompositeView> {
        val pageable = PageRequest.of(pageNum, pageSize)
        val page: Page<InternshipView> = internshipViewJpaRepository.findAll(pageable)

        val internshipCompositeViewList: List<InternshipCompositeView> =
            toInternshipCompositeViewList(page.content)

        return PageImpl(internshipCompositeViewList, page.pageable, page.totalElements)
    }

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
            toInternshipCompositeViewList(page.content)

        return PageImpl(internshipCompositeViewList, page.pageable, page.totalElements)
    }

    override fun findAllByStatus(status: InternshipStatus): List<InternshipView> {
        return internshipViewJpaRepository.findAllByStatus(status)
    }

    fun toInternshipCompositeViewList(internships: List<InternshipView>): List<InternshipCompositeView> {

        val studentIds = internships.map { it.studentId }.toSet()

        val students = studentViewJpaRepository.findAllById(studentIds)
            .associateBy { it.id }

        val companyIds = internships.map { it.companyId }.toSet()
        val companies = companyViewJpaRepository.findAllById(companyIds)
            .associateBy { it.id }

        val coordinatorIds = internships.map { it.coordinatorId }.toSet()
        val coordinators = coordinatorViewJpaRepository.findAllById(coordinatorIds)
            .associateBy { it.id }

        return internships.map {
            InternshipCompositeView(
                id = it.id,
                status = it.status,
                studentView = students[it.studentId]!!,
                companyView = companies[it.companyId],
                coordinatorView = coordinators[it.coordinatorId],
                period = it.period,
            )
        }
    }
}
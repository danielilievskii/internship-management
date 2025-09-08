package mk.ukim.finki.soa.internshipmanagement.service.impl.query

import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipStatus
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.StatusType
import mk.ukim.finki.soa.internshipmanagement.model.view.InternshipView
import mk.ukim.finki.soa.internshipmanagement.repository.InternshipViewJpaRepository
import mk.ukim.finki.soa.internshipmanagement.service.InternshipViewReadService
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.data.jpa.domain.Specification
import org.springframework.stereotype.Service

@Service
class InternshipViewReadServiceImpl(
    val internshipViewJpaRepository: InternshipViewJpaRepository,
) : InternshipViewReadService
{
    override fun existsById(id: InternshipId): Boolean {
        return internshipViewJpaRepository.existsById(id)
    }

    override fun findAll(): List<InternshipView> {
        return internshipViewJpaRepository.findAll()
    }

    override fun findAll(pageNum: Int, pageSize: Int): Page<InternshipView> {
        val pageable = PageRequest.of(pageNum, pageSize)
        return internshipViewJpaRepository.findAll(pageable)
    }

    override fun findAll(
        pageNum: Int,
        pageSize: Int,
        studentId: String?,
        coordinatorId: String?,
        internshipStatus: StatusType?,
        companyId: String?
    ): Page<InternshipView> {
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

        return internshipViewJpaRepository.findAll(spec, pageable)
    }

    override fun findAllByStatus(status: InternshipStatus): List<InternshipView> {
        return internshipViewJpaRepository.findAllByStatus(status);
    }
}
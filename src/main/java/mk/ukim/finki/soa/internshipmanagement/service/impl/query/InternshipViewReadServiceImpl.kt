package mk.ukim.finki.soa.internshipmanagement.service.impl.query

import mk.ukim.finki.soa.internshipmanagement.exception.InternshipNotFoundException
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipStatus
import mk.ukim.finki.soa.internshipmanagement.model.view.InternshipView
import mk.ukim.finki.soa.internshipmanagement.repository.InternshipViewJpaRepository
import mk.ukim.finki.soa.internshipmanagement.service.InternshipViewReadService
import org.springframework.stereotype.Service

@Service
class InternshipViewReadServiceImpl(val internshipViewJpaRepository: InternshipViewJpaRepository) : InternshipViewReadService {
    override fun existsById(id: InternshipId): Boolean {
        return internshipViewJpaRepository.existsById(id)
    }

    override fun findById(id: InternshipId): InternshipView {
        return internshipViewJpaRepository.findById(id).orElseThrow { InternshipNotFoundException(id) }
    }

    override fun findAll(): List<InternshipView> {
        return internshipViewJpaRepository.findAll()
    }

    override fun findAllByStatus(status: InternshipStatus): List<InternshipView> {
        return internshipViewJpaRepository.findAllByStatus(status);
    }
}
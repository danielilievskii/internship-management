package mk.ukim.finki.soa.internshipmanagement.service.impl.query

import mk.ukim.finki.soa.internshipmanagement.exception.UserNotFoundException
import mk.ukim.finki.soa.internshipmanagement.model.snapshot.CompanySnapshot
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.Email
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.Name
import mk.ukim.finki.soa.internshipmanagement.repository.CompanySnapshotJpaRepository
import mk.ukim.finki.soa.internshipmanagement.service.CompanySnapshotReadService
import org.springframework.stereotype.Service

@Service
class CompanySnapshotReadServiceImpl(
    val companyRepository: CompanySnapshotJpaRepository,
) : CompanySnapshotReadService {

    override fun findByEmail(email: String): CompanySnapshot {

        return companyRepository.findByEmail(Email(email))
            ?: throw UserNotFoundException("Company with email $email not found")
    }

    override fun findByName(name: String): CompanySnapshot? {
        return companyRepository.findByNameIgnoreCase(name).firstOrNull()
    }

    override fun findAll(): List<CompanySnapshot?> {
        return companyRepository.findAll()
    }
}
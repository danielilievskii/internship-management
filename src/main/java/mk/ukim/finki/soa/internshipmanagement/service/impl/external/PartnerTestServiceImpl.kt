package mk.ukim.finki.soa.internshipmanagement.service.impl.external

import mk.ukim.finki.soa.internshipmanagement.client.PartnersManagementClient
import mk.ukim.finki.soa.internshipmanagement.client.dto.PartnerDto
import mk.ukim.finki.soa.internshipmanagement.model.snapshot.CompanySnapshot
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.CompanyId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.Email
import mk.ukim.finki.soa.internshipmanagement.repository.CompanySnapshotJpaRepository
import mk.ukim.finki.soa.internshipmanagement.service.PartnerTestService
import org.springframework.stereotype.Service

@Service
class PartnerTestServiceImpl (
    val companyRepository: CompanySnapshotJpaRepository,
    val client : PartnersManagementClient)
    : PartnerTestService {

    override fun refreshActivePartners(): List<PartnerDto> {
        val partners = client.getActivePartners()
        partners.forEach { partner ->
            companyRepository.save(
                CompanySnapshot(
                    id = CompanyId(partner.id),
                    name = partner.name,
                    email = Email(partner.email),
                    isActive = true
                )
            )
        }
        return partners
    }
}
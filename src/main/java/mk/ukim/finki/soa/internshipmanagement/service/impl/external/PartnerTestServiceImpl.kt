package mk.ukim.finki.soa.internshipmanagement.service.impl.external

import mk.ukim.finki.soa.internshipmanagement.client.PartnersManagementClient
import mk.ukim.finki.soa.internshipmanagement.client.dto.PartnerDto
import mk.ukim.finki.soa.internshipmanagement.exception.PartnerNotFoundException
import mk.ukim.finki.soa.internshipmanagement.infrastructure.kafka.dto.PartnerActivationChangedEventDto
import mk.ukim.finki.soa.internshipmanagement.model.snapshot.CompanySnapshot
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.CompanyId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.Email
import mk.ukim.finki.soa.internshipmanagement.repository.CompanySnapshotJpaRepository
import mk.ukim.finki.soa.internshipmanagement.service.PartnerTestService
import org.springframework.stereotype.Service
import java.util.concurrent.CompletableFuture

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

    override fun changePartnerActivation(eventDto: PartnerActivationChangedEventDto): CompletableFuture<CompanyId> {
        val partner = companyRepository.findById(CompanyId(eventDto.id))
            .orElseThrow { PartnerNotFoundException(CompanyId(eventDto.id)) }

        partner.isActive = eventDto.isActive
        companyRepository.save(partner)

        return CompletableFuture.completedFuture(partner.id)
    }

    override fun createPartner(): CompletableFuture<CompanyId> {
        TODO("Not yet implemented")
    }

    override fun editPartner(): CompletableFuture<CompanyId> {
        TODO("Not yet implemented")
    }

    override fun removePartner(): CompletableFuture<CompanyId> {
        TODO("Not yet implemented")
    }
}
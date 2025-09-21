package mk.ukim.finki.soa.internshipmanagement.service.impl.external

import mk.ukim.finki.soa.internshipmanagement.client.PartnersManagementClient
import mk.ukim.finki.soa.internshipmanagement.client.dto.PartnerDto
import mk.ukim.finki.soa.internshipmanagement.exception.PartnerNotFoundException
import mk.ukim.finki.soa.internshipmanagement.infrastructure.kafka.dto.PartnerActivationChangedEventDto
import mk.ukim.finki.soa.internshipmanagement.infrastructure.kafka.dto.PartnerCreatedEventDto
import mk.ukim.finki.soa.internshipmanagement.infrastructure.kafka.dto.PartnerDeletedEventDto
import mk.ukim.finki.soa.internshipmanagement.infrastructure.kafka.dto.PartnerEditedEventDto
import mk.ukim.finki.soa.internshipmanagement.model.snapshot.CompanySnapshot
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.CompanyId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.Email
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.Name
import mk.ukim.finki.soa.internshipmanagement.repository.CompanySnapshotJpaRepository
import mk.ukim.finki.soa.internshipmanagement.service.PartnerService
import org.springframework.stereotype.Service
import java.util.concurrent.CompletableFuture

@Service
class PartnerServiceImpl (
    val companyRepository: CompanySnapshotJpaRepository,
    val client : PartnersManagementClient)
    : PartnerService {

    override fun refreshActivePartners(): List<PartnerDto> {
        companyRepository.deleteAll()

        val partners = client.getActivePartners()
        partners.forEach { partner ->
            companyRepository.save(
                CompanySnapshot(
                    id = CompanyId(partner.id),
                    name = Name(partner.name),
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

    override fun createPartner(eventDto: PartnerCreatedEventDto): CompletableFuture<CompanyId> {
        val partner = CompanySnapshot(
            id = CompanyId(eventDto.id),
            name = Name(eventDto.name),
            email = Email(eventDto.email),
            isActive = eventDto.isActive
        )
        companyRepository.save(partner)

        return CompletableFuture.completedFuture(partner.id)
    }

    override fun editPartner(eventDto: PartnerEditedEventDto): CompletableFuture<CompanyId> {
        val partner = companyRepository.findById(CompanyId(eventDto.id))
            .orElseThrow { PartnerNotFoundException(CompanyId(eventDto.id)) }

        partner.name = Name(eventDto.name)
        partner.email = Email(eventDto.email)
        partner.isActive = eventDto.isActive
        companyRepository.save(partner)

        return CompletableFuture.completedFuture(partner.id)
    }

    override fun removePartner(eventDto: PartnerDeletedEventDto): CompletableFuture<CompanyId> {
        val partnerId = CompanyId(eventDto.id)

        companyRepository.deleteById(partnerId)

        return CompletableFuture.completedFuture(partnerId)
    }
}
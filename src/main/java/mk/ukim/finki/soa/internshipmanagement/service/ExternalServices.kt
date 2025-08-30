package mk.ukim.finki.soa.internshipmanagement.service

import mk.ukim.finki.soa.internshipmanagement.client.dto.PartnerDto
import mk.ukim.finki.soa.internshipmanagement.infrastructure.kafka.dto.PartnerActivationChangedEventDto
import mk.ukim.finki.soa.internshipmanagement.infrastructure.kafka.dto.PartnerCreatedEventDto
import mk.ukim.finki.soa.internshipmanagement.infrastructure.kafka.dto.PartnerDeletedEventDto
import mk.ukim.finki.soa.internshipmanagement.infrastructure.kafka.dto.PartnerEditedEventDto
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.CompanyId
import java.util.concurrent.CompletableFuture

interface PartnerTestService {
    fun refreshActivePartners(): List<PartnerDto>
    fun changePartnerActivation(eventDto: PartnerActivationChangedEventDto): CompletableFuture<CompanyId>
    fun createPartner(eventDto: PartnerCreatedEventDto): CompletableFuture<CompanyId>
    fun editPartner(eventDto: PartnerEditedEventDto): CompletableFuture<CompanyId>
    fun removePartner(eventDto: PartnerDeletedEventDto): CompletableFuture<CompanyId>
}

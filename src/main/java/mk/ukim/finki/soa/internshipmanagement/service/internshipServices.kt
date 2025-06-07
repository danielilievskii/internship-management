package mk.ukim.finki.soa.internshipmanagement.service

import mk.ukim.finki.soa.internshipmanagement.client.dto.PartnerDto
import mk.ukim.finki.soa.internshipmanagement.infrastructure.kafka.dto.PartnerActivationChangedEventDto
import mk.ukim.finki.soa.internshipmanagement.model.command.company.SubmitInternshipCommand
import mk.ukim.finki.soa.internshipmanagement.model.command.company.SubmitAgreedInternshipCommand
import mk.ukim.finki.soa.internshipmanagement.model.command.student.*
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.CompanyId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipStatus
import mk.ukim.finki.soa.internshipmanagement.model.view.InternshipView
import java.util.concurrent.CompletableFuture

interface StudentInternshipService {
    fun createSearchingInternship(command: CreateSearchingInternshipCommand): CompletableFuture<InternshipId>
    fun editSearchingInternship(command: EditSearchingInternshipCommand): CompletableFuture<InternshipId>
    fun deleteSearchingInternship(command: DeleteSearchingInternshipCommand): CompletableFuture<InternshipId>
    fun acceptInternship(command: AcceptInternshipCommand): CompletableFuture<InternshipId>
    fun rejectInternship(command: RejectInternshipCommand): CompletableFuture<InternshipId>
    fun createInternshipWeek(command: CreateInternshipWeekCommand): CompletableFuture<InternshipId>
    fun deleteInternshipWeek(command: DeleteInternshipWeekCommand): CompletableFuture<InternshipId>
    fun editInternshipWeek(command: EditInternshipWeekCommand): CompletableFuture<InternshipId>
    fun submitJournal(command: SubmitJournalCommand): CompletableFuture<InternshipId>
}

interface CompanyInternshipService {
    fun submitInternship(command: SubmitInternshipCommand): CompletableFuture<InternshipId>
    fun submitAgreedInternship(command: SubmitAgreedInternshipCommand): CompletableFuture<InternshipId>
}

interface InternshipViewReadService {
    fun existsById(id: InternshipId): Boolean
    fun findById(id: InternshipId): InternshipView
    fun findAll(): List<InternshipView>
    fun findAllByStatus(status: InternshipStatus): List<InternshipView>
}

interface PartnerTestService{
    fun refreshActivePartners(): List<PartnerDto>
    fun changePartnerActivation(eventDto: PartnerActivationChangedEventDto): CompletableFuture<CompanyId>
    fun createPartner(): CompletableFuture<CompanyId>
    fun editPartner(): CompletableFuture<CompanyId>
    fun removePartner(): CompletableFuture<CompanyId>
}


package mk.ukim.finki.soa.internshipmanagement.service

import mk.ukim.finki.soa.internshipmanagement.model.command.company.*
import mk.ukim.finki.soa.internshipmanagement.model.command.coordinator.ArchiveInternshipCommand
import mk.ukim.finki.soa.internshipmanagement.model.command.coordinator.CoordinatorAddWeekCommentCommand
import mk.ukim.finki.soa.internshipmanagement.model.command.coordinator.InvalidateJournalByCoordinatorCommand
import mk.ukim.finki.soa.internshipmanagement.model.command.coordinator.ValidateJournalByCoordinatorCommand
import mk.ukim.finki.soa.internshipmanagement.model.command.student.*
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.*
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
    fun addWeekComment(command: CompanyAddWeekCommentCommand): CompletableFuture<InternshipId>
    fun invalidateJournalByCompany(command: InvalidateJournalByCompanyCommand): CompletableFuture<InternshipId>
    fun validateJournalByCompany(command: ValidateJournalByCompanyCommand): CompletableFuture<InternshipId>
}

interface CoordinatorInternshipService {
    fun archiveInternship(command: ArchiveInternshipCommand): CompletableFuture<InternshipId>
    fun addWeekComment(command: CoordinatorAddWeekCommentCommand): CompletableFuture<InternshipId>
    fun invalidateJournalByCoordinator(command: InvalidateJournalByCoordinatorCommand): CompletableFuture<InternshipId>
    fun validateJournalByCoordinator(command: ValidateJournalByCoordinatorCommand): CompletableFuture<InternshipId>
}

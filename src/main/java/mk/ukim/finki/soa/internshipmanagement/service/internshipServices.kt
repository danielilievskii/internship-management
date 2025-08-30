package mk.ukim.finki.soa.internshipmanagement.service

import mk.ukim.finki.soa.internshipmanagement.client.dto.PartnerDto
import mk.ukim.finki.soa.internshipmanagement.infrastructure.kafka.dto.PartnerActivationChangedEventDto
import mk.ukim.finki.soa.internshipmanagement.infrastructure.kafka.dto.PartnerCreatedEventDto
import mk.ukim.finki.soa.internshipmanagement.infrastructure.kafka.dto.PartnerDeletedEventDto
import mk.ukim.finki.soa.internshipmanagement.infrastructure.kafka.dto.PartnerEditedEventDto
import mk.ukim.finki.soa.internshipmanagement.model.command.company.*
import mk.ukim.finki.soa.internshipmanagement.model.command.coordinator.ArchiveInternshipCommand
import mk.ukim.finki.soa.internshipmanagement.model.command.coordinator.CoordinatorAddWeekCommentCommand
import mk.ukim.finki.soa.internshipmanagement.model.command.coordinator.InvalidateJournalByCoordinatorCommand
import mk.ukim.finki.soa.internshipmanagement.model.command.coordinator.ValidateJournalByCoordinatorCommand
import mk.ukim.finki.soa.internshipmanagement.model.command.student.*
import mk.ukim.finki.soa.internshipmanagement.model.snapshot.CompanySnapshot
import mk.ukim.finki.soa.internshipmanagement.model.snapshot.CoordinatorSnapshot
import mk.ukim.finki.soa.internshipmanagement.model.snapshot.StudentSnapshot
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.*
import mk.ukim.finki.soa.internshipmanagement.model.view.InternshipDetailsView
import mk.ukim.finki.soa.internshipmanagement.model.view.InternshipStatusChangeView
import mk.ukim.finki.soa.internshipmanagement.model.view.InternshipView
import org.springframework.data.domain.Page;
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

interface InternshipViewReadService {
    fun existsById(id: InternshipId): Boolean
    fun findAll(): List<InternshipView>
    fun findAll(pageNum: Int, pageSize: Int): Page<InternshipView>
    fun findAll(pageNum: Int, pageSize: Int, studentIndex: String, coordinatorName: String, internshipStatus: StatusType, companyId: String): Page<InternshipView>
    fun findAllByStatus(status: InternshipStatus): List<InternshipView>
}

interface InternshipDetailsViewReadService {
    fun findById(id: InternshipId): InternshipDetailsView
    fun getStudentCV(id: InternshipId): StudentCV
}

interface InternshipStatusChangeViewReadService {
    fun getStatusChangesForInternship(id: InternshipId): List<InternshipStatusChangeView>
}

interface PartnerTestService {
    fun refreshActivePartners(): List<PartnerDto>
    fun changePartnerActivation(eventDto: PartnerActivationChangedEventDto): CompletableFuture<CompanyId>
    fun createPartner(eventDto: PartnerCreatedEventDto): CompletableFuture<CompanyId>
    fun editPartner(eventDto: PartnerEditedEventDto): CompletableFuture<CompanyId>
    fun removePartner(eventDto: PartnerDeletedEventDto): CompletableFuture<CompanyId>
}

interface CoordinatorInternshipService {
    fun archiveInternship(command: ArchiveInternshipCommand): CompletableFuture<InternshipId>
    fun addWeekComment(command: CoordinatorAddWeekCommentCommand): CompletableFuture<InternshipId>
    fun invalidateJournalByCoordinator(command: InvalidateJournalByCoordinatorCommand): CompletableFuture<InternshipId>
    fun validateJournalByCoordinator(command: ValidateJournalByCoordinatorCommand): CompletableFuture<InternshipId>
}

interface AuthService {
    fun getAuthUserEmail(): String
    fun getAuthStudent(): StudentSnapshot
    fun getAuthCompany(): CompanySnapshot
    fun getAuthCoordinator(): CoordinatorSnapshot
}

interface StudentSnapshotReadService {
    fun findByEmail(email: String): StudentSnapshot
    fun findByIndex(index: String): StudentSnapshot
}

interface CompanySnapshotReadService {
    fun findByEmail(email: String): CompanySnapshot

}

interface CoordinatorSnapshotReadService {
    fun findByEmail(email: String): CoordinatorSnapshot
}

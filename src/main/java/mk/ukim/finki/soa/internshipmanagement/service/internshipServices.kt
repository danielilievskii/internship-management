package mk.ukim.finki.soa.internshipmanagement.service

import mk.ukim.finki.soa.internshipmanagement.model.command.company.ProposeInternshipToStudentCommand
import mk.ukim.finki.soa.internshipmanagement.model.command.company.SubmitAgreedInternshipCommand
import mk.ukim.finki.soa.internshipmanagement.model.command.student.*
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

}

interface CompanyInternshipService {
    fun proposeInternship(command: ProposeInternshipToStudentCommand): CompletableFuture<InternshipId>
    fun submitAgreedInternship(command: SubmitAgreedInternshipCommand): CompletableFuture<InternshipId>
}

interface InternshipViewReadService {
    fun existsById(id: InternshipId): Boolean
    fun findById(id: InternshipId): InternshipView
    fun findAll(): List<InternshipView>
    fun findAllByStatus(status: InternshipStatus): List<InternshipView>
}


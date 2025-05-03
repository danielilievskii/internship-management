package mk.ukim.finki.soa.internshipmanagement.service

import mk.ukim.finki.soa.internshipmanagement.model.command.company.ProposeInternshipToStudentCommand
import mk.ukim.finki.soa.internshipmanagement.model.command.student.CreateSearchingInternshipCommand
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipStatus
import mk.ukim.finki.soa.internshipmanagement.model.view.InternshipView
import java.util.concurrent.CompletableFuture

interface StudentInternshipService {
    fun createSearchingInternship(command: CreateSearchingInternshipCommand): CompletableFuture<InternshipId>
}

interface CompanyInternshipService {
        fun submitInternship(command: ProposeInternshipToStudentCommand): CompletableFuture<InternshipId>
}

interface InternshipViewReadService {
    fun existsById(id: InternshipId) : Boolean
    fun findById(id: InternshipId): InternshipView
    fun findAll(): List<InternshipView>
    fun findAllByStatus(status: InternshipStatus): List<InternshipView>
}


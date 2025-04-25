package mk.ukim.finki.soa.internshipmanagement.service

import mk.ukim.finki.soa.internshipmanagement.model.command.CreateSearchingInternshipCommand
import mk.ukim.finki.soa.internshipmanagement.model.command.SubmitInternshipCommand
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId
import java.util.concurrent.CompletableFuture

interface StudentInternshipService {
    fun createSearchingInternship(command: CreateSearchingInternshipCommand): CompletableFuture<InternshipId>
}

interface CompanyInternshipService {
    fun submitInternship(command: SubmitInternshipCommand): CompletableFuture<InternshipId>
}


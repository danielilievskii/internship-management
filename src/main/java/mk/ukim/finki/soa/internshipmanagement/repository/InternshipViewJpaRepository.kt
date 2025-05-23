package mk.ukim.finki.soa.internshipmanagement.repository

import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipStatus
import mk.ukim.finki.soa.internshipmanagement.model.view.InternshipView
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface InternshipViewJpaRepository : JpaRepository<InternshipView, InternshipId> {
    fun findAllByStatus(status: InternshipStatus) : List<InternshipView>
}
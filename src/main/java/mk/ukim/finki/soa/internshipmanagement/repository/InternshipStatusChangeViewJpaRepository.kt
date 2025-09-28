package mk.ukim.finki.soa.internshipmanagement.repository

import mk.ukim.finki.soa.internshipmanagement.model.InternshipStatusChange
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipStatusChangeId
import mk.ukim.finki.soa.internshipmanagement.model.view.InternshipStatusChangeView
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface InternshipStatusChangeViewJpaRepository : JpaRepository<InternshipStatusChange, InternshipStatusChangeId> {
    fun findAllByInternshipId(id: InternshipId) : List<InternshipStatusChangeView>
}
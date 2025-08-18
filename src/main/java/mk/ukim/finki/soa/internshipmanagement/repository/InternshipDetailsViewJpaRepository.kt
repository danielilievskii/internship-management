package mk.ukim.finki.soa.internshipmanagement.repository

import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipStatus
import mk.ukim.finki.soa.internshipmanagement.model.view.InternshipDetailsView
import mk.ukim.finki.soa.internshipmanagement.model.view.InternshipView
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository

@Repository
interface InternshipDetailsViewJpaRepository : JpaRepository<InternshipDetailsView, InternshipId> {

    @Query("""
    SELECT v FROM InternshipDetailsView v
    LEFT JOIN FETCH v.weeks
    WHERE v.id = :id
""")
    fun findByIdWithDetails(@Param("id") id: InternshipId): InternshipDetailsView?
}
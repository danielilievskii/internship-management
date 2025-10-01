package mk.ukim.finki.soa.internshipmanagement.repository

import mk.ukim.finki.soa.internshipmanagement.model.snapshot.CompanySnapshot
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.CompanyId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.Email
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository

@Repository
interface CompanySnapshotJpaRepository : JpaRepository<CompanySnapshot, CompanyId> {
    fun findByEmail(email: Email) : CompanySnapshot?

    @Query("SELECT c FROM CompanySnapshot c WHERE LOWER(c.name.value) = LOWER(:name)")
    fun findByNameIgnoreCase(@Param("name")name: String): List<CompanySnapshot>
}
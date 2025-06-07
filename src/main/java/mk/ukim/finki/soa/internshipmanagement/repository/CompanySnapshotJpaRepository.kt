package mk.ukim.finki.soa.internshipmanagement.repository

import mk.ukim.finki.soa.internshipmanagement.model.snapshot.CompanySnapshot
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.CompanyId
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface CompanySnapshotJpaRepository : JpaRepository<CompanySnapshot, CompanyId> {
}
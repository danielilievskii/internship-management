package mk.ukim.finki.soa.internshipmanagement.repository

import mk.ukim.finki.soa.internshipmanagement.model.valueobject.CompanyId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.CoordinatorId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipStatus
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.StudentId
import mk.ukim.finki.soa.internshipmanagement.model.view.InternshipDetailsView
import mk.ukim.finki.soa.internshipmanagement.model.view.InternshipView
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.JpaSpecificationExecutor
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository

@Repository
interface InternshipViewJpaRepository : JpaRepository<InternshipView, InternshipId>, JpaSpecificationExecutor<InternshipView> {
    fun findAllByStatusAndStudentId(status: InternshipStatus, studentId: StudentId): List<InternshipView>
    fun existsByStatusAndStudentId(status: InternshipStatus, studentId: StudentId): Boolean

    @Query("""
    SELECT v FROM InternshipView v
    WHERE v.studentId = :studentId
    """)
    fun findAllByStudentId(
        @Param("studentId") id: StudentId
    ) : List<InternshipView>

    @Query("""
    SELECT v FROM InternshipView v
    WHERE v.companyId = :companyId
    """)
    fun findAllByCompanyId(
        @Param("companyId") id: CompanyId
    ) : List<InternshipView>

    @Query("""
    SELECT v FROM InternshipView v
    WHERE v.coordinatorId = :coordinatorId
    """)
    fun findAllByCoordinatorId(
        @Param("coordinatorId") id: CoordinatorId
    ) : List<InternshipView>
}
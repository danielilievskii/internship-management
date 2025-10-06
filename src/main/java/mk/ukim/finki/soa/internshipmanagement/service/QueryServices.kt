package mk.ukim.finki.soa.internshipmanagement.service

import mk.ukim.finki.soa.internshipmanagement.model.snapshot.CompanySnapshot
import mk.ukim.finki.soa.internshipmanagement.model.snapshot.CoordinatorSnapshot
import mk.ukim.finki.soa.internshipmanagement.model.snapshot.StudentSnapshot
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.*
import mk.ukim.finki.soa.internshipmanagement.model.view.*
import org.springframework.data.domain.Page

interface InternshipViewReadService {
    fun existsById(id: InternshipId): Boolean
    fun findById(id: InternshipId): InternshipView?
    fun existsByStatusAndStudentId(status: InternshipStatus, studentId: StudentId): Boolean
    fun findByStatusAndStudentId(status: InternshipStatus, id: StudentId): InternshipView?
    fun findAll(status: InternshipStatus?): List<InternshipCompositeView>
    fun findAllByStudentId(studentId: StudentId): List<InternshipCompositeView>
    fun findAllByCoordinatorId(coordinatorId: CoordinatorId): List<InternshipCompositeView>
    fun findAllByCompanyId(companyId: CompanyId): List<InternshipCompositeView>
    fun findAll(
        pageNum: Int,
        pageSize: Int,
        studentId: String?,
        coordinatorId: String?,
        internshipStatus: StatusType?,
        companyId: String?
    ): Page<InternshipCompositeView>
}

interface InternshipDetailsViewReadService {
    fun findById(id: InternshipId): InternshipDetailsView
    fun findByStatusAndStudentId(status: InternshipStatus, id: StudentId): InternshipDetailsView?
    fun findCompositeById(id: InternshipId): InternshipDetailsCompositeView
    fun getStudentCV(id: InternshipId): StudentCV
}

interface InternshipStatusChangeViewReadService {
    fun getStatusChangesForInternship(id: InternshipId): List<InternshipStatusChangeView>
}

interface StudentSnapshotReadService {
    fun findByEmail(email: String): StudentSnapshot
    fun findById(id: StudentId): StudentSnapshot
    fun findByIndex(index: String): StudentSnapshot
}

interface CompanySnapshotReadService {
    fun findByEmail(email: String): CompanySnapshot
    fun findByName(name: String): CompanySnapshot?
}

interface CoordinatorSnapshotReadService {
    fun findByEmail(email: String): CoordinatorSnapshot
}
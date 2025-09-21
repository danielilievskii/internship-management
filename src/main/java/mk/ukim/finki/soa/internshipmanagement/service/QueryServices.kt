package mk.ukim.finki.soa.internshipmanagement.service

import mk.ukim.finki.soa.internshipmanagement.model.snapshot.CompanySnapshot
import mk.ukim.finki.soa.internshipmanagement.model.snapshot.CoordinatorSnapshot
import mk.ukim.finki.soa.internshipmanagement.model.snapshot.StudentSnapshot
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipStatus
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.StatusType
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.StudentCV
import mk.ukim.finki.soa.internshipmanagement.model.view.InternshipCompositeView
import mk.ukim.finki.soa.internshipmanagement.model.view.InternshipDetailsView
import mk.ukim.finki.soa.internshipmanagement.model.view.InternshipStatusChangeView
import mk.ukim.finki.soa.internshipmanagement.model.view.InternshipView
import org.springframework.data.domain.Page

interface InternshipViewReadService {
    fun existsById(id: InternshipId): Boolean
    fun findAllComposite(): List<InternshipCompositeView>
    fun findAll(): List<InternshipView>
    fun findAll(pageNum: Int, pageSize: Int): Page<InternshipView>
    fun findAll(pageNum: Int, pageSize: Int, studentId: String?, coordinatorId: String?, internshipStatus: StatusType?, companyId: String?): Page<InternshipView>
    fun findAllByStatus(status: InternshipStatus): List<InternshipView>
}

interface InternshipDetailsViewReadService {
    fun findById(id: InternshipId): InternshipDetailsView
    fun getStudentCV(id: InternshipId): StudentCV
}

interface InternshipStatusChangeViewReadService {
    fun getStatusChangesForInternship(id: InternshipId): List<InternshipStatusChangeView>
}

interface StudentSnapshotReadService {
    fun findByEmail(email: String): StudentSnapshot
    fun findByIndex(index: String): StudentSnapshot
}

interface CompanySnapshotReadService {
    fun findByEmail(email: String): CompanySnapshot
}

interface CoordinatorSnapshotReadService {
    fun findByEmail(email: String): CoordinatorSnapshot
}
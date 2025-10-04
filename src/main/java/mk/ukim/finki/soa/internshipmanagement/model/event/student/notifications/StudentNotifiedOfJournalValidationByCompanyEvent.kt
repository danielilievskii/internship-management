package mk.ukim.finki.soa.internshipmanagement.model.event.student.notifications

import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId
import java.time.LocalDateTime

data class StudentNotifiedOfJournalValidationByCompanyEvent(
    val internshipId: InternshipId,
    val occurredAt: LocalDateTime = LocalDateTime.now()
)
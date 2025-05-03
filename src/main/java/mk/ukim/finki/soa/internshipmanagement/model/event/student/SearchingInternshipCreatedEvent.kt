package mk.ukim.finki.soa.internshipmanagement.model.event.student

import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipStatus
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.StatusType
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.StudentCV

data class SearchingInternshipCreatedEvent(
    val internshipId: InternshipId,
    val studentCV: StudentCV,
    val status: InternshipStatus = InternshipStatus(StatusType.SEARCHING)
)
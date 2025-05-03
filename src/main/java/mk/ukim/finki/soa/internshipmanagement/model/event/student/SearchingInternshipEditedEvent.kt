package mk.ukim.finki.soa.internshipmanagement.model.event.student

import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.StudentCV

data class SearchingInternshipEditedEvent(
    val internshipId: InternshipId,
    val newCV: StudentCV
)
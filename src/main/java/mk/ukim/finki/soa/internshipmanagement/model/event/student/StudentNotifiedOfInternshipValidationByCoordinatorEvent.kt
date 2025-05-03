package mk.ukim.finki.soa.internshipmanagement.model.event.student

import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId

data class StudentNotifiedOfInternshipValidationByCoordinatorEvent(
    val internshipId: InternshipId
)
package mk.ukim.finki.soa.internshipmanagement.model.event.company

import mk.ukim.finki.soa.internshipmanagement.model.valueobject.Comment
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipWeekId

data class CompanyWeekCommentAddedEvent(
    val internshipId: InternshipId,
    val weekId: InternshipWeekId,
    val comment: Comment
)
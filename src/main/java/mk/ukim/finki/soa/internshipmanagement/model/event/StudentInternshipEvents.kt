package mk.ukim.finki.soa.internshipmanagement.model.event

import mk.ukim.finki.soa.internshipmanagement.model.command.CreateSearchingInternshipCommand
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipStatus
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.StatusType

data class SearchingInternshipCreatedEvent(
    val internshipId: InternshipId,
    val studentCV: ByteArray,
    val status: InternshipStatus
) {
    constructor(command: CreateSearchingInternshipCommand) : this(
        internshipId = InternshipId(),
        studentCV = command.studentCV,
        status = InternshipStatus(StatusType.SEARCHING)
    )
}
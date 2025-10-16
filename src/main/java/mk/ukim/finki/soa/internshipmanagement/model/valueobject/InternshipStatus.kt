package mk.ukim.finki.soa.internshipmanagement.model.valueobject

import jakarta.persistence.Column
import jakarta.persistence.Embeddable
import jakarta.persistence.EnumType
import jakarta.persistence.Enumerated
import java.io.Serializable

@Embeddable
data class InternshipStatus(
    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    val value: StatusType
) : Serializable {

    private fun canTransitionTo(newStatus: StatusType): Boolean {
        return when (value) {
            StatusType.SEARCHING -> newStatus == StatusType.SUBMITTED
            StatusType.SUBMITTED -> newStatus == StatusType.ACCEPTED || newStatus == StatusType.REJECTED
            StatusType.ACCEPTED -> newStatus == StatusType.JOURNAL_SUBMITTED
            StatusType.JOURNAL_SUBMITTED -> newStatus == StatusType.VALIDATED_BY_COMPANY || newStatus == StatusType.ACCEPTED
            StatusType.VALIDATED_BY_COMPANY -> newStatus == StatusType.VALIDATED_BY_COORDINATOR || newStatus == StatusType.ACCEPTED
            StatusType.VALIDATED_BY_COORDINATOR -> newStatus == StatusType.ARCHIVED
            else -> false
        }
    }

    fun transitionTo(newStatus: StatusType): InternshipStatus {
        require(canTransitionTo(newStatus)) {
            "Internship status transition from $value to $newStatus is not allowed."
        }

        return InternshipStatus(newStatus)
    }
}
package mk.ukim.finki.soa.internshipmanagement.model.valueobject

import jakarta.persistence.Embeddable
import java.time.LocalDate
import java.time.temporal.ChronoUnit

@Embeddable
data class InternshipDateRange(val fromDate: LocalDate, val toDate: LocalDate) {

    init {
        require(fromDate.isBefore(toDate)) { "From date must be before to date." }
        require(ChronoUnit.DAYS.between(fromDate, toDate) in 28..92)
    }

    override fun toString(): String {
        return "Internship duration: $fromDate - $toDate"
    }

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as InternshipDateRange

        if (fromDate != other.fromDate) return false
        if (toDate != other.toDate) return false

        return true
    }

    override fun hashCode(): Int {
        var result = fromDate.hashCode()
        result = 31 * result + toDate.hashCode()
        return result
    }


}

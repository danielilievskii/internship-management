package mk.ukim.finki.soa.internshipmanagement.model.valueobject

import java.time.LocalDate
import java.time.temporal.ChronoUnit

data class InternshipWeekDateRange(val fromDate: LocalDate, val toDate: LocalDate) {
    init {
        require(fromDate.isBefore(toDate)) { "From date must be before to date." }
        require(ChronoUnit.DAYS.between(fromDate, toDate) in 5..7) { "Internship duration must be between 5 and 7 days." }
    }

    override fun toString(): String {
        return "Internship week duration: $fromDate - $toDate"
    }

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as InternshipWeekDateRange

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

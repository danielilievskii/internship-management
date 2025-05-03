package mk.ukim.finki.soa.internshipmanagement.model.valueobject

import jakarta.persistence.Embeddable
import java.io.Serializable
import java.time.LocalDate
import java.time.temporal.ChronoUnit

@Embeddable
data class InternshipWeekDateRange(val fromDate: LocalDate, val toDate: LocalDate) : Serializable {
    init {
        require(fromDate.isBefore(toDate)) { "From date must be before to date." }
        require(
            ChronoUnit.DAYS.between(
                fromDate,
                toDate
            ) in 1..7
        ) { "Internship duration must be between 1 and 7 days." }
    }
}

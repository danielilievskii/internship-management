package mk.ukim.finki.soa.internshipmanagement.model.valueobject

import jakarta.persistence.Embeddable
import java.io.Serializable
import java.time.LocalDate
import java.time.temporal.ChronoUnit

@Embeddable
data class InternshipDateRange(val fromDate: LocalDate, val toDate: LocalDate) : Serializable {
    init {
        require(fromDate.isBefore(toDate)) { "Internship from date must be before to date." }
        require(
            ChronoUnit.DAYS.between(
                fromDate,
                toDate
            ) in 28..92
        ) { "Internship duration must be between 28 and 92 days." }
    }
}

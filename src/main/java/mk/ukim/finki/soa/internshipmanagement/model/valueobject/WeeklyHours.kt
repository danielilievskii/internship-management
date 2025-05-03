package mk.ukim.finki.soa.internshipmanagement.model.valueobject

import jakarta.persistence.Embeddable
import java.io.Serializable

@Embeddable
data class WeeklyHours(val value: Int) : Serializable {
    init {
        require(value in 1..40) { "Weekly hours must be between 1 and 40." }
    }
}

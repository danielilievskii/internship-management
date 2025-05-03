package mk.ukim.finki.soa.internshipmanagement.model.valueobject

import jakarta.persistence.Embeddable
import java.io.Serializable

@Embeddable
data class StudentIndex(val value: String) : Serializable {
    init {
        require(value.length in 3..6) { "Index $value is invalid." }
    }
}

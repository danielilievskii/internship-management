package mk.ukim.finki.soa.internshipmanagement.model.valueobject

import jakarta.persistence.Embeddable
import java.io.Serializable

@Embeddable
data class Description(val value: String) : Serializable {
    init {
        require(value.isNotEmpty()) { "Description cannot be empty." }
        require(value.length <= 200) { "Description cannot be longer than 200 characters." }
    }
}

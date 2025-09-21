package mk.ukim.finki.soa.internshipmanagement.model.valueobject

import jakarta.persistence.Embeddable
import java.io.Serializable

@Embeddable
data class Name(val value: String) : Serializable {
    init {
        require(value.length <= 20) { "Name cannot be longer than 20 characters." }
    }
}

package mk.ukim.finki.soa.internshipmanagement.model.valueobject

import jakarta.persistence.Embeddable
import java.io.Serializable

@Embeddable
data class Email(val value: String) : Serializable {
    init {
        require(value.isNotEmpty()) { "Email cannot be empty." }
        require(value.matches("^[\\w.%+-]+@[\\w.-]+\\.[A-Za-z]{2,}$".toRegex())) { "Invalid email address $value" }
    }
}
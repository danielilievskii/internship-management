package mk.ukim.finki.soa.internshipmanagement.model.valueobject

import jakarta.persistence.Embeddable

@Embeddable
data class Email(val value: String) {
    init {
        require(value.isNotEmpty()) { "Email cannot be empty." }
        require(value.matches("^[\\w.%+-]+@[\\w.-]+\\.[A-Za-z]{2,}$".toRegex())) {"Invalid email address $value"}
    }

    override fun toString(): String {
        return value;
    }

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as Email

        return value == other.value
    }

    override fun hashCode(): Int {
        return value.hashCode()
    }


}
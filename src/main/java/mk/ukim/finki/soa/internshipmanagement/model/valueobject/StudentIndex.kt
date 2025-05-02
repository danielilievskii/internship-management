package mk.ukim.finki.soa.internshipmanagement.model.valueobject

import jakarta.persistence.Embeddable

@Embeddable
data class StudentIndex(val value: String) {
    init {
        require(value.length in 3..6) { "Index $value is invalid." }
    }

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as StudentIndex

        return value == other.value
    }

    override fun hashCode(): Int {
        return value.hashCode()
    }
}

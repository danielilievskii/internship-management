package mk.ukim.finki.soa.internshipmanagement.model.valueobject

import jakarta.persistence.Embeddable

@Embeddable
data class Comment(val value: String) {
    init {
        require(value.isNotEmpty()) { "Comment cannot be empty." }
        require(value.length <= 200) { "Comment cannot be longer than 200 characters." }
    }

    override fun toString(): String {
        return value
    }

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as Comment

        return value == other.value
    }

    override fun hashCode(): Int {
        return value.hashCode()
    }
}

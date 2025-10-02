package mk.ukim.finki.soa.internshipmanagement.model.valueobject

import jakarta.persistence.Column
import jakarta.persistence.Embeddable
import java.io.Serializable

@Embeddable
data class StudentCV(
    @Column(name = "student_cv", columnDefinition = "bytea", nullable = false)
    val content: ByteArray
) : Serializable {

    init {
        require(content.isNotEmpty()) { "CV cannot be empty." }
        require(content.size <= 4 * 1_048_576) { "CV must not exceed 4 MB." }
    }

    override fun toString(): String = "[CV content: ${content.size} bytes]"

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is StudentCV) return false
        return content.contentEquals(other.content)
    }

    override fun hashCode(): Int = content.contentHashCode()
}

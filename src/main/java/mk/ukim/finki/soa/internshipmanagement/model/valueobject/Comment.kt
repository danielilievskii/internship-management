package mk.ukim.finki.soa.internshipmanagement.model.valueobject

import jakarta.persistence.Embeddable
import java.io.Serializable

@Embeddable
data class Comment(val value: String) : Serializable {
    init {
        require(value.isNotEmpty()) { "Comment cannot be empty." }
        require(value.length <= 200) { "Comment cannot be longer than 200 characters." }
    }
}


package mk.ukim.finki.soa.internshipmanagement.model.valueobject

import jakarta.persistence.Embeddable
import java.io.Serializable

@Embeddable
data class ECTSCredits(val value: Int) : Serializable {
    init {
        require(value in 0..240) { "User has invalid ECTSCredits - $value" }
    }
}

package mk.ukim.finki.soa.internshipmanagement.model.valueobject

import jakarta.persistence.Embeddable

@Embeddable
data class ECTSCredits(val value: Int) {
    init {
        require(value in 0..240) { "User has invalid ECTSCredits - $value" }
    }

    override fun toString(): String {
        return value.toString();
    }

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as ECTSCredits

        return value == other.value
    }

    override fun hashCode(): Int {
        return value
    }


}

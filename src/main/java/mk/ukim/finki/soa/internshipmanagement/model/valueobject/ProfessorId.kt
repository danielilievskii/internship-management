package mk.ukim.finki.soa.internshipmanagement.model.valueobject

import jakarta.persistence.Embeddable
import mk.ukim.finki.soa.internshipmanagement.model.common.Identifier
import mk.ukim.finki.soa.internshipmanagement.model.snapshot.ProfessorSnapshot
import java.util.*

@Embeddable
open class ProfessorId(value: String) : Identifier<ProfessorSnapshot>(value, ProfessorSnapshot::class.java) {
    constructor() : this(UUID.randomUUID().toString())

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false
        if (!super.equals(other)) return false
        return true
    }

    override fun hashCode(): Int {
        return value.hashCode()
    }
}

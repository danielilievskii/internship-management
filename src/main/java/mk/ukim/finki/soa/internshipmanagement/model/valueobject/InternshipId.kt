package mk.ukim.finki.soa.internshipmanagement.model.valueobject

import jakarta.persistence.Embeddable
import mk.ukim.finki.soa.internshipmanagement.model.Internship
import mk.ukim.finki.soa.internshipmanagement.model.common.Identifier
import java.util.*

@Embeddable
open class InternshipId(value: String) : Identifier<Internship>(value, Internship::class.java) {
    constructor() : this(UUID.randomUUID().toString())
}
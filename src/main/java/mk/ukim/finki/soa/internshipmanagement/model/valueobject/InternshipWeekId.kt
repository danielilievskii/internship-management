package mk.ukim.finki.soa.internshipmanagement.model.valueobject

import jakarta.persistence.Embeddable
import mk.ukim.finki.soa.internshipmanagement.model.InternshipWeek
import mk.ukim.finki.soa.internshipmanagement.model.common.Identifier
import java.util.*

@Embeddable
open class InternshipWeekId(value: String) : Identifier<InternshipWeek>(value, InternshipWeek::class.java) {
    constructor() : this(UUID.randomUUID().toString())
}

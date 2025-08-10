package mk.ukim.finki.soa.internshipmanagement.model.valueobject

import jakarta.persistence.Embeddable
import mk.ukim.finki.soa.internshipmanagement.model.InternshipStatusChange
import mk.ukim.finki.soa.internshipmanagement.model.common.Identifier
import java.util.*

@Embeddable
open class InternshipStatusChangeId(value: String) : Identifier<InternshipStatusChange>(value, InternshipStatusChange::class.java) {
    constructor() : this(UUID.randomUUID().toString())
}

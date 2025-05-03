package mk.ukim.finki.soa.internshipmanagement.model.valueobject

import jakarta.persistence.Embeddable
import mk.ukim.finki.soa.internshipmanagement.model.common.Identifier
import mk.ukim.finki.soa.internshipmanagement.model.snapshot.CoordinatorSnapshot
import java.util.*

@Embeddable
open class CoordinatorId(value: String) : Identifier<CoordinatorSnapshot>(value, CoordinatorSnapshot::class.java) {
    constructor() : this(UUID.randomUUID().toString())
}

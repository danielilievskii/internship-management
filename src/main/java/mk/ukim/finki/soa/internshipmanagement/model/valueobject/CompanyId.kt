package mk.ukim.finki.soa.internshipmanagement.model.valueobject

import jakarta.persistence.Embeddable
import mk.ukim.finki.soa.internshipmanagement.model.common.Identifier
import mk.ukim.finki.soa.internshipmanagement.model.snapshot.CompanySnapshot
import java.util.*

@Embeddable
open class CompanyId(value: String) : Identifier<CompanySnapshot>(value, CompanySnapshot::class.java) {
    constructor() : this(UUID.randomUUID().toString())
}

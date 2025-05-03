package mk.ukim.finki.soa.internshipmanagement.model.valueobject

import jakarta.persistence.Embeddable
import mk.ukim.finki.soa.internshipmanagement.model.common.Identifier
import mk.ukim.finki.soa.internshipmanagement.model.snapshot.StudentSnapshot
import java.util.*

@Embeddable
open class StudentId(value: String) : Identifier<StudentSnapshot>(value, StudentSnapshot::class.java) {
    constructor() : this(UUID.randomUUID().toString())
}
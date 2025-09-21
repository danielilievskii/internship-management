package mk.ukim.finki.soa.internshipmanagement.model.snapshot

import jakarta.persistence.AttributeOverride
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Id
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.Email
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.CoordinatorId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.Name

@Entity
data class CoordinatorSnapshot(

    @Id
    @AttributeOverride(
        name = "value",
        column = Column(name = "coordinator_id")
    )
    val id: CoordinatorId,

    @AttributeOverride(
        name = "value",
        column = Column(name = "name")
    )
    var name: Name = Name(""),

    @AttributeOverride(
        name = "value",
        column = Column(name = "email")
    )
    val email: Email
) {
    constructor() : this(CoordinatorId(), Name("default"), Email("default@email.com"))

    override fun toString(): String {
        return "ProfessorSnapshot(id=$id, name='$name', email=$email)"
    }
}
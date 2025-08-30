package mk.ukim.finki.soa.internshipmanagement.model.snapshot

import jakarta.persistence.AttributeOverride
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Id
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.Email
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.CoordinatorId

@Entity
data class CoordinatorSnapshot(

    @Id
    @AttributeOverride(
        name = "value",
        column = Column(name = "coordinator_id")
    )
    val id: CoordinatorId,

    val name: String,

    @AttributeOverride(
        name = "value",
        column = Column(name = "email")
    )
    val email: Email
) {
    constructor() : this(CoordinatorId(), "", Email("default@email.com"))

    override fun toString(): String {
        return "ProfessorSnapshot(id=$id, name='$name', email=$email)"
    }
}
package mk.ukim.finki.soa.internshipmanagement.model.snapshot

import jakarta.persistence.AttributeOverride
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Id
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.ECTSCredits
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.Email
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.Name
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.StudentId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.StudentIndex

@Entity
data class StudentSnapshot(

    @Id
    @AttributeOverride(
        name = "value",
        column = Column(name = "student_id")
    )
    val id: StudentId,

    @AttributeOverride(
        name = "value",
        column = Column(name = "student_index")
    )
    val index: StudentIndex,

    @AttributeOverride(
        name = "value",
        column = Column(name = "name")
    )
    var name: Name = Name(""),

    @AttributeOverride(
        name = "value",
        column = Column(name = "email")
    )
    val email: Email,

    @AttributeOverride(
        name = "value",
        column = Column(name = "ects_credits")
    )
    val credits: ECTSCredits,

    ) {
    constructor() : this(StudentId(), StudentIndex("999999"), Name("default"), Email("default@email.com"), ECTSCredits(60))


    override fun toString(): String {
        return "StudentSnapshot(id=$id, index=$index, email=$email, credits=$credits, name='$name')"
    }
}
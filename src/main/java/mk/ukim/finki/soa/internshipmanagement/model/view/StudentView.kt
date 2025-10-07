package mk.ukim.finki.soa.internshipmanagement.model.view

import jakarta.persistence.*
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.*
import org.hibernate.annotations.Immutable

@Entity
@Table(name = "studentsnapshot")
@Immutable
data class StudentView(

    @EmbeddedId
    @AttributeOverride(name = "value", column = Column(name = "student_id"))
    val id: StudentId,

    @Embedded
    @AttributeOverride(
        name = "value",
        column = Column(name = "student_index")
    )
    val index: StudentIndex,

    @Embedded
    @AttributeOverride(name = "value", column = Column(name = "email"))
    val email: Email,

    @Embedded
    @AttributeOverride(name = "value", column = Column(name = "ects_credits"))
    val credits: ECTSCredits,

    @Embedded
    @AttributeOverride(name = "value", column = Column(name = "name"))
    val name: Name,
)

package mk.ukim.finki.soa.internshipmanagement.model.view

import jakarta.persistence.*
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.Name
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.StudentId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.StudentIndex
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
    @AttributeOverride(name = "value", column = Column(name = "name"))
    val name: Name,
)

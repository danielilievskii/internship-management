package mk.ukim.finki.soa.internshipmanagement.model.view

import jakarta.persistence.*
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.*
import org.hibernate.annotations.Immutable

@Entity
@Table(name = "internship")
@Immutable
data class InternshipView(

    @EmbeddedId
    @AttributeOverride(name = "value", column = Column(name = "id"))
    val id: InternshipId,

    @Embedded
    @AttributeOverride(name = "value", column = Column(name = "status"))
    val status: InternshipStatus,

    @Embedded
    @AttributeOverride(name = "value", column = Column(name = "student_id"))
    val studentId: StudentId,

    @Embedded
    @AttributeOverride(name = "value", column = Column(name = "company_id"))
    val companyId: CompanyId,

    @Embedded
    @AttributeOverride(name = "value", column = Column(name = "coordinator_id"))
    val coordinatorId: CoordinatorId,

    @Embedded
    @AttributeOverrides(
        AttributeOverride(name = "start.value", column = Column(name = "start_date")),
        AttributeOverride(name = "end.value", column = Column(name = "end_date"))
    )
    val period: InternshipDateRange,
)
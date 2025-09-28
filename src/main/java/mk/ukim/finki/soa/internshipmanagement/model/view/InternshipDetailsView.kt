package mk.ukim.finki.soa.internshipmanagement.model.view

import com.fasterxml.jackson.annotation.JsonIgnore
import jakarta.persistence.*
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.*
import org.hibernate.annotations.Immutable

@Entity
@Table(name = "internship")
@Immutable
data class InternshipDetailsView(

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
    @AttributeOverride(name = "value", column = Column(name = "description"))
    val description: Description,

    @JsonIgnore
    @Embedded
    @AttributeOverride(name = "content", column = Column(name = "student_cv"))
    var studentCV: StudentCV?,

    @Embedded
    @AttributeOverrides(
        AttributeOverride(name = "start.value", column = Column(name = "start_date")),
        AttributeOverride(name = "end.value", column = Column(name = "end_date"))
    )
    val period: InternshipDateRange,

    @Embedded
    @AttributeOverride(name = "value", column = Column(name = "contact_email"))
    val companyContactEmail: Email,

    @Embedded
    @AttributeOverride(name = "value", column = Column(name = "weekly_hours"))
    var weeklyHours: WeeklyHours,

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "internship_id", referencedColumnName = "id")
    val weeks: List<InternshipWeekView> = emptyList(),
)
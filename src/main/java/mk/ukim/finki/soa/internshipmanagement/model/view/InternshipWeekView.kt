package mk.ukim.finki.soa.internshipmanagement.model.view

import jakarta.persistence.*
import mk.ukim.finki.soa.internshipmanagement.model.InternshipStatusChange
import mk.ukim.finki.soa.internshipmanagement.model.InternshipWeek
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.*
import org.hibernate.annotations.Immutable
import org.hibernate.annotations.Subselect
import java.time.LocalDateTime

@Entity
@Table(name = "internship_week")
@Subselect("select * from internship_week")
@Immutable
data class InternshipWeekView(

    @EmbeddedId
    @AttributeOverride(name = "value", column = Column(name = "id"))
    val id: InternshipWeekId,

    @Embedded
    @AttributeOverrides(
        AttributeOverride(name = "start.value", column = Column(name = "start_date")),
        AttributeOverride(name = "end.value", column = Column(name = "end_date"))
    )
    val period: InternshipWeekDateRange,

    @Embedded
    @AttributeOverride(name = "value", column = Column(name = "description"))
    val description: Description,

    @Embedded
    @AttributeOverride(name = "value", column = Column(name = "company_description"))
    var companyComment: Comment,

    @Embedded
    @AttributeOverride(name = "value", column = Column(name = "coordinator_description"))
    var coordinatorComment: Comment,

    @Embedded
    @AttributeOverride(name = "value", column = Column(name = "working_hours"))
    var workingHours: WeeklyHours
)
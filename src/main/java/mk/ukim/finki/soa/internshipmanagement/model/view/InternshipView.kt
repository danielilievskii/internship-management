package mk.ukim.finki.soa.internshipmanagement.model.view

import jakarta.persistence.*
import mk.ukim.finki.soa.internshipmanagement.model.InternshipWeek
import mk.ukim.finki.soa.internshipmanagement.model.common.Identifier
import mk.ukim.finki.soa.internshipmanagement.model.common.LabeledEntity
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
    @AttributeOverride(name = "value", column = Column(name = "description"))
    val description: Description,

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
    val weeks: List<InternshipWeek> = emptyList()


)
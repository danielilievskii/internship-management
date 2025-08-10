package mk.ukim.finki.soa.internshipmanagement.model.view

import jakarta.persistence.*
import mk.ukim.finki.soa.internshipmanagement.model.InternshipStatusChange
import mk.ukim.finki.soa.internshipmanagement.model.InternshipWeek
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.*
import org.hibernate.annotations.Immutable
import org.hibernate.annotations.Subselect
import java.time.LocalDateTime

@Entity
@Table(name = "internship_status_change")
@Subselect("select * from internship_status_change")
@Immutable
data class InternshipStatusChangeView(

    @EmbeddedId
    @AttributeOverride(name = "value", column = Column(name = "id"))
    val id: InternshipStatusChangeId,

    @Embedded
    @AttributeOverride(name = "value", column = Column(name = "internship_id"))
    val internshipId: InternshipId,

    @Embedded
    @AttributeOverride(name = "value", column = Column(name = "previous_status"))
    val previousStatus: InternshipStatus?,

    @Embedded
    @AttributeOverride(name = "value", column = Column(name = "new_status"))
    val newStatus: InternshipStatus,

    @Column(name = "changed_at")
    val changedAt: LocalDateTime
)
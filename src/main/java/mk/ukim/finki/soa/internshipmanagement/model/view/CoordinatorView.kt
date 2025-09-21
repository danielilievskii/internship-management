package mk.ukim.finki.soa.internshipmanagement.model.view

import jakarta.persistence.*
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.CoordinatorId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.Name
import org.hibernate.annotations.Immutable

@Entity
@Table(name = "coordinatorsnapshot")
@Immutable
data class CoordinatorView(

    @EmbeddedId
    @AttributeOverride(name = "value", column = Column(name = "coordinator_id"))
    val id: CoordinatorId,

    @Embedded
    @AttributeOverride(name = "value", column = Column(name = "name"))
    val name: Name,
)

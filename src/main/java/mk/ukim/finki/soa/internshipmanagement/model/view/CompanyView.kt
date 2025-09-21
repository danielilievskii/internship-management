package mk.ukim.finki.soa.internshipmanagement.model.view

import jakarta.persistence.*
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.CompanyId
import org.hibernate.annotations.Immutable

@Entity
@Table(name = "companysnapshot")
@Immutable
data class CompanyView(

    @EmbeddedId
    @AttributeOverride(name = "value", column = Column(name = "company_id"))
    val id: CompanyId,

    @Column(name = "name")
    val name: String,
    )

package mk.ukim.finki.soa.internshipmanagement.model.view

import jakarta.persistence.AttributeOverride
import jakarta.persistence.Column
import jakarta.persistence.EmbeddedId
import jakarta.persistence.Entity
import jakarta.persistence.Table
import mk.ukim.finki.soa.internshipmanagement.model.common.Identifier
import mk.ukim.finki.soa.internshipmanagement.model.common.LabeledEntity
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipStatus
import org.hibernate.annotations.Immutable

@Entity
@Table(name = "internship")
@Immutable
data class InternshipView(

    @EmbeddedId
    @AttributeOverride(name = "value", column = Column(name = "id"))
    val id: InternshipId,

    val description: String,

    val status: InternshipStatus
) : LabeledEntity {
    override fun getId(): Identifier<out Any> {
        return id
    }

    override fun getLabel(): String {
        return "Internship (${id.value}) [${status.value}]"
    }

}
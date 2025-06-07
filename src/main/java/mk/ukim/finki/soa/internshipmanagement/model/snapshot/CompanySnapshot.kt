package mk.ukim.finki.soa.internshipmanagement.model.snapshot

import jakarta.persistence.AttributeOverride
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Id
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.CompanyId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.Email

@Entity
data class CompanySnapshot(
    @Id
    @AttributeOverride(
        name = "value",
        column = Column(name = "company_id")
    )
    var id: CompanyId = CompanyId(),
    var name: String = "",

    @AttributeOverride(
        name = "value",
        column = Column(name = "email")
    )
    var email: Email = Email(""),
    var isActive: Boolean = true
) {
    constructor() : this(CompanyId(), "", Email(""), true)

    override fun toString(): String {
        return "CompanySnapshot(id=$id, name='$name', email=$email, isActive=$isActive)"
    }
}

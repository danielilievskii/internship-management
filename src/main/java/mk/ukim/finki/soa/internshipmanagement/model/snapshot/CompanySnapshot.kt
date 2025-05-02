package mk.ukim.finki.soa.internshipmanagement.model.snapshot

import mk.ukim.finki.soa.internshipmanagement.model.valueobject.CompanyId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.Email

data class CompanySnapshot(
    val id: CompanyId,
    val name: String,
    val email: Email,
    val isActive: Boolean
)
{
    override fun toString(): String {
        return "CompanySnapshot(id=$id, name='$name', email=$email, isActive=$isActive)"
    }
}

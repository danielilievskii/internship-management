package mk.ukim.finki.soa.internshipmanagement.model.snapshot

import mk.ukim.finki.soa.internshipmanagement.model.valueobject.Email
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.ProfessorId

data class ProfessorSnapshot(
    val id: ProfessorId,
    val name: String,
    val surname: String,
    val email: Email
)
{
    override fun toString(): String {
        return "ProfessorSnapshot(id=$id, name='$name', surname='$surname', email=$email)"
    }
}
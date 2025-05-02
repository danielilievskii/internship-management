package mk.ukim.finki.soa.internshipmanagement.model.snapshot

import mk.ukim.finki.soa.internshipmanagement.model.valueobject.ECTSCredits
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.Email
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.StudentId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.StudentIndex

data class StudentSnapshot(
    val id: StudentId,
    val index: StudentIndex,
    val email: Email,
    val credits: ECTSCredits,
    val name: String,
    val surname: String
)
{
    override fun toString(): String {
        return "StudentSnapshot(id=$id, index=$index, email=$email, credits=$credits, name='$name', surname='$surname')"
    }
}
package mk.ukim.finki.soa.internshipmanagement.model.resolver

import mk.ukim.finki.soa.internshipmanagement.model.valueobject.CoordinatorId

interface CoordinatorResolver {
    fun resolveFromStudentIndex(index: String): CoordinatorId
}

package mk.ukim.finki.soa.internshipmanagement.service.impl.security

import mk.ukim.finki.soa.internshipmanagement.model.enum.Role

data class CurrentUser(
    val role: Role,
    val userId: String
)

package mk.ukim.finki.soa.internshipmanagement.service.impl.security

import mk.ukim.finki.soa.internshipmanagement.exception.AuthException
import mk.ukim.finki.soa.internshipmanagement.model.enum.Role
import mk.ukim.finki.soa.internshipmanagement.model.view.InternshipDetailsView
import mk.ukim.finki.soa.internshipmanagement.service.AccessPolicyService
import mk.ukim.finki.soa.internshipmanagement.service.AuthService
import org.springframework.stereotype.Service

@Service
class AccessPolicyServiceImpl(
    private val authService: AuthService
) : AccessPolicyService {

    override fun assertCanViewInternship(internship: InternshipDetailsView) {

        val (role, userId) = authService.getCurrentUser()

        val hasAccess = when(role) {
            Role.STUDENT -> internship.studentId.value == userId
            Role.PROFESSOR -> internship.coordinatorId.value == userId
            Role.COMPANY -> internship.companyId.value == userId
            Role.ADMIN -> true
        }

        if (!hasAccess) throw AuthException("You don't have access to view this resource.")
    }
}
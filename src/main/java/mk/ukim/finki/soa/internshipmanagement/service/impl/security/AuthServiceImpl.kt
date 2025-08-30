package mk.ukim.finki.soa.internshipmanagement.service.impl.security

import mk.ukim.finki.soa.internshipmanagement.exception.AuthException
import mk.ukim.finki.soa.internshipmanagement.model.snapshot.CompanySnapshot
import mk.ukim.finki.soa.internshipmanagement.model.snapshot.CoordinatorSnapshot
import mk.ukim.finki.soa.internshipmanagement.model.snapshot.StudentSnapshot
import mk.ukim.finki.soa.internshipmanagement.service.AuthService
import mk.ukim.finki.soa.internshipmanagement.service.CompanySnapshotReadService
import mk.ukim.finki.soa.internshipmanagement.service.CoordinatorSnapshotReadService
import mk.ukim.finki.soa.internshipmanagement.service.StudentSnapshotReadService
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.oauth2.jwt.Jwt
import org.springframework.stereotype.Service

@Service
class AuthServiceImpl(
    private val studentSnapshotReadService: StudentSnapshotReadService,
    private val companySnapshotReadService: CompanySnapshotReadService,
    private val coordinatorSnapshotReadService: CoordinatorSnapshotReadService,
) : AuthService {

    override fun getAuthUserEmail(): String {
        val authentication = SecurityContextHolder.getContext().authentication
            ?: throw AuthException("No authentication found in security context")

        val principal = authentication.principal

        return when (principal) {
            is Jwt -> principal.claims["email"] as? String
                ?: throw AuthException("Email claim not found in JWT token")
            else -> throw AuthException("Unsupported principal type: ${principal::class.simpleName}")
        }
    }

    override fun getAuthStudent(): StudentSnapshot {

        val email: String = getAuthUserEmail()
        return studentSnapshotReadService.findByEmail(email);
    }

    override fun getAuthCompany(): CompanySnapshot {

        val email: String = getAuthUserEmail()
        return companySnapshotReadService.findByEmail(email);
    }

    override fun getAuthCoordinator(): CoordinatorSnapshot {

        val email: String = getAuthUserEmail()
        return coordinatorSnapshotReadService.findByEmail(email);
    }
}
package mk.ukim.finki.soa.internshipmanagement.service

import mk.ukim.finki.soa.internshipmanagement.model.snapshot.CompanySnapshot
import mk.ukim.finki.soa.internshipmanagement.model.snapshot.CoordinatorSnapshot
import mk.ukim.finki.soa.internshipmanagement.model.snapshot.StudentSnapshot
import mk.ukim.finki.soa.internshipmanagement.model.view.InternshipDetailsView
import mk.ukim.finki.soa.internshipmanagement.service.impl.security.CurrentUser

interface AuthService {
    fun getCurrentUser(): CurrentUser
    fun getAuthUserEmail(): String
    fun getAuthStudent(): StudentSnapshot
    fun getAuthCompany(): CompanySnapshot
    fun getAuthCoordinator(): CoordinatorSnapshot
}

interface AccessPolicyService {
    fun assertCanViewInternship(internship: InternshipDetailsView)
}
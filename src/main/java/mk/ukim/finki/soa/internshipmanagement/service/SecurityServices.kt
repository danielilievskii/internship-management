package mk.ukim.finki.soa.internshipmanagement.service

import mk.ukim.finki.soa.internshipmanagement.model.snapshot.CompanySnapshot
import mk.ukim.finki.soa.internshipmanagement.model.snapshot.CoordinatorSnapshot
import mk.ukim.finki.soa.internshipmanagement.model.snapshot.StudentSnapshot

interface AuthService {
    fun getAuthUserEmail(): String
    fun getAuthStudent(): StudentSnapshot
    fun getAuthCompany(): CompanySnapshot
    fun getAuthCoordinator(): CoordinatorSnapshot
}
package mk.ukim.finki.soa.internshipmanagement.exception

import mk.ukim.finki.soa.internshipmanagement.model.valueobject.CompanyId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipWeekId

class InternshipNotFoundException(internshipId: InternshipId) : RuntimeException("Internship with id ${internshipId.value} not found.")
class InternshipWeekNotFoundException(internshipWeekId: InternshipWeekId) : RuntimeException("Internship week with id ${internshipWeekId.value}. not found.")
class InternshipStudentCVNotFoundException(internshipId: InternshipId) : RuntimeException("Student CV for the internship with id ${internshipId.value}. not found.")
class InvalidInternshipStateException(message: String) : RuntimeException(message)

class PartnerNotFoundException(companyId: CompanyId) : RuntimeException("Partner with id ${companyId.value} not found.")

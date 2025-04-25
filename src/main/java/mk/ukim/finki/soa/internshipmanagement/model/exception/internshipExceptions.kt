package mk.ukim.finki.soa.internshipmanagement.model.exception

import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId

class InternshipNotFoundException(internshipId: InternshipId) : RuntimeException("Internship with id $internshipId not found.")
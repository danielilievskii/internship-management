package mk.ukim.finki.soa.internshipmanagement.web.dto.student

import mk.ukim.finki.soa.internshipmanagement.model.valueobject.StudentCV

data class CreateSearchingInternshipCommandDto(
    val studentCV: StudentCV,
)
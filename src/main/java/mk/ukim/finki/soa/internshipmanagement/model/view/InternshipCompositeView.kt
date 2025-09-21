package mk.ukim.finki.soa.internshipmanagement.model.view

import mk.ukim.finki.soa.internshipmanagement.model.valueobject.*
data class InternshipCompositeView(

    val id: InternshipId,
    val status: InternshipStatus,
    val studentView: StudentView,
    val companyView: CompanyView?,
    val coordinatorView: CoordinatorView?,
    val period: InternshipDateRange?,
)

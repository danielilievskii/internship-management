package mk.ukim.finki.soa.internshipmanagement.model.view

import mk.ukim.finki.soa.internshipmanagement.model.valueobject.*

data class InternshipDetailsCompositeView(

    val id: InternshipId,
    val status: InternshipStatus,
    val studentView: StudentView,
    val companyView: CompanyView?,
    val coordinatorView: CoordinatorView?,
    val description: Description?,
    val period: InternshipDateRange?,
    val companyContactEmail: Email?,
    val weeklyHours: WeeklyHours?,
    val weeks: List<InternshipWeekView>,
)

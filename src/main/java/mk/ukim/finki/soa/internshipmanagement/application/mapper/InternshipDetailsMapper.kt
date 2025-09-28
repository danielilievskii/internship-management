package mk.ukim.finki.soa.internshipmanagement.application.mapper

import mk.ukim.finki.soa.internshipmanagement.model.view.CompanyView
import mk.ukim.finki.soa.internshipmanagement.model.view.CoordinatorView
import mk.ukim.finki.soa.internshipmanagement.model.view.InternshipDetailsCompositeView
import mk.ukim.finki.soa.internshipmanagement.model.view.InternshipDetailsView
import mk.ukim.finki.soa.internshipmanagement.model.view.StudentView
import org.springframework.stereotype.Component

@Component
class InternshipDetailsMapper {

    fun toCompositeView(
        internship: InternshipDetailsView,
        student: StudentView,
        company: CompanyView?,
        coordinator: CoordinatorView?
    ): InternshipDetailsCompositeView {
        return InternshipDetailsCompositeView(
            id = internship.id,
            status = internship.status,
            studentView = student,
            companyView = company,
            coordinatorView = coordinator,
            description = internship.description,
            period = internship.period,
            companyContactEmail = internship.companyContactEmail,
            weeklyHours = internship.weeklyHours,
            weeks = internship.weeks
        )
    }
}
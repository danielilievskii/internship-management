package mk.ukim.finki.soa.internshipmanagement.application.mapper

import mk.ukim.finki.soa.internshipmanagement.model.view.CompanyView
import mk.ukim.finki.soa.internshipmanagement.model.view.CoordinatorView
import mk.ukim.finki.soa.internshipmanagement.model.view.InternshipCompositeView
import mk.ukim.finki.soa.internshipmanagement.model.view.InternshipView
import mk.ukim.finki.soa.internshipmanagement.model.view.StudentView
import org.springframework.stereotype.Component

@Component
class InternshipMapper {

    fun toCompositeView(
        internship: InternshipView,
        student: StudentView,
        company: CompanyView?,
        coordinator: CoordinatorView?
    ): InternshipCompositeView {
        return InternshipCompositeView(
            id = internship.id,
            status = internship.status,
            studentView = student,
            companyView = company,
            coordinatorView = coordinator,
            period = internship.period
        )
    }
}
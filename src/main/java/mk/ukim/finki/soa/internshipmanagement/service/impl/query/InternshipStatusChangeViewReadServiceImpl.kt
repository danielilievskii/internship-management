package mk.ukim.finki.soa.internshipmanagement.service.impl.query

import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId
import mk.ukim.finki.soa.internshipmanagement.model.view.InternshipStatusChangeView
import mk.ukim.finki.soa.internshipmanagement.repository.InternshipStatusChangeViewJpaRepository
import mk.ukim.finki.soa.internshipmanagement.service.InternshipDetailsViewReadService
import mk.ukim.finki.soa.internshipmanagement.service.InternshipStatusChangeViewReadService
import org.springframework.stereotype.Service

@Service
class InternshipStatusChangeViewReadServiceImpl(
    val internshipStatusChangeViewJpaRepository: InternshipStatusChangeViewJpaRepository,
    val internshipDetailsViewReadService: InternshipDetailsViewReadService,
) :
    InternshipStatusChangeViewReadService {

    override fun getStatusChangesForInternship(id: InternshipId): List<InternshipStatusChangeView> {
        internshipDetailsViewReadService.findById(id)

        return internshipStatusChangeViewJpaRepository.findAllByInternshipId(id)
    }
}
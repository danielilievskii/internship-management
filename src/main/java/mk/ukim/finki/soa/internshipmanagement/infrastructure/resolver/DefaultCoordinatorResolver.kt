package mk.ukim.finki.soa.internshipmanagement.infrastructure.resolver

import mk.ukim.finki.soa.internshipmanagement.model.resolver.CoordinatorResolver
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.CoordinatorId
import mk.ukim.finki.soa.internshipmanagement.service.CoordinatorSnapshotReadService
import org.springframework.stereotype.Component

@Component
class DefaultCoordinatorResolver(
    private val coordinatorSnapshotReadService: CoordinatorSnapshotReadService
) : CoordinatorResolver {

    override fun resolveFromStudentIndex(index: String): CoordinatorId {
        val email = when (index.last()) {
            '1', '2', '3' -> "vesna.dimitrievska@email.com"
            '4', '5', '6' -> "georgina.mircheva@email.com"
            else -> "andrea.naumovski@email.com"
        }

        val snapshot = coordinatorSnapshotReadService.findByEmail(email)
        return snapshot.id
    }
}

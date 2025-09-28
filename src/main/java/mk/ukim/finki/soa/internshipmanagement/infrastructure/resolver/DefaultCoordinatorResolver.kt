package mk.ukim.finki.soa.internshipmanagement.infrastructure.resolver

import mk.ukim.finki.soa.internshipmanagement.model.resolver.CoordinatorResolver
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.CoordinatorId
import org.springframework.stereotype.Component

@Component
class DefaultCoordinatorResolver : CoordinatorResolver {
    override fun resolveFromStudentIndex(index: String): CoordinatorId {
        return when (index.last()) {
            '1', '2', '3' -> CoordinatorId("vesna.dimitrievska")
            '4', '5', '6' -> CoordinatorId("georgina.mircheva")
            else -> CoordinatorId("andrea.naumovski")
        }
    }
}

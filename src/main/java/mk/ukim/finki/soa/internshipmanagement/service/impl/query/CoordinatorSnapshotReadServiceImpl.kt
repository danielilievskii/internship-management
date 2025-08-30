package mk.ukim.finki.soa.internshipmanagement.service.impl.query

import mk.ukim.finki.soa.internshipmanagement.exception.UserNotFoundException
import mk.ukim.finki.soa.internshipmanagement.model.snapshot.CoordinatorSnapshot
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.Email
import mk.ukim.finki.soa.internshipmanagement.repository.CoordinatorSnapshotJpaRepository
import mk.ukim.finki.soa.internshipmanagement.service.AuthService
import mk.ukim.finki.soa.internshipmanagement.service.CoordinatorSnapshotReadService
import org.springframework.stereotype.Service

@Service
class CoordinatorSnapshotReadServiceImpl(
    val coordinatorRepository: CoordinatorSnapshotJpaRepository,
) : CoordinatorSnapshotReadService {

    override fun findByEmail(email: String): CoordinatorSnapshot {

        return coordinatorRepository.findByEmail(Email(email))
            ?: throw UserNotFoundException("Professor with email $email not found")
    }
}
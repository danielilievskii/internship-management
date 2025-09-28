package mk.ukim.finki.soa.internshipmanagement.service.impl.query

import mk.ukim.finki.soa.internshipmanagement.exception.UserNotFoundException
import mk.ukim.finki.soa.internshipmanagement.model.snapshot.StudentSnapshot
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.Email
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.StudentId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.StudentIndex
import mk.ukim.finki.soa.internshipmanagement.repository.StudentSnapshotJpaRepository
import mk.ukim.finki.soa.internshipmanagement.service.StudentSnapshotReadService
import org.springframework.stereotype.Service

@Service
class StudentSnapshotReadServiceImpl(
    val studentRepository: StudentSnapshotJpaRepository,
) : StudentSnapshotReadService {

    override fun findByEmail(email: String): StudentSnapshot {

        return studentRepository.findByEmail(Email(email))
            ?: throw UserNotFoundException("Student with email $email not found")
    }

    override fun findById(id: StudentId): StudentSnapshot {

        return studentRepository.findById(id)
            .orElseThrow { UserNotFoundException("Student with id=${id.value} not found") }
    }

    override fun findByIndex(index: String): StudentSnapshot {

        return studentRepository.findByIndex(StudentIndex(index))
            ?: throw UserNotFoundException("Student with index $index not found")
    }
}
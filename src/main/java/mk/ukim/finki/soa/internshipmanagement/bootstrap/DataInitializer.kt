package mk.ukim.finki.soa.internshipmanagement.bootstrap

import jakarta.annotation.PostConstruct
import mk.ukim.finki.soa.internshipmanagement.model.snapshot.CompanySnapshot
import mk.ukim.finki.soa.internshipmanagement.model.snapshot.CoordinatorSnapshot
import mk.ukim.finki.soa.internshipmanagement.model.snapshot.StudentSnapshot
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.CompanyId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.CoordinatorId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.ECTSCredits
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.Email
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.Name
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.StudentId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.StudentIndex
import mk.ukim.finki.soa.internshipmanagement.repository.CompanySnapshotJpaRepository
import mk.ukim.finki.soa.internshipmanagement.repository.CoordinatorSnapshotJpaRepository
import mk.ukim.finki.soa.internshipmanagement.repository.StudentSnapshotJpaRepository
import org.springframework.stereotype.Component

@Component
class DataInitializer(
    private val companyRepository: CompanySnapshotJpaRepository,
    private val coordinatorRepository: CoordinatorSnapshotJpaRepository,
    private val studentRepository: StudentSnapshotJpaRepository,
) {

    companion object {
        lateinit var companies: MutableList<CompanySnapshot>
        lateinit var coordinators: MutableList<CoordinatorSnapshot>
        lateinit var students: MutableList<StudentSnapshot>
    }

    @PostConstruct
    fun init() {
        companies = mutableListOf()
        if (companyRepository.count() == 0L) {
            companies.addAll(
                listOf(
                    CompanySnapshot(
                        id = CompanyId(),
                        name = Name("Netcetera"),
                        email = Email("netcetera@email.com"),
                        isActive = true
                    ),
                    CompanySnapshot(
                        id = CompanyId(),
                        name = Name("Intertec"),
                        email = Email("intertec@email.com"),
                        isActive = true
                    )
                )
            )
            companyRepository.saveAll(companies)
        }

        coordinators = mutableListOf()
        if (coordinatorRepository.count() == 0L) {
            coordinators.addAll(
                listOf(
                    CoordinatorSnapshot(
                        id = CoordinatorId(),
                        name = Name("Vesna Dimitrievska"),
                        email = Email("vesna.dimitrievska@email.com"),
                    ),
                    CoordinatorSnapshot(
                        id = CoordinatorId(),
                        name = Name("Andreja Naumovski"),
                        email = Email("andreja.naumovski@email.com"),
                    ),
                    CoordinatorSnapshot(
                        id = CoordinatorId(),
                        name = Name("Georgina Mirceva"),
                        email = Email("georgina.mirceva@email.com"),
                    ),
                )
            )
            coordinatorRepository.saveAll(coordinators)
        }

        students = mutableListOf()
        if (studentRepository.count() == 0L) {
            students.addAll(
                listOf(
                    StudentSnapshot(
                        id = StudentId(),
                        index = StudentIndex("111111"),
                        name = Name("John Doe"),
                        email = Email("john.doe@email.com"),
                        ECTSCredits(60)
                    ),
                    StudentSnapshot(
                        id = StudentId(),
                        index = StudentIndex("222222"),
                        name = Name("John Smith"),
                        email = Email("john.smith@email.com"),
                        ECTSCredits(120)
                    )
                )
            )
            studentRepository.saveAll(students)
        }

//        if (internshipViewJpaRepository.count() == 0L) {
//            val internship1Id = InternshipId()
//            commandGateway.sendAndWait<Any>(
//                CreateSearchingInternshipCommand(
//                    StudentCV(byteArrayOf())
//                ),
//            )
//        }

    }


}
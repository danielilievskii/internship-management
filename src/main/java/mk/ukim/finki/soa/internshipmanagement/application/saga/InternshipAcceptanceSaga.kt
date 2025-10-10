package mk.ukim.finki.soa.internshipmanagement.application.saga

import mk.ukim.finki.soa.internshipmanagement.model.command.AssignCoordinatorCommand
import mk.ukim.finki.soa.internshipmanagement.model.event.CoordinatorAssignedEvent
import mk.ukim.finki.soa.internshipmanagement.model.event.company.AgreedInternshipSubmittedEvent
import mk.ukim.finki.soa.internshipmanagement.model.event.student.InternshipAcceptedEvent
import mk.ukim.finki.soa.internshipmanagement.model.resolver.CoordinatorResolver
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.StudentId
import mk.ukim.finki.soa.internshipmanagement.service.StudentSnapshotReadService
import org.axonframework.commandhandling.gateway.CommandGateway
import org.axonframework.modelling.saga.SagaEventHandler
import org.axonframework.modelling.saga.SagaLifecycle
import org.axonframework.modelling.saga.StartSaga
import org.axonframework.spring.stereotype.Saga
import org.springframework.beans.factory.annotation.Autowired

@Saga
class InternshipAcceptanceSaga {

    @Transient
    @Autowired
    private lateinit var commandGateway: CommandGateway

    @Transient
    @Autowired
    private lateinit var coordinatorResolver: CoordinatorResolver

    @Transient
    @Autowired
    private lateinit var studentSnapshotReadService: StudentSnapshotReadService

    @StartSaga
    @SagaEventHandler(associationProperty = "internshipId")
    fun on(event: InternshipAcceptedEvent) {
        handleCoordinatorAssignation(event.internshipId, event.studentId)
    }

    @StartSaga
    @SagaEventHandler(associationProperty = "internshipId")
    fun on(event: AgreedInternshipSubmittedEvent) {
        handleCoordinatorAssignation(event.internshipId, event.studentId)
    }

    private fun handleCoordinatorAssignation(internshipId: InternshipId, studentId: StudentId) {
        val studentSnapshot = studentSnapshotReadService.findById(studentId)

        val coordinatorId = coordinatorResolver.resolveFromStudentIndex(studentSnapshot.index.value)

        commandGateway.send<Void>(
            AssignCoordinatorCommand(
                internshipId = internshipId,
                coordinatorId = coordinatorId
            )
        )
    }

    @SagaEventHandler(associationProperty = "internshipId")
    fun on(@Suppress("UNUSED_PARAMETER") event: CoordinatorAssignedEvent) {
        SagaLifecycle.end()
    }
}

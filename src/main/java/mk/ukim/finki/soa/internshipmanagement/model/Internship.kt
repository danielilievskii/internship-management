package mk.ukim.finki.soa.internshipmanagement.model

import jakarta.persistence.*
import mk.ukim.finki.soa.internshipmanagement.exception.InternshipWeekNotFoundException
import mk.ukim.finki.soa.internshipmanagement.exception.InvalidInternshipStateException
import mk.ukim.finki.soa.internshipmanagement.model.command.company.*
import mk.ukim.finki.soa.internshipmanagement.model.command.coordinator.ArchiveInternshipCommand
import mk.ukim.finki.soa.internshipmanagement.model.command.coordinator.CoordinatorAddWeekCommentCommand
import mk.ukim.finki.soa.internshipmanagement.model.command.coordinator.InvalidateJournalByCoordinatorCommand
import mk.ukim.finki.soa.internshipmanagement.model.command.coordinator.ValidateJournalByCoordinatorCommand
import mk.ukim.finki.soa.internshipmanagement.model.command.student.*
import mk.ukim.finki.soa.internshipmanagement.model.common.Identifier
import mk.ukim.finki.soa.internshipmanagement.model.common.LabeledEntity
import mk.ukim.finki.soa.internshipmanagement.model.event.company.*
import mk.ukim.finki.soa.internshipmanagement.model.event.coordinator.CoordinatorWeekCommentAddedEvent
import mk.ukim.finki.soa.internshipmanagement.model.event.coordinator.InternshipArchivedEvent
import mk.ukim.finki.soa.internshipmanagement.model.event.coordinator.JournalInvalidatedByCoordinatorEvent
import mk.ukim.finki.soa.internshipmanagement.model.event.coordinator.JournalValidatedByCoordinatorEvent
import mk.ukim.finki.soa.internshipmanagement.model.event.student.*
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.*
import org.axonframework.modelling.command.AggregateIdentifier
import org.axonframework.modelling.command.AggregateLifecycle
import org.axonframework.spring.stereotype.Aggregate

@Entity
@Aggregate(repository = "axonInternshipRepository")
class Internship : LabeledEntity {

    @AggregateIdentifier
    @EmbeddedId
    @AttributeOverride(name = "value", column = Column(name = "id"))
    private lateinit var id: InternshipId

    @Embedded
    @AttributeOverride(name = "value", column = Column(name = "status"))
    private lateinit var status: InternshipStatus

    @Embedded
    @AttributeOverride(name = "value", column = Column(name = "description"))
    private lateinit var description: Description

    @Embedded
    @AttributeOverride(name = "content", column = Column(name = "student_cv"))
    private lateinit var studentCV: StudentCV

    @Embedded
    @AttributeOverrides(
        AttributeOverride(name = "start.value", column = Column(name = "start_date")),
        AttributeOverride(name = "end.value", column = Column(name = "end_date"))
    )
    private lateinit var period: InternshipDateRange

    @Embedded
    @AttributeOverride(name = "value", column = Column(name = "contact_email"))
    private lateinit var companyContactEmail: Email

    @Embedded
    @AttributeOverride(name = "value", column = Column(name = "weekly_hours"))
    private lateinit var weeklyHours: WeeklyHours

    @OneToMany(cascade = [CascadeType.ALL], orphanRemoval = true)
    @JoinColumn(name = "internship_id")
    private var weeks: MutableList<InternshipWeek> = mutableListOf()


    override fun getId(): Identifier<out Any> {
        return id
    }

    override fun getLabel(): String {
        return "Internship (${id.value}) [${status.value}]"
    }

    // HANDLE COMMANDS
    // STUDENT

    fun handle(command: CreateSearchingInternshipCommand) {
        val event = SearchingInternshipCreatedEvent(
            internshipId = InternshipId(),
            studentCV = command.studentCV,
        )
        this.on(event)
        AggregateLifecycle.apply(event)
    }

    fun handle(command: DeleteSearchingInternshipCommand) {
        if (status.value != StatusType.SEARCHING) {
            throw InvalidInternshipStateException("Internships can only be deleted while in SEARCHING state.")
        }

        val event = SearchingInternshipDeletedEvent(command.internshipId)
        this.on(event)
        AggregateLifecycle.apply(event)
    }


    fun handle(command: EditSearchingInternshipCommand) {
        if (status.value != StatusType.SEARCHING) {
            throw InvalidInternshipStateException("Internships can only be edited while in SEARCHING state.")
        }

        val event = SearchingInternshipEditedEvent(
            internshipId = command.internshipId,
            newCV = command.newCV
        )
        this.on(event)
        AggregateLifecycle.apply(event)
    }

    fun handle(command: AcceptInternshipCommand) {
        val newStatus = status.transitionTo(StatusType.ACCEPTED)

        val event = InternshipAcceptedEvent(
            internshipId = command.internshipId,
            status = newStatus
        )
        this.on(event)
        AggregateLifecycle.apply(event)
    }

    fun handle(command: RejectInternshipCommand) {
        val newStatus = status.transitionTo(StatusType.REJECTED)

        val event = InternshipRejectedEvent(
            internshipId = command.internshipId,
            status = newStatus
        )
        this.on(event)
        AggregateLifecycle.apply(event)
    }

    fun handle(command: SubmitJournalCommand) {
        val newStatus = status.transitionTo(StatusType.JOURNAL_SUBMITTED)

        val event = JournalSubmittedEvent(
            internshipId = command.internshipId,
            status = newStatus
        )

        this.on(event)
        AggregateLifecycle.apply(event)
    }

    fun handle(command: CreateInternshipWeekCommand) {
        if (status.value != StatusType.ACCEPTED) {
            throw InvalidInternshipStateException("Internship weeks can only be created while the internship is in ACCEPTED state.")
        }

        val event = InternshipWeekCreatedEvent(
            internshipId = command.internshipId,
            weekId = InternshipWeekId(),
            period = command.period,
            description = command.description,
            workingHours = command.workingHours
        )
        this.on(event)
        AggregateLifecycle.apply(event)
    }

    fun handle(command: EditInternshipWeekCommand) {
        if (status.value != StatusType.ACCEPTED) {
            throw InvalidInternshipStateException("Internship weeks can only be edited while the internship is in ACCEPTED state.")
        }

        val week = weeks.find { it.getId() == command.weekId }
            ?: throw InternshipWeekNotFoundException(command.weekId)

        val event = InternshipWeekEditedEvent(
            internshipId = command.internshipId,
            weekId = command.weekId,
            newDescription = command.newDescription,
            newWorkingHours = command.newWorkingHours
        )

        this.on(event)
        AggregateLifecycle.apply(event)
    }

    fun handle(command: DeleteInternshipWeekCommand) {
        if (status.value != StatusType.ACCEPTED) {
            throw InvalidInternshipStateException("Internship weeks can only be deleted while the internship is in ACCEPTED state.")
        }

        val week = weeks.find { it.getId().value == command.weekId.value }
            ?: throw InternshipWeekNotFoundException(command.weekId)

        val event = InternshipWeekDeletedEvent(
            internshipId = command.internshipId,
            weekId = command.weekId
        )

        this.on(event)
        AggregateLifecycle.apply(event)
    }

    // COMPANY

    fun handle(command: SubmitInternshipCommand) {
        val newStatus = status.transitionTo(StatusType.SUBMITTED)

        val event = InternshipSubmittedEvent(
            internshipId = command.internshipId,
            description = command.description,
            period = command.period,
            weeklyHours = command.weeklyHours,
            contactEmail = command.contactEmail,
            status = newStatus
        )
        val notify = StudentNotifiedOfInternshipProposalEvent(command.internshipId)

        this.on(event)
        AggregateLifecycle.apply(event)
        AggregateLifecycle.apply(notify)
    }

    fun handle(command: SubmitAgreedInternshipCommand) {
        //TODO: Find the student by index
        // val student = studentService.findByIndex(command.studentIndex)

        val event = AgreedInternshipSubmittedEvent(
            internshipId = InternshipId(),
            description = command.description,
            period = command.period,
            weeklyHours = command.weeklyHours,
            contactEmail = command.contactEmail,
            status = InternshipStatus(StatusType.SUBMITTED)
        )

        this.on(event)
        AggregateLifecycle.apply(event)
    }

    fun handle(command: ValidateJournalByCompanyCommand) {
        val newStatus = status.transitionTo(StatusType.VALIDATED_BY_COMPANY)

        val validatedEvent = JournalValidatedByCompanyEvent(
            internshipId = command.internshipId,
            newStatus = newStatus
        )
        val notifyEvent = StudentNotifiedOfJournalValidationByCompanyEvent(command.internshipId)

        on(validatedEvent)
        AggregateLifecycle.apply(validatedEvent)
        AggregateLifecycle.apply(notifyEvent)
    }

    fun handle(command: InvalidateJournalByCompanyCommand) {
        val newStatus = status.transitionTo(StatusType.ACCEPTED)

        val invalidatedEvent = JournalInvalidatedByCompanyEvent(
            internshipId = command.internshipId,
            newStatus = newStatus
        )
        val notifyEvent = StudentNotifiedOfJournalInvalidationByCompanyEvent(command.internshipId)

        on(invalidatedEvent)
        AggregateLifecycle.apply(invalidatedEvent)
        AggregateLifecycle.apply(notifyEvent)
    }

    fun handle(command: CompanyAddWeekCommentCommand) {
        if (status.value != StatusType.JOURNAL_SUBMITTED) {
            throw InvalidInternshipStateException("Internship week comments by company can only be added while the internship is in JOURNAL SUBMITTED state.")
        }

        val week = weeks.find { it.getId() == command.weekId }
            ?: throw throw InternshipWeekNotFoundException(command.weekId)

        val event = CompanyWeekCommentAddedEvent(
            internshipId = command.internshipId,
            weekId = command.weekId,
            comment = command.comment
        )

        week.addCompanyComment(command.comment)
        AggregateLifecycle.apply(event)
    }

    //COORDINATOR

    fun handle(command: ValidateJournalByCoordinatorCommand) {
        val newStatus = status.transitionTo(StatusType.VALIDATED_BY_COORDINATOR)

        val event = JournalValidatedByCoordinatorEvent(command.internshipId, newStatus)
        val notify = StudentNotifiedOfInternshipValidationByCoordinatorEvent(command.internshipId)

        on(event)
        AggregateLifecycle.apply(event)
        AggregateLifecycle.apply(notify)
    }

    fun handle(command: InvalidateJournalByCoordinatorCommand) {
        val newStatus = status.transitionTo(StatusType.ACCEPTED)

        val event = JournalInvalidatedByCoordinatorEvent(command.internshipId, newStatus)
        val notify = StudentNotifiedOfJournalInvalidationByCoordinatorEvent(command.internshipId)

        on(event)
        AggregateLifecycle.apply(event)
        AggregateLifecycle.apply(notify)
    }

    fun handle(command: CoordinatorAddWeekCommentCommand) {
        if (status.value != StatusType.VALIDATED_BY_COMPANY) {
            throw InvalidInternshipStateException("Internship week comments by coordinator can only be added while the internship is in VALIDATED BY COMPANY state.")
        }

        val week = weeks.find { it.getId() == command.weekId }
            ?: throw InternshipWeekNotFoundException(command.weekId)

        week.addCoordinatorComment(command.comment)

        val event = CoordinatorWeekCommentAddedEvent(
            internshipId = command.internshipId,
            weekId = command.weekId,
            comment = command.comment
        )

        AggregateLifecycle.apply(event)
    }

    // ADMIN

    fun handle(command: ArchiveInternshipCommand) {
        val newStatus = status.transitionTo(StatusType.ARCHIVED)

        val event = InternshipArchivedEvent(command.internshipId, newStatus)

        on(event)
        AggregateLifecycle.apply(event)
    }


    // APPLY EVENTS
    // STUDENT

    fun on(event: SearchingInternshipCreatedEvent) {
        this.id = event.internshipId
        this.studentCV = event.studentCV
        this.status = event.status
    }

    fun on(event: SearchingInternshipDeletedEvent) {
        AggregateLifecycle.markDeleted()
    }

    fun on(event: SearchingInternshipEditedEvent) {
        this.studentCV = event.newCV
    }

    fun on(event: InternshipAcceptedEvent) {
        this.status = event.status
    }

    fun on(event: InternshipRejectedEvent) {
        this.status = event.status
    }

    fun on(event: JournalSubmittedEvent) {
        this.status = event.status
    }

    fun on(event: InternshipWeekCreatedEvent) {
        val week = InternshipWeek(
            id = event.weekId,
            period = event.period,
            description = event.description,
            workingHours = event.workingHours
        )
        weeks.add(week)
    }

    fun on(event: InternshipWeekEditedEvent) {
        val week = weeks.find { it.getId() == event.weekId }
            ?: throw IllegalArgumentException("InternshipWeek with ID ${event.weekId.value} not found.")

        week.applyEdit(event)
    }

    fun on(event: InternshipWeekDeletedEvent) {
        weeks = weeks.filterNot { it.getId().value == event.weekId.value }.toMutableList()
    }

    // COMPANY

    fun on(event: InternshipSubmittedEvent) {
        this.description = event.description
        this.period = event.period
        this.weeklyHours = event.weeklyHours
        this.companyContactEmail = event.contactEmail
        this.status = event.status
    }

    fun on(event: AgreedInternshipSubmittedEvent) {
        this.id = event.internshipId
        this.description = event.description
        this.period = event.period
        this.weeklyHours = event.weeklyHours
        this.companyContactEmail = event.contactEmail
        this.status = event.status
    }

    fun on(event: JournalValidatedByCompanyEvent) {
        this.status = event.newStatus
    }

    fun on(event: JournalInvalidatedByCompanyEvent) {
        this.status = event.newStatus
    }

    fun on(event: CompanyWeekCommentAddedEvent) {
        val week = weeks.find { it.getId() == event.weekId }
            ?: throw IllegalArgumentException("Week not found.")

        week.addCompanyComment(event.comment)
    }

    // COORDINATOR

    fun on(event: JournalValidatedByCoordinatorEvent) {
        this.status = event.newStatus
    }

    fun on(event: JournalInvalidatedByCoordinatorEvent) {
        this.status = event.newStatus
    }

    fun on(event: CoordinatorWeekCommentAddedEvent) {
        val week = weeks.find { it.getId() == event.weekId }
            ?: throw IllegalArgumentException("Week not found.")

        week.addCoordinatorComment(event.comment)
    }

    // ADMIN

    fun on(event: InternshipArchivedEvent) {
        this.status = event.newStatus
    }


}
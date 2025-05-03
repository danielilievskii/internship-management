package mk.ukim.finki.soa.internshipmanagement.model

import jakarta.persistence.*
import mk.ukim.finki.soa.internshipmanagement.InternshipWeek
import mk.ukim.finki.soa.internshipmanagement.model.command.company.CompanyAddWeekCommentCommand
import mk.ukim.finki.soa.internshipmanagement.model.command.company.InvalidateJournalByCompanyCommand
import mk.ukim.finki.soa.internshipmanagement.model.command.company.ProposeInternshipToStudentCommand
import mk.ukim.finki.soa.internshipmanagement.model.command.company.ValidateJournalByCompanyCommand
import mk.ukim.finki.soa.internshipmanagement.model.command.coordinator.ArchiveInternshipCommand
import mk.ukim.finki.soa.internshipmanagement.model.command.coordinator.CoordinatorAddWeekCommentCommand
import mk.ukim.finki.soa.internshipmanagement.model.command.coordinator.InvalidateJournalByCoordinatorCommand
import mk.ukim.finki.soa.internshipmanagement.model.command.coordinator.ValidateJournalByCoordinatorCommand
import mk.ukim.finki.soa.internshipmanagement.model.command.student.*
import mk.ukim.finki.soa.internshipmanagement.model.common.Identifier
import mk.ukim.finki.soa.internshipmanagement.model.common.LabeledEntity
import mk.ukim.finki.soa.internshipmanagement.model.event.company.CompanyWeekCommentAddedEvent
import mk.ukim.finki.soa.internshipmanagement.model.event.company.InternshipProposedToStudentEvent
import mk.ukim.finki.soa.internshipmanagement.model.event.company.JournalInvalidatedByCompanyEvent
import mk.ukim.finki.soa.internshipmanagement.model.event.company.JournalValidatedByCompanyEvent
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


    //    @Embedded
//    @AttributeOverrides(
//        AttributeOverride(name = "start.value", column = Column(name = "start_date")),
//        AttributeOverride(name = "end.value", column = Column(name = "end_date"))
//    )
//    private lateinit var period: InternshipDateRange

    //    @Embedded
//    @AttributeOverride(name = "value", column = Column(name = "contact_email"))
//    private lateinit var companyContantEmail: Email


//    @Embedded
//    @AttributeOverride(name = "value", column = Column(name = "weekly_hours"))
//    private lateinit var weeklyHo     urs: WeeklyHours

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
            internshipId = command.internshipId,
            studentCV = command.studentCV,
        )
        this.on(event)
        AggregateLifecycle.apply(event)
    }

    fun handle(command: DeleteSearchingInternshipCommand) {
        if (status.value != StatusType.SEARCHING) {
            throw IllegalStateException("Only internships in SEARCHING status can be deleted.")
        }

        val event = SearchingInternshipDeletedEvent(command.internshipId)
        this.on(event)
        AggregateLifecycle.apply(event)
    }


    fun handle(command: EditSearchingInternshipCommand) {
        if (status.value != StatusType.SEARCHING) {
            throw IllegalStateException("Internship can only be edited while in SEARCHING state.")
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
        val event = InternshipWeekCreatedEvent(
            internshipId = command.internshipId,
            weekId = command.weekId,
            period = command.period,
            description = command.description,
            workingHours = command.workingHours
        )
        this.on(event)
        AggregateLifecycle.apply(event)
    }

    fun handle(command: EditInternshipWeekCommand) {
        val week = weeks.find { it.getId() == command.weekId }
            ?: throw IllegalArgumentException("InternshipWeek with ID ${command.weekId.value} not found.")

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
        val week = weeks.find { it.getId().value == command.weekId.value }
            ?: throw IllegalStateException("Internship week not found.")

        val event = InternshipWeekDeletedEvent(
            internshipId = command.internshipId,
            weekId = command.weekId
        )

        this.on(event)
        AggregateLifecycle.apply(event)
    }

    // COMPANY

    fun handle(command: ProposeInternshipToStudentCommand) {
        if (status.value != StatusType.SEARCHING) {
            throw IllegalStateException("Internship can only be proposed while in SEARCHING state.")
        }

        val newStatus = status.transitionTo(StatusType.PROPOSED)

        val event = InternshipProposedToStudentEvent(
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
        val week = weeks.find { it.getId() == command.weekId }
            ?: throw IllegalArgumentException("Week not found.")

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

    fun handle(command: ArchiveInternshipCommand) {
        val newStatus = status.transitionTo(StatusType.ARCHIVED)

        val event = InternshipArchivedEvent(command.internshipId, newStatus)

        on(event)
        AggregateLifecycle.apply(event)
    }

    fun handle(command: CoordinatorAddWeekCommentCommand) {
        val week = weeks.find { it.getId() == command.weekId }
            ?: throw IllegalArgumentException("Week not found.")

        week.addCoordinatorComment(command.comment)

        val event = CoordinatorWeekCommentAddedEvent(
            internshipId = command.internshipId,
            weekId = command.weekId,
            comment = command.comment
        )

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

    fun on(event: InternshipProposedToStudentEvent) {
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

    fun on(event: InternshipArchivedEvent) {
        this.status = event.newStatus
    }

    fun on(event: CoordinatorWeekCommentAddedEvent) {
        val week = weeks.find { it.getId() == event.weekId }
            ?: throw IllegalArgumentException("Week not found.")

        week.addCoordinatorComment(event.comment)
    }


}
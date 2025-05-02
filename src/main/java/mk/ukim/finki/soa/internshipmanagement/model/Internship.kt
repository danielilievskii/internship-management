package mk.ukim.finki.soa.internshipmanagement.model

import jakarta.persistence.*
import mk.ukim.finki.soa.internshipmanagement.InternshipWeek
import mk.ukim.finki.soa.internshipmanagement.model.command.CreateSearchingInternshipCommand
import mk.ukim.finki.soa.internshipmanagement.model.command.SubmitInternshipCommand

import mk.ukim.finki.soa.internshipmanagement.model.common.Identifier
import mk.ukim.finki.soa.internshipmanagement.model.common.LabeledEntity
import mk.ukim.finki.soa.internshipmanagement.model.event.InternshipSubmittedEvent
import mk.ukim.finki.soa.internshipmanagement.model.event.SearchingInternshipCreatedEvent
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.*
import org.axonframework.commandhandling.CommandHandler
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

    @Lob
    @Column(name = "student_cv")
    private var studentCV: ByteArray? = null

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

//    @OneToMany(cascade = [CascadeType.ALL], orphanRemoval = true)
//    @JoinColumn(name = "internship_id")
//    private var weeks: List<InternshipWeek> = emptyList()

    override fun getId(): Identifier<out Any> {
        return id
    }

    override fun getLabel(): String {
        return "Internship (${id.value}) [${status.value}]"
    }

    @CommandHandler
    constructor(command: CreateSearchingInternshipCommand) {
        val event = SearchingInternshipCreatedEvent(command)

        this.on(event)
        AggregateLifecycle.apply(event)
    }

    fun on(event: SearchingInternshipCreatedEvent) {
        this.id = event.internshipId
        this.studentCV = event.studentCV
        this.status = event.status
    }

    @CommandHandler
    fun handle(command: SubmitInternshipCommand) {
        val newStatus = this.status.transitionTo(StatusType.SUBMITTED)

        val event = InternshipSubmittedEvent(
            internshipId = command.internshipId,
            description = command.description,
            status = newStatus
        )

        this.on(event)
        AggregateLifecycle.apply(event)
    }

    fun on(event: InternshipSubmittedEvent) {
        this.description = event.description
        this.status = event.status
    }
}
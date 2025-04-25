package mk.ukim.finki.soa.internshipmanagement.model

import jakarta.persistence.AttributeOverride
import jakarta.persistence.Column
import jakarta.persistence.EmbeddedId
import jakarta.persistence.Entity
import jakarta.persistence.Lob
import mk.ukim.finki.soa.internshipmanagement.model.command.CreateSearchingInternshipCommand

import mk.ukim.finki.soa.internshipmanagement.model.common.Identifier
import mk.ukim.finki.soa.internshipmanagement.model.common.LabeledEntity
import mk.ukim.finki.soa.internshipmanagement.model.event.SearchingInternshipCreatedEvent
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipStatus
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

    private lateinit var status: InternshipStatus

    private lateinit var description: String

    @Lob
    @Column(name = "student_cv")
    private var studentCV: ByteArray? = null

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
}
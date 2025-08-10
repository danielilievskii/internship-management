package mk.ukim.finki.soa.internshipmanagement.model

import jakarta.persistence.AttributeOverride
import jakarta.persistence.Column
import jakarta.persistence.Embedded
import jakarta.persistence.EmbeddedId
import jakarta.persistence.Entity
import mk.ukim.finki.soa.internshipmanagement.model.common.Identifier
import mk.ukim.finki.soa.internshipmanagement.model.common.LabeledEntity
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.*
import java.time.LocalDateTime

@Entity
class InternshipStatusChange : LabeledEntity {
    @EmbeddedId
    @AttributeOverride(name = "value", column = Column(name = "id"))
    private lateinit var id: InternshipStatusChangeId

    @Embedded
    @AttributeOverride(name = "value", column = Column(name = "internship_id"))
    private lateinit var internshipId: InternshipId

    @Embedded
    @AttributeOverride(name = "value", column = Column(name = "previous_status"))
    private var previousStatus: InternshipStatus? = null

    @Embedded
    @AttributeOverride(name = "value", column = Column(name = "new_status"))
    private lateinit var newStatus: InternshipStatus

    @Column(name = "changed_at")
    private lateinit var changedAt: LocalDateTime

    override fun getId(): Identifier<out Any> {
        return id;
    }

    override fun getLabel(): String {
        return "Internship Status Change (${id.value}) [previousStatus: ${previousStatus?.value}, newStatus: ${newStatus.value} changedAt: ${changedAt}]"
    }

    constructor()

    constructor(
        id: InternshipStatusChangeId,
        internshipId: InternshipId,
        changedAt: LocalDateTime,
        previousStatus: InternshipStatus?,
        newStatus: InternshipStatus
    ) : this() {
        this.id = id
        this.internshipId = internshipId
        this.previousStatus = previousStatus
        this.newStatus = newStatus
        this.changedAt = changedAt
    }
}
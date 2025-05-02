package mk.ukim.finki.soa.internshipmanagement

import jakarta.persistence.AttributeOverride
import jakarta.persistence.AttributeOverrides
import jakarta.persistence.Column
import jakarta.persistence.Embedded
import jakarta.persistence.EmbeddedId
import jakarta.persistence.Entity
import mk.ukim.finki.soa.internshipmanagement.model.common.Identifier
import mk.ukim.finki.soa.internshipmanagement.model.common.LabeledEntity
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.*

@Entity
class InternshipWeek : LabeledEntity {
    @EmbeddedId
    @AttributeOverride(name = "value", column = Column(name = "id"))
    private lateinit var id: InternshipWeekId

    @Embedded
    @AttributeOverrides(
        AttributeOverride(name = "start.value", column = Column(name = "start_date")),
        AttributeOverride(name = "end.value", column = Column(name = "end_date"))
    )
    private lateinit var period: InternshipWeekDateRange

    @Embedded
    @AttributeOverride(name = "value", column = Column(name = "description"))
    private lateinit var description: Description

    @Embedded
    @AttributeOverride(name = "value", column = Column(name = "company_description"))
    private var companyComment: Comment? = null

    @Embedded
    @AttributeOverride(name = "value", column = Column(name = "coordinator_description"))
    private var coordinatorComment: Comment? = null

    @Embedded
    @AttributeOverride(name = "value", column = Column(name = "working_hours"))
    private lateinit var workingHours: WeeklyHours

    override fun getId(): Identifier<out Any> {
        return id;
    }

    override fun getLabel(): String {
        return "Internship Week (${id.value}) [description: ${description}, date range: ${period}, Company comment: ${companyComment?.value}, Coordinator comment: ${coordinatorComment?.value}, working hours: ${workingHours}]"
    }

    //TODO: Implement commands and events


}
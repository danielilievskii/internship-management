package mk.ukim.finki.soa.internshipmanagement.application.eventhandler.student

import mk.ukim.finki.soa.internshipmanagement.infrastructure.notification.impl.EmailNotificationService
import mk.ukim.finki.soa.internshipmanagement.model.event.student.notifications.*
import org.axonframework.eventhandling.EventHandler
import org.springframework.stereotype.Component

@Component
class StudentNotificationEventHandler(
    private val emailNotificationService: EmailNotificationService
) {

    @EventHandler
    fun on(event: StudentNotifiedOfInternshipProposalEvent) {
        println("Handling StudentNotifiedOfInternshipProposalEvent for ${event.internshipId.value}")
        emailNotificationService.sendNotification(
            event.internshipId,
            "New Internship Proposal",
            "You have received a new internship proposal."
        )
    }

    @EventHandler
    fun on(event: StudentNotifiedOfJournalValidationByCompanyEvent) {
        println("Handling StudentNotifiedOfJournalValidationByCompanyEvent for ${event.internshipId.value}")
        emailNotificationService.sendNotification(
            event.internshipId,
            "Journal Validated by Company",
            "Your internship journal has been validated by your company."
        )
    }

    @EventHandler
    fun on(event: StudentNotifiedOfJournalInvalidationByCompanyEvent) {
        println("Handling StudentNotifiedOfJournalInvalidationByCompanyEvent for ${event.internshipId.value}")
        emailNotificationService.sendNotification(
            event.internshipId,
            "Journal Invalidation by Company",
            "Your company has invalidated your journal. Please review and resubmit."
        )
    }

    @EventHandler
    fun on(event: StudentNotifiedOfInternshipValidationByCoordinatorEvent) {
        println("Handling StudentNotifiedOfInternshipValidationByCoordinatorEvent for ${event.internshipId.value}")
        emailNotificationService.sendNotification(
            event.internshipId,
            "Internship Validated by Coordinator",
            "Your internship has been validated by your coordinator."
        )
    }

    @EventHandler
    fun on(event: StudentNotifiedOfJournalInvalidationByCoordinatorEvent) {
        println("Handling StudentNotifiedOfJournalInvalidationByCoordinatorEvent for ${event.internshipId.value}")
        emailNotificationService.sendNotification(
            event.internshipId,
            "Journal Invalidation by Coordinator",
            "Your coordinator has invalidated your journal. Please make corrections."
        )
    }
}

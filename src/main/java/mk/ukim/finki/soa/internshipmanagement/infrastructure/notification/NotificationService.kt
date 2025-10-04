package mk.ukim.finki.soa.internshipmanagement.infrastructure.notification

import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId

interface NotificationService {
    fun sendNotification(internshipId: InternshipId, subject: String, body: String)
}
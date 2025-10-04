package mk.ukim.finki.soa.internshipmanagement.infrastructure.notification.impl

import mk.ukim.finki.soa.internshipmanagement.infrastructure.notification.NotificationService
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId
import mk.ukim.finki.soa.internshipmanagement.service.InternshipViewReadService
import mk.ukim.finki.soa.internshipmanagement.service.StudentSnapshotReadService
import org.springframework.mail.javamail.JavaMailSender
import org.springframework.mail.javamail.MimeMessageHelper
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional(readOnly = true)
class EmailNotificationService(
    private val mailSender: JavaMailSender,
    private val internshipViewReadService: InternshipViewReadService,
    private val studentSnapshotReadService: StudentSnapshotReadService
) : NotificationService {

    override fun sendNotification(internshipId: InternshipId, subject: String, body: String) {
        val internshipComposite = internshipViewReadService.findById(internshipId)
            ?: throw IllegalArgumentException("Internship ${internshipId.value} not found")

        val studentId = internshipComposite.studentId
        val studentSnapshot = studentSnapshotReadService.findById(studentId)
        val recipientEmail = studentSnapshot.email.value

        sendEmail(recipientEmail, subject, body)
    }

    private fun sendEmail(to: String, subject: String, body: String) {
        val message = mailSender.createMimeMessage()
        val helper = MimeMessageHelper(message, true, "UTF-8")
        helper.setTo(to)
        helper.setSubject(subject)
        helper.setText(body, false)
        mailSender.send(message)
    }
}

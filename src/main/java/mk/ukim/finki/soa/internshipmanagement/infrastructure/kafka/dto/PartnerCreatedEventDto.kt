package mk.ukim.finki.soa.internshipmanagement.infrastructure.kafka.dto

data class PartnerCreatedEventDto (
    val id: String,
    val name: String,
    val email: String,
    val isActive: Boolean
)
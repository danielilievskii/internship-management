package mk.ukim.finki.soa.internshipmanagement.infrastructure.kafka.dto

data class PartnerActivationChangedEventDto(
    val id: String,
    val isActive: Boolean
)
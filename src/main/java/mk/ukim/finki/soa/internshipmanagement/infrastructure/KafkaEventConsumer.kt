package mk.ukim.finki.soa.internshipmanagement.infrastructure

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
import mk.ukim.finki.soa.internshipmanagement.service.PartnerTestService
import com.fasterxml.jackson.module.kotlin.KotlinModule
import com.fasterxml.jackson.module.kotlin.readValue
import mk.ukim.finki.soa.internshipmanagement.infrastructure.kafka.dto.PartnerActivationChangedEventDto
import mk.ukim.finki.soa.internshipmanagement.infrastructure.kafka.dto.PartnerCreatedEventDto
import mk.ukim.finki.soa.internshipmanagement.infrastructure.kafka.dto.PartnerDeletedEventDto
import mk.ukim.finki.soa.internshipmanagement.infrastructure.kafka.dto.PartnerEditedEventDto
import org.apache.kafka.clients.consumer.ConsumerRecord
import org.springframework.kafka.annotation.KafkaListener
import org.springframework.stereotype.Service

@Service
class KafkaEventConsumer(
    private val partnerTestService:  PartnerTestService
) {

    val objectMapper = ObjectMapper()
        .registerModules(KotlinModule.Builder().build())
        .registerModule(JavaTimeModule())

    @KafkaListener(topics = ["partner.activation.changed"])
    fun listen(record: ConsumerRecord<String, String>) {

        try {
            val eventDto: PartnerActivationChangedEventDto = objectMapper.readValue(record.value())
            partnerTestService.changePartnerActivation(eventDto);
        } catch (ex: Exception) {
            println(ex.message)
        }

    }

    @KafkaListener(topics = ["partner.created"])
    fun listenPartnerCreated(record: ConsumerRecord<String, String>) {
        try {
            val eventDto: PartnerCreatedEventDto = objectMapper.readValue(record.value())
            partnerTestService.createPartner();
        } catch (ex: Exception) {
            println(ex.message)
        }
    }

    @KafkaListener(topics = ["partner.edited"])
    fun listenPartnerEdited(record: ConsumerRecord<String, String>) {
        try {
            val eventDto: PartnerEditedEventDto = objectMapper.readValue(record.value())
            partnerTestService.editPartner();
        } catch (ex: Exception) {
            println(ex.message)
        }
    }

    @KafkaListener(topics = ["partner.removed"])
    fun listenPartnerRemoved(record: ConsumerRecord<String, String>) {
        try {
            val eventDto: PartnerDeletedEventDto = objectMapper.readValue(record.value())
            partnerTestService.removePartner();
        } catch (ex: Exception) {
            println(ex.message)
        }
    }

}


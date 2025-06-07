package mk.ukim.finki.soa.internshipmanagement.infrastructure

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
import mk.ukim.finki.soa.internshipmanagement.service.PartnerTestService
import com.fasterxml.jackson.module.kotlin.KotlinModule
import com.fasterxml.jackson.module.kotlin.readValue
import mk.ukim.finki.soa.internshipmanagement.infrastructure.kafka.dto.PartnerActivationChangedEventDto
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
}


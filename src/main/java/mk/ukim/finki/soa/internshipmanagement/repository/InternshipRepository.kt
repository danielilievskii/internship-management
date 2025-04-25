package mk.ukim.finki.soa.internshipmanagement.repository

import jakarta.persistence.EntityManager
import jakarta.persistence.PersistenceContext
import mk.ukim.finki.soa.internshipmanagement.model.Internship
import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId
import org.axonframework.common.jpa.SimpleEntityManagerProvider
import org.axonframework.eventhandling.EventBus
import org.axonframework.messaging.annotation.ParameterResolverFactory
import org.axonframework.modelling.command.GenericJpaRepository
import org.axonframework.modelling.command.Repository
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration("internshipRepositoriesConfiguration")
class AxonRepositoriesConfiguration(@PersistenceContext val entityManager: EntityManager) {

    @Bean("axonInternshipRepository")
    fun internshipGenericJpaRepository(
        eventBus: EventBus,
        parameterResolverFactory: ParameterResolverFactory
    ): Repository<Internship> {
        return GenericJpaRepository.builder(Internship::class.java)
            .entityManagerProvider(SimpleEntityManagerProvider(entityManager))
            .parameterResolverFactory(parameterResolverFactory)
            .eventBus(eventBus)
            .identifierConverter { InternshipId(it) }
            .build()
    }
}
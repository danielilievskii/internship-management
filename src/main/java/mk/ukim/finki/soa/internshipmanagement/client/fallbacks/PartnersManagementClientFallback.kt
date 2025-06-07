package mk.ukim.finki.soa.internshipmanagement.client.fallbacks

import mk.ukim.finki.soa.internshipmanagement.client.PartnersManagementClient
import mk.ukim.finki.soa.internshipmanagement.client.dto.PartnerDto
import org.springframework.stereotype.Component


@Component
class PartnersManagementClientFallback : PartnersManagementClient {

    override fun getActivePartners(): List<PartnerDto> {
        // return emptyList()
        return listOf(
            PartnerDto(
                id = "Partner:kadbibiobjelodugme123",
                name = "Intertec"
            ),
            PartnerDto(
                id = "Partner:kadbibiobjelodugme321",
                name = "G+D Netcetera"
            ),
            PartnerDto(
                id = "Partner:kadbibiobjelodugme333",
                name = "Sorsix"
            )
        )
    }

}
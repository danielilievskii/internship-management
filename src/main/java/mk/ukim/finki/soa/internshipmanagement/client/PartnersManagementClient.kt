package mk.ukim.finki.soa.internshipmanagement.client

import mk.ukim.finki.soa.internshipmanagement.client.dto.PartnerDto
import mk.ukim.finki.soa.internshipmanagement.client.fallbacks.PartnersManagementClientFallback
import org.springframework.cloud.openfeign.FeignClient
import org.springframework.web.bind.annotation.GetMapping

@FeignClient(
    name = "partners-management",
    fallback = PartnersManagementClientFallback::class
)
interface PartnersManagementClient {
    @GetMapping("/api/partners/active")
    fun getActivePartners(): List<PartnerDto>
}
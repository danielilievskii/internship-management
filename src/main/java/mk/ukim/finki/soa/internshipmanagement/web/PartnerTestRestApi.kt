package mk.ukim.finki.soa.internshipmanagement.web

import io.swagger.v3.oas.annotations.tags.Tag
import mk.ukim.finki.soa.internshipmanagement.service.PartnerTestService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@Tag(
    name = "Partner Test Query API",
    description = "Handles test queries related to Partners."
)
@RestController
@RequestMapping("/api/partners")
class PartnerTestRestApi(val partnerTestService: PartnerTestService) {

    @GetMapping("/active")
    fun refreshActivePartners() : ResponseEntity<Any> {
        return ResponseEntity.ok(partnerTestService.refreshActivePartners())
    }
}
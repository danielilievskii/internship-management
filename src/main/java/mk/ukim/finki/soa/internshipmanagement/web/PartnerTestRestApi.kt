package mk.ukim.finki.soa.internshipmanagement.web

import io.swagger.v3.oas.annotations.tags.Tag
import mk.ukim.finki.soa.internshipmanagement.service.PartnerTestService
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@Tag(
    name = "Partner Test Query API",
    description = "Handles test queries related to Partners."
)
@RestController
@RequestMapping("/api/partners")
class PartnerTestRestApi(val partnerTestService: PartnerTestService) {

}
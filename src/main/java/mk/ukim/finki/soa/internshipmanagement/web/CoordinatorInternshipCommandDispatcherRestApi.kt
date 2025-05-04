package mk.ukim.finki.soa.internshipmanagement.web

import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/internship/submitCommand")
@Tag(
    name = "Coordinator Internship Command API",
    description = "Handles coordinator commands related to internship journal management."
)
class CoordinatorInternshipCommandDispatcherRestApi() {
    // TODO: Implement Endpoints
}
package mk.ukim.finki.soa.internshipmanagement.web

import mk.ukim.finki.soa.internshipmanagement.model.valueobject.InternshipId
import mk.ukim.finki.soa.internshipmanagement.model.view.InternshipView
import mk.ukim.finki.soa.internshipmanagement.service.InternshipViewReadService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/internships")
class InternshipQueryRestApi(val internshipViewReadService: InternshipViewReadService) {

    @GetMapping("/{internshipId}")
    fun findById(@PathVariable internshipId: InternshipId) : InternshipView {
        return internshipViewReadService.findById(internshipId)
    }

    @GetMapping("/all")
    fun findAll() : List<InternshipView> {
        return internshipViewReadService.findAll()
    }

}
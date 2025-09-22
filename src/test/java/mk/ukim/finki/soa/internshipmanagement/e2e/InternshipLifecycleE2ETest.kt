package mk.ukim.finki.soa.internshipmanagement.e2e

import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.boot.test.web.server.LocalServerPort
import org.springframework.core.io.ClassPathResource
import org.springframework.http.*
import org.springframework.test.context.ActiveProfiles
import org.springframework.util.LinkedMultiValueMap
import java.net.URI
import java.time.Duration
import java.time.LocalDate

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
class InternshipLifecycleE2ETest(
    @Autowired private val injectedRestTemplate: TestRestTemplate,
    @LocalServerPort private val port: Int
) : KeycloakE2ETestBase(injectedRestTemplate) {

    private fun baseUrl(path: String) = "http://localhost:$port$path"

    private fun jsonHeaders(token: String) = HttpHeaders().apply {
        accept = listOf(MediaType.APPLICATION_JSON)
        contentType = MediaType.APPLICATION_JSON
        setBearerAuth(token)
    }

    // NB: Do NOT pre-set multipart Content-Type here (let RestTemplate add boundary)
    private fun authOnlyHeaders(token: String) = HttpHeaders().apply {
        setBearerAuth(token)
    }

    private fun extractFirstUuid(text: String): String {
        val re = Regex("""[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}""")
        return re.find(text)?.value ?: error("No UUID in: $text")
    }

    private fun fetchLatestInternshipId(studentToken: String, timeout: Duration = Duration.ofSeconds(8)): String {
        val deadline = System.nanoTime() + timeout.toNanos()
        var lastBody = ""
        while (System.nanoTime() < deadline) {
            val resp = restTemplate.exchange(
                baseUrl("/api/internships/all"),
                HttpMethod.GET,
                HttpEntity<Void>(authOnlyHeaders(studentToken)),
                String::class.java
            )
            if (resp.statusCode == HttpStatus.OK) {
                lastBody = resp.body ?: ""
                runCatching { return extractFirstUuid(lastBody) }
            }
            Thread.sleep(200)
        }
        error("No internshipId found before timeout. Last body:\n$lastBody")
    }

    @Test
    fun `student submits CV, company posts internship, student accepts, journal submitted, company validates, coordinator validates`() {
        val studentToken = getToken("111111")
        val companyToken = getToken("nca")
        val profToken = getToken("riste.stojanov")

        // --- Student submits CV (multipart) ---
        val cv = ClassPathResource("cv.pdf")
        val parts = LinkedMultiValueMap<String, Any>().apply {
            // wrap the file in its own HttpEntity so Spring sets each part's headers correctly
            val filePartHeaders = HttpHeaders().apply { contentType = MediaType.APPLICATION_PDF }
            add("studentCV", HttpEntity(cv, filePartHeaders))
        }

        val multipartReq = RequestEntity
            .post(URI.create(baseUrl("/student/submitCommand/CreateSearchingInternship")))
            .headers(authOnlyHeaders(studentToken))              // only auth here
            .contentType(MediaType.MULTIPART_FORM_DATA)          // RestTemplate will add boundary
            .body(parts)

        val studentResp = restTemplate.exchange(multipartReq, String::class.java)
        assertThat(studentResp.statusCode).isEqualTo(HttpStatus.OK)

        // --- Get internshipId from query side ---
        val internshipId = fetchLatestInternshipId(studentToken)

        // --- Company submits internship (SEARCHING -> SUBMITTED) ---
        val submitInternshipBody = mapOf(
            "internshipId" to internshipId,
            "description" to "Backend Internship",
            "fromDate" to LocalDate.now().toString(),
            "toDate" to LocalDate.now().plusMonths(3).toString(),
            "weeklyHours" to 20,
            "contactEmail" to "hr@company.com"
        )
        val submitReq = HttpEntity(submitInternshipBody, jsonHeaders(companyToken))
        val submitResp = restTemplate.postForEntity(
            baseUrl("/company/submitCommand/SubmitInternship"),
            submitReq,
            String::class.java
        )
        assertThat(submitResp.statusCode).isEqualTo(HttpStatus.OK)

        // --- Student accepts internship (SUBMITTED -> ACCEPTED) ---
        val acceptReq = HttpEntity(mapOf("internshipId" to internshipId), jsonHeaders(studentToken))
        val acceptResp = restTemplate.postForEntity(
            baseUrl("/student/submitCommand/AcceptInternship"),
            acceptReq,
            String::class.java
        )
        assertThat(acceptResp.statusCode).isEqualTo(HttpStatus.OK)

        // --- Student submits journal (ACCEPTED -> JOURNAL_SUBMITTED) ---
        val journalReq = HttpEntity(mapOf("internshipId" to internshipId), jsonHeaders(studentToken))
        val journalResp = restTemplate.postForEntity(
            baseUrl("/student/submitCommand/submitJournal"),
            journalReq,
            String::class.java
        )
        assertThat(journalResp.statusCode).isEqualTo(HttpStatus.OK)

        // --- Company validates journal (JOURNAL_SUBMITTED -> VALIDATED_BY_COMPANY) ---
        val compValidateReq = HttpEntity(mapOf("internshipId" to internshipId), jsonHeaders(companyToken))
        val compValidateResp = restTemplate.postForEntity(
            baseUrl("/company/submitCommand/ValidateJournalByCompany"),
            compValidateReq,
            String::class.java
        )
        assertThat(compValidateResp.statusCode).isEqualTo(HttpStatus.OK)

        // --- Coordinator validates (VALIDATED_BY_COMPANY -> VALIDATED_BY_COORDINATOR) ---
        val coordReq = HttpEntity(mapOf("internshipId" to internshipId), jsonHeaders(profToken))
        val coordResp = restTemplate.postForEntity(
            baseUrl("/internship/submitCommand/ValidateJournal"),
            coordReq,
            String::class.java
        )
        assertThat(coordResp.statusCode).isEqualTo(HttpStatus.OK)
    }
}

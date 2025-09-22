package mk.ukim.finki.soa.internshipmanagement.e2e

import org.assertj.core.api.Assertions.assertThat
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.http.*
import org.springframework.util.LinkedMultiValueMap
import org.springframework.util.MultiValueMap

open class KeycloakE2ETestBase(
    @Autowired protected val restTemplate: TestRestTemplate
) {
    private val tokenUrl =
        "http://localhost:8001/realms/finki-services/protocol/openid-connect/token"

    private val clientId = "api-gateway"
    private val clientSecret = "uiJmTgew4w6ownGJOxxUwh2WYANEmEEY"

    fun getToken(username: String, password: String = "SystemPass"): String {
        val headers = HttpHeaders()
        headers.contentType = MediaType.APPLICATION_FORM_URLENCODED

        val form: MultiValueMap<String, String> = LinkedMultiValueMap()
        form.add("client_id", clientId)
        form.add("client_secret", clientSecret)
        form.add("grant_type", "password")
        form.add("username", username)
        form.add("password", password)

        val request = HttpEntity(form, headers)

        val response = restTemplate.postForEntity(tokenUrl, request, Map::class.java)
        assertThat(response.statusCode).isEqualTo(HttpStatus.OK)

        return response.body?.get("access_token") as String
    }

    fun bearerHeaders(
        token: String,
        contentType: MediaType = MediaType.APPLICATION_JSON
    ): HttpHeaders =
        HttpHeaders().apply {
            this.contentType = contentType
            setBearerAuth(token)
        }
}

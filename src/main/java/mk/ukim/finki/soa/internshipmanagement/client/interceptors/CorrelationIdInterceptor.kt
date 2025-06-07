package mk.ukim.finki.soa.internshipmanagement.client.interceptors

import feign.RequestInterceptor
import feign.RequestTemplate
import org.springframework.stereotype.Component
import java.util.*

@Component
class CorrelationIdInterceptor : RequestInterceptor {
    override fun apply(requestTemplate: RequestTemplate) {
        if (!requestTemplate.headers().containsKey("X-Correlation-ID")) {
            val correlationId = UUID.randomUUID().toString()
            requestTemplate.header("X-Correlation-ID", correlationId)
        }
    }
}
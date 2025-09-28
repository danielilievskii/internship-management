package mk.ukim.finki.soa.internshipmanagement.application.mapper

import org.springframework.stereotype.Component

@Component
class CommandMapperRegistry(
    private val mappers: List<CommandMapper<*, *>>
) {
    fun <D, C> getMapper(dtoClass: Class<D>, cmdClass: Class<C>): CommandMapper<D, C> {
        return mappers.filterIsInstance<CommandMapper<D, C>>()
            .firstOrNull()
            ?: throw IllegalArgumentException("No mapper found for ${dtoClass.simpleName} -> ${cmdClass.simpleName}")
    }
}

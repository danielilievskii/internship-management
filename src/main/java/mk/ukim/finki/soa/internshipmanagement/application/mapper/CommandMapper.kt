package mk.ukim.finki.soa.internshipmanagement.application.mapper

interface CommandMapper<D, C> {
    fun fromDto(dto: D): C
}

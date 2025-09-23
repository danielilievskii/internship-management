import {InternshipView, InternshipDetailsView, PaginatedResponse} from "@/types/internship.ts";


// Normalize a single InternshipView
export function mapApiInternship(apiObj: any): InternshipView {
    return {
        id: apiObj.id?.value,
        status: apiObj.status?.value,
        studentView: {
            id: apiObj.studentView?.id.value,
            index: apiObj.studentView?.index.value,
            name: apiObj.studentView?.name.value,
        },
        coordinatorView: {
            id: apiObj.coordinatorView?.id.value,
            name: apiObj.coordinatorView?.name.value
        },
        companyView: {
            id: apiObj.companyView?.id.value,
            name: apiObj.companyView?.name.value
        },
        period: apiObj.period ?? null,
    };
}

// Normalize InternshipDetailsView
export function mapApiInternshipDetails(apiObj: any): InternshipDetailsView {
    return {
        ...mapApiInternship(apiObj),
        description: apiObj.description ?? "",
        companyContactEmail: apiObj.companyContactEmail ?? "",
        weeklyHours: apiObj.weeklyHours ?? 0,
        weeks: apiObj.weeks?.map((w: any) => ({
            // id: w.id?.value,
            // title: w.title ?? "",
            // content: w.content ?? "",
        })) ?? [],
    };
}

// Normalize PaginatedResponse
export function mapPaginatedResponse<T>(
    apiResponse: any,
    mapper: (item: any) => T
): PaginatedResponse<T> {
    return {
        content: apiResponse.content.map(mapper),
        totalElements: apiResponse.totalElements,
        totalPages: apiResponse.totalPages,
        size: apiResponse.size,
        number: apiResponse.number,
    };
}

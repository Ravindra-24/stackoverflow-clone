const questionsReducer = (
    state = {
        data: null,
        pagination: {
            total: 0,
            page: 1,
            limit: 10,
            totalPages: 1,
            hasNextPage: false,
            hasPrevPage: false,
            filters: { q: "", tag: "", sort: "newest" },
        },
        stats: null,
    },
    action
) => {
switch (action.type) {
    case "POST_QUESTION":
        return {...state }
    case "POST_ANSWER":
        return {...state }
    case "FETCH_ALL_QUESTIONS":
        return {
            ...state,
            data: action.payload.items,
            pagination: {
                total: action.payload.total,
                page: action.payload.page,
                limit: action.payload.limit,
                totalPages: action.payload.totalPages,
                hasNextPage: action.payload.hasNextPage,
                hasPrevPage: action.payload.hasPrevPage,
                filters: action.payload.filters,
            },
        }
    case "FETCH_QUESTION_STATS":
        return { ...state, stats: action.payload }
    default:
        return state
}
}

export default questionsReducer

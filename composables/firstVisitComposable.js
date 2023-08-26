import { reactive } from 'vue';

// No transition to start, set default to true.
const firstVisitState = reactive({
    isFirstVisit: true,
});

export const useFirstVisitComposable = () => {
    const firstVisitComplete = () => {
        firstVisitState.isFirstVisit = false;
    };

    return {
        firstVisitState,
        firstVisitComplete,
    };
};

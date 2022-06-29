import { useElementSize, debouncedWatch } from "@vueuse/core";
export default {
    beforeMount(el, binding) {
        const { width } = useElementSize(el);
        if (width.value === 0) return;
        const { value } = binding;
        debouncedWatch(
            width,
            () => {
                value && value.resize();
            },
            { debounce: 500 }
        );
    }
}

import flagsmith from 'flagsmith';

// Initialize Flagsmith
flagsmith.init({
    environmentID: import.meta.env.VITE_FLAGSMITH_ENVIRONMENT_ID,
    onChange: (oldFlags, params) => {
        // Ensure oldFlags is not null before proceeding
        if (!oldFlags) {
            return;
        }

        const { isFromServer } = params;

        // Check for changes
        const flagsChanged = Object.keys(oldFlags).some(
            key => flagsmith.getValue(key) !== (oldFlags[key] as any)
        );        

        if (flagsChanged && !isFromServer) {
            // You might want to reload the page or notify the user
            console.log("Feature flags have changed.");
        }
    }
});

export { flagsmith };

import { createContext, useContext } from 'react';
import { usePlayground } from './usePlayground';

const PlaygroundContext = createContext<ReturnType<typeof usePlayground> | undefined>(undefined);


export const PlaygroundProvider = ({ children }: { children: React.ReactNode }) => {
    const playgroundState = usePlayground();

    return (
        <PlaygroundContext.Provider value={playgroundState}>
            {children}
        </PlaygroundContext.Provider>
    );
};

export const usePlaygroundContext = () => {
    const context = useContext(PlaygroundContext);
    if (context === undefined) {
        throw new Error('usePlaygroundContext must be used within a PlaygroundProvider');
    }
    return context;
};
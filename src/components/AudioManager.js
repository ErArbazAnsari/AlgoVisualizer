import { useEffect, useState } from "react";

export const useAudio = (mute, audio) => {
    const [audioCtx, setAudioCtx] = useState(null);
    const [gainNode, setGainNode] = useState(null);

    // Initialize AudioContext and GainNode
    useEffect(() => {
        if (audioCtx === null) {
            const newAudioCtx = new (AudioContext ||
                window.webkitAudioContext)();
            const newGainNode = newAudioCtx.createGain();
            newGainNode.connect(newAudioCtx.destination);
            setAudioCtx(newAudioCtx);
            setGainNode(newGainNode);
        }
    }, [audioCtx]);

    // Update gain value when audio changes
    useEffect(() => {
        if (gainNode) {
            gainNode.gain.value = audio;
        }
    }, [audio, gainNode]);

    // Play a note with the given frequency
    const playNote = (freq) => {
        if (mute || !audioCtx || !gainNode) return;

        const dur = 0.1;
        const osc = audioCtx.createOscillator();
        osc.frequency.value = freq;
        gainNode.gain.value = audio;

        osc.start();
        osc.stop(audioCtx.currentTime + dur);
        osc.connect(gainNode);
    };

    return { playNote };
};

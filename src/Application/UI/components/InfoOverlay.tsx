import React, { useEffect, useRef, useState } from 'react';
import FreeCamToggle from './FreeCamToggle';
import MuteToggle from './MuteToggle';
import portfolioIdentity from '../portfolioIdentity';
import { dispatchSyntheticMonitorKey } from '../../Utils/MonitorSyntheticEvents';

interface InfoOverlayProps {
    visible: boolean;
}

const NAME_TEXT = portfolioIdentity.displayName;
const TITLE_TEXT = portfolioIdentity.roleTitle;
const MULTIPLIER = 1;

const InfoOverlay: React.FC<InfoOverlayProps> = ({ visible }) => {
    const visRef = useRef(visible);
    const mounted = useRef(true);
    const timers = useRef<Array<ReturnType<typeof setTimeout>>>([]);
    const later = (callback: () => void, delay: number) => timers.current.push(setTimeout(() => { if (mounted.current) callback(); }, delay));
    useEffect(() => () => { mounted.current = false; timers.current.forEach(clearTimeout); }, []);
    const [nameText, setNameText] = useState('');
    const [titleText, setTitleText] = useState('');
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const timeRef = useRef(time);
    useEffect(() => {
        const media = window.matchMedia('(prefers-reduced-motion: reduce)');
        const changed = () => {
            if (!media.matches) return;
            timers.current.forEach(clearTimeout);
            setNameText(NAME_TEXT); setTitleText(TITLE_TEXT); setTimeText(timeRef.current);
            setTextDone(true); setVolumeVisible(true); setFreeCamVisible(true);
        };
        media.addEventListener?.('change', changed);
        return () => media.removeEventListener?.('change', changed);
    }, []);
    const [timeText, setTimeText] = useState('');
    const [textDone, setTextDone] = useState(false);
    const [volumeVisible, setVolumeVisible] = useState(false);
    const [freeCamVisible, setFreeCamVisible] = useState(false);

    const typeText = (
        i: number,
        curText: string,
        text: string,
        setText: React.Dispatch<React.SetStateAction<string>>,
        callback: () => void,
        refOverride?: React.MutableRefObject<string>
    ) => {
        if (refOverride) {
            text = refOverride.current;
        }
        if (i < text.length) {
            later(() => {
                if (visRef.current === true) {
                    dispatchSyntheticMonitorKey(`_AUTO_${text[i]}`);
                }

                setText(curText + text[i]);
                typeText(
                    i + 1,
                    curText + text[i],
                    text,
                    setText,
                    callback,
                    refOverride
                );
            }, Math.random() * 50 + 50 * MULTIPLIER);
        } else {
            callback();
        }
    };

    useEffect(() => {
        if (visible && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            timers.current.forEach(clearTimeout);
            setNameText(NAME_TEXT); setTitleText(TITLE_TEXT); setTimeText(timeRef.current);
            setTextDone(true); setVolumeVisible(true); setFreeCamVisible(true);
        } else if (visible && nameText == '') {
            later(() => {
                typeText(0, '', NAME_TEXT, setNameText, () => {
                    typeText(0, '', TITLE_TEXT, setTitleText, () => {
                        typeText(
                            0,
                            '',
                            time,
                            setTimeText,
                            () => {
                                setTextDone(true);
                            },
                            timeRef
                        );
                    });
                });
            }, 400);
        }
        visRef.current = visible;
    }, [visible]);

    useEffect(() => {
        if (textDone) {
            later(() => {
                setVolumeVisible(true);
                later(() => {
                    setFreeCamVisible(true);
                }, 250);
            }, 250);
        }
    }, [textDone]);

    useEffect(() => {
        dispatchSyntheticMonitorKey('_AUTO_');
    }, [freeCamVisible, volumeVisible]);

    useEffect(() => {
        if (!visible) return;
        setTime(new Date().toLocaleTimeString());
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(interval);
    }, [visible]);

    useEffect(() => {
        timeRef.current = time;
        textDone && setTimeText(time);
    }, [time]);

    return (
        <div style={styles.wrapper}>
            {nameText !== '' && (
                <div style={styles.container}>
                    <p>{nameText}</p>
                </div>
            )}
            {titleText !== '' && (
                <div style={styles.container}>
                    <p>{titleText}</p>
                </div>
            )}
            {timeText !== '' && (
                <div style={styles.lastRow}>
                    <div
                        style={Object.assign(
                            {},
                            styles.container,
                            styles.lastRowChild
                        )}
                    >
                        <p>{timeText}</p>
                    </div>
                    {volumeVisible && (
                        <div style={styles.lastRowChild}>
                            <MuteToggle />
                        </div>
                    )}
                    {freeCamVisible && (
                        <div style={styles.lastRowChild}>
                            <FreeCamToggle />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

const styles: StyleSheetCSS = {
    container: {
        background: 'var(--portfolio-panel)',
        borderLeft: '2px solid var(--portfolio-cyan)',
        padding: 4,
        paddingLeft: 16,
        paddingRight: 16,
        textAlign: 'center',
        display: 'flex',
        marginBottom: 4,
        boxSizing: 'border-box',
    },
    wrapper: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    blinkingContainer: {
        // width: 100,
        // height: 100,
        marginLeft: 8,
        paddingBottom: 2,
        paddingRight: 4,
    },
    lastRow: {
        display: 'flex',
        flexDirection: 'row',
    },
    lastRowChild: {
        marginRight: 4,
    },
};

export default InfoOverlay;

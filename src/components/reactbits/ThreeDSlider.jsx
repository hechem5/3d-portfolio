import React, { useState, useEffect, useCallback, useRef } from 'react';

// --- Sub-Component: SliderItem ---

const SliderItem = React.forwardRef(({ item, index, onClick }, ref) => {
    return (
        <div
            ref={ref}
            style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                cursor: 'pointer',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                borderRadius: '20px',
                transformOrigin: '0% 100%',
                pointerEvents: 'auto',
                overflow: 'hidden',
                willChange: 'transform',
                display: 'flex',
                flexDirection: 'column',
                padding: '2rem',
                width: '320px',
                height: '420px',
                marginTop: '-210px',
                marginLeft: '-160px',
                transition: 'none', // Critical: handle transform purely via JS
                backgroundColor: '#151030', // Solid card background from portfolio theme
                border: '1px solid rgba(145,94,255,0.3)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.8), inset 0 0 0 1px rgba(145,94,255,0.2)',
            }}
            onClick={onClick}
        >
            <div
                className="slider-item-content"
                style={{ 
                    position: 'relative',
                    zIndex: 10,
                    transition: 'opacity 0.3s ease-out',
                    willChange: 'opacity',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    opacity: 1 
                }}
            >
                {/* Header row: Issuer and Date */}
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    marginBottom: '1rem',
                    fontSize: '0.85rem',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase'
                }}>
                    <span style={{ fontWeight: 600, color: '#915EFF' }}>{item.issuer}</span>
                    <span style={{ color: '#aaa' }}>{item.date}</span>
                </div>

                {/* Title */}
                <h3 style={{ 
                    fontFamily: 'var(--font-heading, sans-serif)',
                    fontSize: '1.4rem', 
                    fontWeight: 'bold', 
                    marginBottom: '0.8rem', 
                    lineHeight: 1.3, 
                    color: '#fff',
                    margin: '0 0 0.8rem 0'
                }}>
                    {item.title}
                </h3>

                {/* Description */}
                <p style={{ 
                    fontSize: '0.95rem', 
                    lineHeight: 1.6, 
                    marginBottom: '2rem', 
                    flexGrow: 1, 
                    color: '#ccc',
                    margin: '0 0 2rem 0'
                }}>
                    {item.description}
                </p>

                {/* Credential Button */}
                {item.credential && (
                    <a
                        href={item.credential}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '0.95rem',
                            fontWeight: 500,
                            textDecoration: 'none',
                            transition: 'all 0.2s',
                            alignSelf: 'flex-start',
                            padding: '0.5rem 1rem',
                            borderRadius: '8px',
                            color: '#915EFF',
                            background: 'rgba(145,94,255,0.1)',
                            border: '1px solid rgba(145,94,255,0.2)',
                            cursor: 'pointer',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = '#fff';
                            e.currentTarget.style.background = 'rgba(145,94,255,0.3)';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = '#915EFF';
                            e.currentTarget.style.background = 'rgba(145,94,255,0.1)';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        View Credential
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
                    </a>
                )}
            </div>
        </div>
    );
});

SliderItem.displayName = 'SliderItem';

// --- Main Component: ThreeDSlider ---

const ThreeDSlider = ({
    items,
    speedWheel = 0.05,
    speedDrag = -0.15,
    containerStyle = {},
    onItemClick,
}) => {
    const progressRef = useRef(50);
    const targetProgressRef = useRef(50);
    const isDownRef = useRef(false);
    const startXRef = useRef(0);
    const containerRef = useRef(null);
    const rafRef = useRef(null);
    const itemRefs = useRef([]);
    const cacheRef = useRef({});

    const numItems = items.length;

    const update = useCallback(() => {
        if (!itemRefs.current.length) return;

        progressRef.current += (targetProgressRef.current - progressRef.current) * 0.1;
        const progress = progressRef.current;
        const clamped = Math.max(0, Math.min(progress, 100));
        const activeFloat = clamped / 100 * (numItems - 1);

        itemRefs.current.forEach((el, index) => {
            if (!el) return;

            // Fanning math per card
            const distFromActive = index - activeFloat;

            // 90% translation per card so they slightly overlap, giving a cool stacked look
            const tx = distFromActive * 90; 
            // Slight downward drop per card
            const ty = distFromActive * 15; 
            // 15 degrees of rotation per card fanning out
            const rot = distFromActive * 15;

            const dist = Math.abs(distFromActive);
            const z = numItems - dist;
            const opacity = 1 - (dist * 0.2); // Fades out the further away it is

            const newTransform = `translate3d(${tx}%, ${ty}%, 0) rotate(${rot}deg)`;
            const newZIndex = Math.round(z * 10).toString();
            const newOpacity = Math.max(0, Math.min(1, opacity)).toString();

            if (!cacheRef.current[index]) {
                cacheRef.current[index] = { transform: '', zIndex: '', opacity: '' };
            }

            const cache = cacheRef.current[index];

            if (cache.transform !== newTransform) {
                el.style.transform = newTransform;
                cache.transform = newTransform;
            }
            if (cache.zIndex !== newZIndex) {
                el.style.zIndex = newZIndex;
                cache.zIndex = newZIndex;
            }

            const inner = el.querySelector('.slider-item-content');
            if (inner && cache.opacity !== newOpacity) {
                inner.style.opacity = newOpacity;
                cache.opacity = newOpacity;
            }
        });
    }, [numItems]);

    useEffect(() => {
        let active = true;
        const loop = () => {
            if (active) {
                update();
                rafRef.current = requestAnimationFrame(loop);
            }
        };
        rafRef.current = requestAnimationFrame(loop);
        return () => {
            active = false;
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [update]);

    const handleWheel = useCallback((e) => {
        // Adjust speedWheel for more precise control
        const wheelProgress = e.deltaY * speedWheel * 0.5;
        const current = targetProgressRef.current;
        const next = current + wheelProgress;

        // If we are already at the beginning and trying to scroll further back...
        if (current <= 0 && e.deltaY < 0) {
            // Let the page scroll up normally!
            return;
        }

        // If we are already at the end and trying to scroll further forward...
        if (current >= 100 && e.deltaY > 0) {
            // Let the page scroll down normally!
            return;
        }

        // Otherwise, we are scrubbing through the cards.
        // Block the page from scrolling, and update the cards.
        e.preventDefault();
        e.stopPropagation();

        // Clamp the progress to the bounds of the slider
        targetProgressRef.current = Math.max(0, Math.min(100, next));
    }, [speedWheel]);

    const getClientX = (e) => {
        if ('touches' in e) return e.touches[0].clientX;
        return e.clientX;
    };

    const handleMouseDown = useCallback((e) => {
        isDownRef.current = true;
        const x = getClientX(e);
        if (x !== undefined) startXRef.current = x;
    }, []);

    const handleMouseMove = useCallback((e) => {
        if (!isDownRef.current) return;
        
        const x = getClientX(e);
        if (x === undefined) return;
        
        // Only prevent default if we are actively dragging left/right
        // to prevent unwanted scroll jumps while scrubbing
        e.preventDefault();

        const diff = (x - startXRef.current) * speedDrag;
        const current = targetProgressRef.current;
        targetProgressRef.current = Math.max(0, Math.min(100, current + diff));
        startXRef.current = x;
    }, [speedDrag]);

    const handleMouseUp = useCallback(() => {
        isDownRef.current = false;
    }, []);

    const handleClick = useCallback((item, index) => {
        const denominator = numItems > 1 ? numItems - 1 : 1;
        targetProgressRef.current = (index / denominator) * 100;
        if (onItemClick) onItemClick(item, index);
    }, [numItems, onItemClick]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // passive: false is REQUIRED so we can call e.preventDefault()
        container.addEventListener('wheel', handleWheel, { passive: false });
        container.addEventListener('mousedown', handleMouseDown);
        // Passive false here too so we can preventDefault during active drag
        container.addEventListener('touchstart', handleMouseDown, { passive: false });

        // Bind move events to window, but prevent default on touchmove
        window.addEventListener('mousemove', handleMouseMove, { passive: false });
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('touchmove', handleMouseMove, { passive: false });
        window.addEventListener('touchend', handleMouseUp);

        return () => {
            container.removeEventListener('wheel', handleWheel);
            container.removeEventListener('mousedown', handleMouseDown);
            container.removeEventListener('touchstart', handleMouseDown);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchmove', handleMouseMove);
            window.removeEventListener('touchend', handleMouseUp);
        };
    }, [handleWheel, handleMouseDown, handleMouseMove, handleMouseUp]);

    return (
        <div
            ref={containerRef}
            style={{
                position: 'relative',
                width: '100%',
                height: '600px',
                overflow: 'hidden',
                // Removed borderRadius so it doesn't look like an isolated box
                touchAction: 'pan-y', // Allows vertical swiping to scroll the page, but handles horizontal drags for the cards
                userSelect: 'none',  // Disables text selection
                WebkitUserSelect: 'none',
                ...containerStyle
            }}
        >
            {/* Subtle background glow to make the cards pop */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '600px',
                height: '600px',
                backgroundColor: '#915EFF',
                opacity: 0.05,
                filter: 'blur(100px)',
                borderRadius: '50%',
                pointerEvents: 'none'
            }}></div>
            
            <div style={{
                position: 'relative',
                zIndex: 10,
                height: '100%',
                overflow: 'hidden',
                pointerEvents: 'none',
                width: '100%'
            }}>
                {items.map((item, index) => (
                    <SliderItem
                        key={`slider-item-${index}`}
                        ref={(el) => { itemRefs.current[index] = el; }}
                        item={item}
                        index={index}
                        onClick={() => handleClick(item, index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ThreeDSlider;

"use client";

import { useEffect, useRef } from "react";
import styles from "./Hero.module.css";

const config = {
    totalSlides: 3,
    lerp: 0.075,
    scrollSpeed: 3.5,
    minSize: 0.1,
    growth: 0.25,
    aspect: 1 / 1.25,
    baseline: 0.0,
};

const growthRatio = Math.exp(config.growth);

const slideCount =
    Math.ceil(Math.log(1 + (growthRatio - 1) / config.minSize) / config.growth) +
    4;

const wrap = (value: number, max: number) => ((value % max) + max) % max;

const edgeX = (position: number, width: number) =>
    (width * config.minSize * (Math.pow(growthRatio, position) - 1)) /
    (growthRatio - 1);

export default function Hero() {
    const sliderRef = useRef<HTMLDivElement | null>(null);
    const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
    const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
    const slideStreamIndexRef = useRef<number[]>(
        Array.from({ length: slideCount }, (_, i) => i)
    );
    const scrollRef = useRef<number>(0);
    const scrollTargetRef = useRef<number>(0);

    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        const onWheel = (e: WheelEvent) => {
            e.preventDefault();
            scrollTargetRef.current += (e.deltaY + e.deltaX) * config.scrollSpeed * 0.0014;
        };

        let lastTouchX: number | null = null;
        const onTouchStart = (e: TouchEvent) => {
            lastTouchX = e.touches[0].clientX;
        };
        const onTouchMove = (e: TouchEvent) => {
            if (lastTouchX === null) return;
            const x = e.touches[0].clientX;
            scrollTargetRef.current += (lastTouchX - x) * config.scrollSpeed * 0.004;
            lastTouchX = x;
        };
        const onTouchEnd = () => {
            lastTouchX = null;
        };

        let lastPointerX: number | null = null;
        const onPointerDown = (e: PointerEvent) => {
            lastPointerX = e.clientX;
            slider.setPointerCapture(e.pointerId);
        };
        const onPointerMove = (e: PointerEvent) => {
            if (lastPointerX === null) return;
            scrollTargetRef.current += (lastPointerX - e.clientX) * config.scrollSpeed * -0.005;
            lastPointerX = e.clientX;
        };
        const releasePointer = () => {
            lastPointerX = null;
        };

        slider.addEventListener("wheel", onWheel, { passive: false });
        slider.addEventListener("touchstart", onTouchStart, { passive: true });
        slider.addEventListener("touchmove", onTouchMove, { passive: true });
        slider.addEventListener("touchend", onTouchEnd);
        slider.addEventListener("pointerdown", onPointerDown);
        slider.addEventListener("pointermove", onPointerMove);
        slider.addEventListener("pointerup", releasePointer);
        slider.addEventListener("pointercancel", releasePointer);

        let animationFrameId: number;

        const render = () => {
            scrollRef.current += (scrollTargetRef.current - scrollRef.current) * config.lerp;

            const sliderWidth = slider.clientWidth;
            const sliderHeight = slider.clientHeight;
            const baselineOffset = sliderHeight * config.baseline;

            for (let i = 0; i < slideCount; i++) {
                const slide = slideRefs.current[i];
                if (!slide) continue;

                let streamIndex = slideStreamIndexRef.current[i];

                while (edgeX(streamIndex + scrollRef.current, sliderWidth) > sliderWidth)
                    streamIndex -= slideCount;

                while (edgeX(streamIndex + scrollRef.current + 1, sliderWidth) < 0)
                    streamIndex += slideCount;

                slideStreamIndexRef.current[i] = streamIndex;

                const left = Math.round(edgeX(streamIndex + scrollRef.current, sliderWidth));
                const right = Math.round(edgeX(streamIndex + scrollRef.current + 1, sliderWidth));
                const width = right - left;
                const height = width / config.aspect;

                const imageNumber = wrap(streamIndex, config.totalSlides) + 1;
                if (slide.dataset.image !== String(imageNumber)) {
                    slide.dataset.image = String(imageNumber);
                    const img = imgRefs.current[i];
                    if (img) {
                        img.src = `/images/slide${imageNumber}.jpg`;
                    }
                }

                slide.style.width = `${width}px`;
                slide.style.height = `${height}px`;
                slide.style.zIndex = String(Math.round(right));
                slide.style.transform = `translate(${left}px, ${-baselineOffset}px)`;
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            cancelAnimationFrame(animationFrameId);
            slider.removeEventListener("wheel", onWheel);
            slider.removeEventListener("touchstart", onTouchStart);
            slider.removeEventListener("touchmove", onTouchMove);
            slider.removeEventListener("touchend", onTouchEnd);
            slider.removeEventListener("pointerdown", onPointerDown);
            slider.removeEventListener("pointermove", onPointerMove);
            slider.removeEventListener("pointerup", releasePointer);
            slider.removeEventListener("pointercancel", releasePointer);
        };
    }, []);

    return (
        <section ref={sliderRef} className={styles.slider}>
            <div className={styles.sliderHeader}>
                <h1>ONE CAMPAIGN</h1>
                <h2>HUNDREDS OF POSSIBILITIES</h2>
            </div>
            {Array.from({ length: slideCount }).map((_, i) => (
                <div
                    key={i}
                    ref={(el) => {
                        slideRefs.current[i] = el;
                    }}
                    className={styles.slide}
                >
                    <img
                        ref={(el) => {
                            imgRefs.current[i] = el;
                        }}
                        alt={`Slide ${i + 1}`}
                    />
                </div>
            ))}
        </section>
    );
}
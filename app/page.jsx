"use client";

import { useEffect, useRef, useState } from "react";

export default function HomePage() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [message, setMessage] = useState("");
  const [yesScale, setYesScale] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [noIndex, setNoIndex] = useState(0);
  const [trackIndex, setTrackIndex] = useState(0);

  const tracks = [
    { title: "Pahinga", artist: "Unique Salonga", src: "/pahinga_uniquesalonga.mp4" },
    { title: "Let Down", artist: "Radiohead", src: "/letdown_radiohead.mp4" },
  ];

  useEffect(() => {
    const items = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    items.forEach((item, index) => {
      item.style.transitionDelay = `${index * 0.08}s`;
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const tryPlay = async () => {
      if (!audioRef.current) return false;
      try {
        audioRef.current.muted = false;
        audioRef.current.volume = 0.9;
        await audioRef.current.play();
        setIsPlaying(true);
        return true;
      } catch {
        return false;
      }
    };

    tryPlay();

    const unlockAudio = () => {
      tryPlay();
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };

    window.addEventListener("pointerdown", unlockAudio);
    window.addEventListener("keydown", unlockAudio);

    return () => {
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };
  }, []);

  useEffect(() => {
    const loadAndPlay = async () => {
      if (!audioRef.current) return;
      audioRef.current.load();
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    };
    loadAndPlay();
  }, [trackIndex]);

  const handleMusic = async () => {
    if (!audioRef.current) return;
    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const noMessages = [
    "Click mo po ulit",
    "One more",
    "Di pwede",
    "Akin ka lang",
    "Hehe",
    "No, no?",
    "Akin ka lang",
  ];

  const handleNo = () => {
    setMessage(noMessages[noIndex % noMessages.length]);
    setNoIndex((prev) => prev + 1);
    setYesScale((prev) => Math.min(1.8, prev + 0.12));
  };

  const handleYes = () => {
    setShowSuccess(true);
    const successEl = document.getElementById("rsvp-success");
    if (successEl) {
      successEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleNextTrack = async () => {
    const nextIndex = (trackIndex + 1) % tracks.length;
    setTrackIndex(nextIndex);
  };

  return (
    <div className="page">
      <div className="floating-petals" aria-hidden="true">
        <span className="petal"></span>
        <span className="petal"></span>
        <span className="petal"></span>
        <span className="petal"></span>
        <span className="petal"></span>
      </div>
      <div className="floating-heart" aria-hidden="true"></div>
      <div className="halo" aria-hidden="true"></div>
      <div className="music-overlay" aria-live="polite">
        <div className="music-overlay-title">Now Playing</div>
        <div className="music-track">
          {tracks[trackIndex].title} by {tracks[trackIndex].artist}
        </div>
        <div className="music-controls">
          <button className="primary" type="button" onClick={handleMusic} disabled={isPlaying}>
            {isPlaying ? "Playing" : "Play"}
          </button>
          <button className="icon-btn" type="button" onClick={handleNextTrack} aria-label="Next song">
            Next
          </button>
        </div>
      </div>
      <audio ref={audioRef} preload="auto" loop playsInline autoPlay>
        <source src={tracks[trackIndex].src} type="audio/mp4" />
      </audio>
      <header className="reveal">
        <div className="eyebrow">Valentine's Proposal</div>
        <h1>For "Aking Irog" Miles, My one and only beautiful girl.</h1>
        <p className="hero-subtitle">
          A small, romantic plan for the night where I remind you na deserved mo rin na mahalin at pahalagahan ng tunay, oh aking irog.
        </p>
        <div className="hero-actions">
          <a className="btn primary" href="#plan">
            &#10084; See the plan
          </a>
          <a className="btn secondary" href="#letter">
            Read the letter
          </a>
        </div>
      </header>

      <section id="letter" className="card reveal">
        <h2>Letter of Proposal</h2>
        <p className="letter">
          Hi Miles! I'm John, I know I cannot be talk with you without the game that we are wanted to play with at eto ay ang Valorantttt.
          Alam ko na hindi pa ako masyadong close or kilala ka ng husto pero iba na ang naging pakiramdam ko simula nung nakausap kita.
          Alam ko hindi rin naging maganda ang takbo ng buhay mo at sa relasyon na pinagdaanan mo. Ngunit, ako ay lagi lang nandito para sayo kahit
          malayo ako at kahit wala ako sa tabi mo lagi handa ako makinig sa lahat ng problema mo at kung maghihintay man ako sa haba ng panahon "bilang kaibigan" papunta
          sa "ka-ibigan" handa akong ibigay lahat ng yon pero wag muna ngayon dahil nirerespeto ko ang pagkatao mo at pati ang parents mo.
        </p>
        <p className="letter">
          And on this day I'm hoping and ensuring this will be your best day. Walang lungkot at lahat ng iyong pagod, susubukan kong
          alisin lahat para maramdaman mo na may nagpapahalaga pa sayo and ako yunnnnnnnnnnnnnnnnnnn!!!!!!
        </p>
      </section>

      <section id="plan" className="grid two">
        <div className="card reveal">
          <h2>Day and Night Plan</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-time">11:00 AM </div>
              <strong>Meet & flowers</strong>
              <span>I'll pick you up with your favorite flowers.</span>
            </div>
            <div className="timeline-item">
              <div className="timeline-time">12:00 PM onwards</div>
              <strong>Lunch "Date?"</strong>
              <span>Cozy table, candlelight, and your favorite dish.</span>
            </div>
            <div className="timeline-item">
              <div className="timeline-time">2:00 PM onwards</div>
              <strong>Walk around</strong>
              <span>Tayo ay maguusap usap habang naglalakad yipieee.</span>
            </div>
            <div className="timeline-item">
              <div className="timeline-time">6:00 PM</div>
              <strong>Rides</strong>
              <span>Sakay tayo rides if want mo (takot ako pero sasakay ako para sayo). </span>
            </div>
            <div className="timeline-item">
              <div className="timeline-time">7:00 PM onwards</div>
              <strong>Uwian</strong>
              <span>Prepare na sa paguwiii.😔 </span>
            </div>
          </div>
        </div>
        <div className="card reveal">
          <h2>Why You</h2>
          <p>
            You make everything softer, brighter, and more beautiful. Here are a few reasons I like you:
          </p>
          <div className="pill-list">
            <div className="pill">Your laugh is my favorite sound</div>
            <div className="pill">You always show up with kindness</div>
            <div className="pill">You make me feel calm and brave</div>
            <div className="pill">You see beauty in small things</div>
          </div>
        </div>
      </section>

      <section className="card reveal">
        <h2>Things we love</h2>
        <p>Mga gusto mo at gusto ko na match na para bang mix and match?!?!?</p>
        <div className="gallery">
          <div className="gallery-card valorant-card">Valorant</div>
          <div className="gallery-card coffee-card">Coffee</div>
          <div className="gallery-card music-card">Music</div>
          <div className="gallery-card drawing-card">Drawing</div>
        </div>
      </section>

      <section className="grid two">
        <div className="card reveal">
          <h2>Details</h2>
          <div className="details-list">
            <div className="detail-row">
              <span>Date Arrival</span>
              <span>February 14</span>
            </div>
            <div className="detail-row">
              <span>Time</span>
              <span>10:00 AM onwards</span>
            </div>
            <div className="detail-row">
              <span>Dress</span>
              <span>Ikaw bahala basta comfyyyy kaaaaaa, pag may tumingin sayo yari sila sakin. (as a friend care) </span>
            </div>
            <div className="detail-row">
              <span>Location</span>
              <span>Mall of Asia</span>
            </div>
            <div className="detail-row">
              <span>Uwian</span>
              <span>8:00 pm or 9:00 pm onwards</span>
            </div>
          </div>
        </div>
      </section>

      {!showSuccess && (
        <section className="card reveal" id="rsvp-section">
          <h2>RSVP</h2>
          <p>
            If yes ang sagot mo, tap the button below and send me a simple "Yes". 😘
          </p>
          <div className="hero-actions rsvp-actions">
            <button
              className="btn primary"
              id="yes-btn"
              type="button"
              onClick={handleYes}
              style={{ "--yes-scale": yesScale }}
            >
              Yes
            </button>
            <button className="btn secondary" id="no-btn" type="button" onClick={handleNo}>
              No
            </button>
          </div>
          <p className="rsvp-message" id="rsvp-message">
            {message}
          </p>
        </section>
      )}

      {showSuccess && (
        <section className="card reveal rsvp-success is-visible" id="rsvp-success">
          <h2>Thank You 🥰</h2>
          <p className="letter">I like you so muchhhhhhhhhh.</p>
        </section>
      )}

      <footer className="reveal">Made with love for the girl I want &#10084;</footer>
    </div>
  );
}

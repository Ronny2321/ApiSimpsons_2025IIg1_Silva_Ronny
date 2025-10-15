import React, { useEffect, useRef, useState } from "react";
import "./PowerModal2.css";

const AdditionalInfoModal = ({ characterId, isOpen, onClose }) => {
  const [characterDetails, setCharacterDetails] = useState(null);
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const dialogRef = useRef(null);
  const abortRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKey);

    setTimeout(() => dialogRef.current?.focus(), 0);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || !characterId) {
      setCharacterDetails(null);
      setStatus("idle");
      setErrorMsg("");
      abortRef.current?.abort?.();
      return;
    }

    setStatus("loading");
    setErrorMsg("");
    const controller = new AbortController();
    abortRef.current = controller;

    (async () => {
      try {
        const res = await fetch(
          `https://thesimpsonsapi.com/api/characters/${characterId}`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setCharacterDetails(data);
        setStatus("success");
      } catch (err) {
        if (controller.signal.aborted) return;
        setStatus("error");
        setErrorMsg(err?.message || "Error desconocido");
      }
    })();

    return () => controller.abort();
  }, [isOpen, characterId]);

  if (!isOpen) return null;

  const imgSrc =
    characterDetails?.image ||
    (characterDetails?.portrait_path
      ? `https://cdn.thesimpsonsapi.com/500${characterDetails.portrait_path}`
      : "");

  return (
    <div className="modal-overlay">
      <dialog
        className="power-modal"
        role="dialog"
        aria-modal="true"
        aria-label={
          characterDetails?.name
            ? `Detalles de ${characterDetails.name}`
            : "Detalles del personaje"
        }
        ref={dialogRef}
        tabIndex={-1}
        style={{ maxHeight: "90vh" }}
      >
        <button className="close-button" onClick={onClose} aria-label="Cerrar">
          ✖
        </button>

        <header className="modal-header">
          <div className="character-title">
            <figure className="character-avatar">
              {imgSrc ? (
                <img
                  src={imgSrc}
                  alt={characterDetails?.name || "Avatar"}
                  loading="lazy"
                />
              ) : (
                <div className="image-fallback">Sin imagen</div>
              )}
            </figure>

            <h2 className="title">{characterDetails?.name || "Personaje"}</h2>
            <p className="character-occupation">
              {characterDetails?.birthdate || "0000-00-00"}
            </p>
            <p className="character-occupation">
              {characterDetails?.description || "Sin descripción"}
            </p>
          </div>
        </header>

        <main className="modal-body">
          {status === "loading" && (
            <div className="skeleton">
              <div className="sk-block" />
              <div className="sk-block" />
              <div className="sk-row" />
            </div>
          )}

          {status === "error" && (
            <div className="error-card">
              <p>
                <strong>Ups…</strong> no pudimos cargar los detalles.
              </p>
              <code>{errorMsg}</code>
            </div>
          )}

          {status === "success" && characterDetails && (
            <section className="content-grid">
              {Array.isArray(characterDetails.phrases) &&
                characterDetails.phrases.length > 0 && (
                  <article className="card-section">
                    <h3 className="section-title">Frases</h3>
                    <ul className="phrases-list">
                      {characterDetails.phrases.map((phrase, idx) => (
                        <li className="phrase" key={idx}>
                          <span className="quote-mark" aria-hidden>
                            “
                          </span>
                          <span className="phrase-text">{phrase}</span>
                          <span className="quote-mark" aria-hidden>
                            ”
                          </span>
                        </li>
                      ))}
                    </ul>
                  </article>
                )}

              {(characterDetails.first_appearance_ep ||
                characterDetails.first_appearance_sh) && (
                <section className="card-section">
                  <h3 className="section-title">Primeras apariciones</h3>

                  <div className="appear-grid">
                    {characterDetails.first_appearance_ep && (
                      <article className="appear-card">
                        <div className="appear-thumb">
                          <img
                            src={`https://cdn.thesimpsonsapi.com/500${characterDetails.first_appearance_ep.image_path}`}
                            alt={characterDetails.first_appearance_ep.name}
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.replaceWith(
                                Object.assign(document.createElement("div"), {
                                  className: "image-fallback",
                                  innerText: "Sin imagen",
                                })
                              );
                            }}
                          />
                        </div>
                        <div className="appear-info">
                          <h4 className="appear-title">
                            {characterDetails.first_appearance_ep.name}
                          </h4>
                          <p className="appear-desc">
                            {characterDetails.first_appearance_ep.description}
                          </p>
                        </div>
                        <span className="appear-badge">Episodio</span>
                      </article>
                    )}

                    {characterDetails.first_appearance_sh && (
                      <article className="appear-card">
                        <div className="appear-thumb">
                          <img
                            src={`https://cdn.thesimpsonsapi.com/500${characterDetails.first_appearance_sh.image_path}`}
                            alt={characterDetails.first_appearance_sh.name}
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.replaceWith(
                                Object.assign(document.createElement("div"), {
                                  className: "image-fallback",
                                  innerText: "Sin imagen",
                                })
                              );
                            }}
                          />
                        </div>
                        <div className="appear-info">
                          <h4 className="appear-title">
                            {characterDetails.first_appearance_sh.name}
                          </h4>
                          <p className="appear-desc">
                            {characterDetails.first_appearance_sh.description}
                          </p>
                        </div>
                        <span className="appear-badge">Corto</span>
                      </article>
                    )}
                  </div>
                </section>
              )}
            </section>
          )}
        </main>
      </dialog>
    </div>
  );
};

export default AdditionalInfoModal;

import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useProducts } from "../../context/ProductsContext";
import { searchProducts } from "../../utils/search";
import { CATEGORIES } from "../../data/categories";
import CakeImage from "../CakeImage/CakeImage";
import { SearchIcon, CloseIcon } from "../Icons/Icons";
import "./SearchBar.css";

// Barre de recherche du header : suggestions en direct + page de résultats (/boutique?q=...)
function SearchBar() {
  const { products } = useProducts();
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();
  const urlQuery = location.pathname === "/boutique" ? params.get("q") || "" : "";

  const [value, setValue] = useState(urlQuery);
  const [open, setOpen] = useState(false); // liste de suggestions
  const [mobileOpen, setMobileOpen] = useState(false); // barre dépliée sur petit écran
  const [active, setActive] = useState(-1);
  const wrapRef = useRef(null);
  const inputRef = useRef(null);

  // garde le champ synchronisé avec l'adresse (ex: bouton "Effacer la recherche")
  const [prevUrlQuery, setPrevUrlQuery] = useState(urlQuery);
  if (prevUrlQuery !== urlQuery) {
    setPrevUrlQuery(urlQuery);
    setValue(urlQuery);
  }

  // ferme la liste quand on clique ailleurs
  useEffect(() => {
    function onClick(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
        setMobileOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const trimmed = value.trim();
  const suggestions = useMemo(() => (trimmed ? searchProducts(products, trimmed) : []), [products, trimmed]);
  const shown = suggestions.slice(0, 5);

  function close() {
    setOpen(false);
    setMobileOpen(false);
    setActive(-1);
    inputRef.current?.blur();
  }

  function submit(e) {
    e.preventDefault();
    if (active >= 0 && shown[active]) {
      navigate(`/product/${shown[active].id}`);
    } else {
      navigate(trimmed ? `/boutique?q=${encodeURIComponent(trimmed)}` : "/boutique");
    }
    close();
  }

  function onKeyDown(e) {
    if (e.key === "Escape") close();
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, shown.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, -1));
    }
  }

  function clear() {
    setValue("");
    setActive(-1);
    inputRef.current?.focus();
    if (urlQuery) navigate("/boutique");
  }

  return (
    <div className="searchbar" ref={wrapRef}>
      <button
        type="button"
        className="search-toggle"
        aria-label="Rechercher un gâteau"
        onClick={() => {
          setMobileOpen((o) => !o);
          setTimeout(() => inputRef.current?.focus(), 0);
        }}
      >
        <SearchIcon />
      </button>

      <form className={mobileOpen ? "search-form open" : "search-form"} onSubmit={submit} role="search">
        <SearchIcon className="search-icon" width={18} height={18} />
        <input
          ref={inputRef}
          type="search"
          value={value}
          placeholder="Rechercher un gâteau (chocolat, vegan, mariage...)"
          aria-label="Rechercher un gâteau"
          autoComplete="off"
          onChange={(e) => {
            setValue(e.target.value);
            setActive(-1);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
        />
        {value && (
          <button type="button" className="search-clear" aria-label="Effacer" onClick={clear}>
            <CloseIcon width={16} height={16} />
          </button>
        )}

        {open && (
          <div className="search-dropdown">
            {!trimmed && (
              <>
                <p className="dd-title">Catégories populaires</p>
                <div className="dd-chips">
                  {Object.entries(CATEGORIES).map(([slug, c]) => (
                    <Link key={slug} to={`/boutique?cat=${slug}`} onClick={close}>
                      {c.label}
                    </Link>
                  ))}
                </div>
              </>
            )}

            {trimmed && shown.length === 0 && (
              <p className="dd-empty">Aucun gâteau trouvé pour « {trimmed} ».</p>
            )}

            {shown.map((p, i) => (
              <Link
                key={p.id}
                to={`/product/${p.id}`}
                className={i === active ? "dd-item active" : "dd-item"}
                onClick={close}
                onMouseEnter={() => setActive(i)}
              >
                <span className="dd-thumb"><CakeImage product={p} /></span>
                <span className="dd-text">
                  <strong>{p.title}</strong>
                  <small>{CATEGORIES[p.category]?.label || p.category}</small>
                </span>
                <span className="dd-price">{p.price.toLocaleString("fr-FR")} DA</span>
              </Link>
            ))}

            {trimmed && suggestions.length > 0 && (
              <Link to={`/boutique?q=${encodeURIComponent(trimmed)}`} className="dd-all" onClick={close}>
                Voir les {suggestions.length} résultat{suggestions.length > 1 ? "s" : ""} →
              </Link>
            )}
          </div>
        )}
      </form>
    </div>
  );
}

export default SearchBar;

import { useState, useEffect } from 'react';

/* ── EDIT THESE 3 LINES IF YOUR SITE SCHEMA DIFFERS ───────────────── */
const SITE_STATUS_FIELD = 'status';
const ACTIVE_STATUS_VALUES = ['Active', 'active', 'In Progress', 'in-progress'];
const LOCATION_FIELD_CANDIDATES = ['district', 'city', 'location', 'address', 'siteAddress'];
/* ──────────────────────────────────────────────────────────────── */

const RAIN_ALERT_THRESHOLD = 50; // % chance, next 12h, triggers the alert badge
const GEOCODE_CACHE_KEY = 'cpms_geocode_cache';

// ---- Inline icons (stroke style, matches existing SVG icon set) ----
const iconProps = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };

const SunIcon = (p) => (
  <svg viewBox="0 0 24 24" {...iconProps} {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
);

const CloudIcon = (p) => (
  <svg viewBox="0 0 24 24" {...iconProps} {...p}>
    <path d="M17.5 19a4.5 4.5 0 0 0 0-9 6 6 0 0 0-11.4 1.7A4 4 0 0 0 6.5 19h11z" />
  </svg>
);

const CloudRainIcon = (p) => (
  <svg viewBox="0 0 24 24" {...iconProps} {...p}>
    <path d="M16.5 15a4.5 4.5 0 0 0 0-9 6 6 0 0 0-11.4 1.7A4 4 0 0 0 5.5 15h11z" />
    <path d="M8 19v2M12 19v2M16 19v2" />
  </svg>
);

const CloudLightningIcon = (p) => (
  <svg viewBox="0 0 24 24" {...iconProps} {...p}>
    <path d="M16.5 13a4.5 4.5 0 0 0 0-9 6 6 0 0 0-11.4 1.7A4 4 0 0 0 5.5 13h11z" />
    <path d="M11 14l-2 4h3l-2 4" />
  </svg>
);

const SnowflakeIcon = (p) => (
  <svg viewBox="0 0 24 24" {...iconProps} {...p}>
    <path d="M12 2v20M5 7l14 10M19 7L5 17" />
  </svg>
);

const AlertIcon = (p) => (
  <svg viewBox="0 0 24 24" {...iconProps} {...p}>
    <path d="M12 9v4M12 17h.01" />
    <path d="M10.3 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.7 3.86a2 2 0 0 0-3.4 0z" />
  </svg>
);

// WMO weather codes -> label/icon
const WEATHER_CODE_MAP = {
  0: { label: 'Clear', Icon: SunIcon },
  1: { label: 'Mostly Clear', Icon: SunIcon },
  2: { label: 'Partly Cloudy', Icon: CloudIcon },
  3: { label: 'Overcast', Icon: CloudIcon },
  45: { label: 'Fog', Icon: CloudIcon },
  48: { label: 'Fog', Icon: CloudIcon },
  51: { label: 'Light Drizzle', Icon: CloudRainIcon },
  53: { label: 'Drizzle', Icon: CloudRainIcon },
  55: { label: 'Heavy Drizzle', Icon: CloudRainIcon },
  61: { label: 'Light Rain', Icon: CloudRainIcon },
  63: { label: 'Rain', Icon: CloudRainIcon },
  65: { label: 'Heavy Rain', Icon: CloudRainIcon },
  80: { label: 'Rain Showers', Icon: CloudRainIcon },
  81: { label: 'Rain Showers', Icon: CloudRainIcon },
  82: { label: 'Violent Showers', Icon: CloudRainIcon },
  95: { label: 'Thunderstorm', Icon: CloudLightningIcon },
  96: { label: 'Thunderstorm', Icon: CloudLightningIcon },
  99: { label: 'Severe Thunderstorm', Icon: CloudLightningIcon },
  71: { label: 'Snow', Icon: SnowflakeIcon },
  73: { label: 'Snow', Icon: SnowflakeIcon },
  75: { label: 'Heavy Snow', Icon: SnowflakeIcon },
};
const getWeatherInfo = (code) => WEATHER_CODE_MAP[code] || { label: 'Unknown', Icon: CloudIcon };

const getSiteLocationText = (site) => {
  for (const field of LOCATION_FIELD_CANDIDATES) {
    if (site[field]) return site[field];
  }
  return null;
};

function loadGeocodeCache() {
  try {
    return JSON.parse(localStorage.getItem(GEOCODE_CACHE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveGeocodeCache(cache) {
  try {
    localStorage.setItem(GEOCODE_CACHE_KEY, JSON.stringify(cache));
  } catch {
    // ignore quota errors
  }
}

async function geocodeLocation(query) {
  const cache = loadGeocodeCache();
  if (cache[query]) return cache[query];

  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1`
  );
  const data = await res.json();
  if (!data.results || data.results.length === 0) return null;

  const { latitude, longitude, name } = data.results[0];
  const coords = { lat: latitude, lon: longitude, name };
  cache[query] = coords;
  saveGeocodeCache(cache);
  return coords;
}

async function fetchWeather(lat, lon) {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&hourly=precipitation_probability&forecast_days=1&timezone=auto`
  );
  const data = await res.json();
  const next12h = data.hourly?.precipitation_probability?.slice(0, 12) || [0];

  return {
    temp: Math.round(data.current?.temperature_2m ?? 0),
    code: data.current?.weather_code ?? 0,
    rainChance: Math.max(...next12h),
  };
}

export default function WeatherWidget({ sites = [] }) {
  const [weatherData, setWeatherData] = useState({});

  const activeSites = sites.filter((s) => ACTIVE_STATUS_VALUES.includes(s[SITE_STATUS_FIELD]));
  const activeSiteIds = activeSites.map((s) => s._id || s.id).join(',');

  useEffect(() => {
    let cancelled = false;

    async function loadAll() {
      const results = {};
      for (const site of activeSites) {
        const id = site._id || site.id;
        const locationText = getSiteLocationText(site);

        if (!locationText) {
          results[id] = { error: 'No location set' };
          continue;
        }

        try {
          const coords = await geocodeLocation(locationText);
          if (!coords) {
            results[id] = { error: 'Location not found' };
            continue;
          }
          const weather = await fetchWeather(coords.lat, coords.lon);
          results[id] = { ...weather, locationName: coords.name };
        } catch {
          results[id] = { error: 'Weather unavailable' };
        }
      }
      if (!cancelled) setWeatherData(results);
    }

    if (activeSites.length > 0) loadAll();
    return () => {
      cancelled = true;
    };
  }, [activeSiteIds]);

  if (activeSites.length === 0) return null;

  return (
    <div className="mb-6">
      <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
        Site Weather
      </h2>
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
        {activeSites.map((site) => {
          const id = site._id || site.id;
          const w = weatherData[id];

          return (
            <div
              key={id}
              className="min-w-[200px] flex-shrink-0 bg-white rounded-2xl border border-slate-200 p-4 shadow-sm"
            >
              <p className="text-sm font-medium text-slate-800 truncate">{site.name}</p>

              {!w && (
                <div className="mt-3 h-8 flex items-center">
                  <div className="w-full h-3 bg-slate-100 rounded animate-pulse" />
                </div>
              )}

              {w?.error && <p className="mt-3 text-xs text-slate-400">{w.error}</p>}

              {w && !w.error && (
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {(() => {
                      const { Icon, label } = getWeatherInfo(w.code);
                      return <Icon className="w-7 h-7 text-orange-600" aria-label={label} />;
                    })()}
                    <div>
                      <p className="text-lg font-semibold text-slate-900 leading-tight">{w.temp}°C</p>
                      <p className="text-xs text-slate-500 leading-tight">{getWeatherInfo(w.code).label}</p>
                    </div>
                  </div>

                  {w.rainChance >= RAIN_ALERT_THRESHOLD && (
                    <div className="flex items-center gap-1 bg-orange-50 text-orange-700 text-xs font-medium px-2 py-1 rounded-lg">
                      <AlertIcon className="w-3.5 h-3.5" />
                      {w.rainChance}%
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}